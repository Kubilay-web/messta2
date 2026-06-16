import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db"
import { validateRequest } from '@/app/auth'

// GET /api/stories - Tüm story'leri getir
export async function GET(request: NextRequest) {
  try {
    const {user} = await validateRequest()
    const userId = user?.id

    // Son 24 saat içindeki aktif story'leri getir
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const now = new Date()

    // 1. Aktif story'leri getir (expiresAt null veya henüz geçmemiş olanlar)
    const whereCondition: any = {
      type: 'story',
      createdAt: {
        gte: twentyFourHoursAgo
      },
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: now } }
      ]
    }

    // 2. Kullanıcı giriş yaptıysa, arkadaşlarının ve kendi story'lerini getir
    if (userId) {
      // Arkadaşları bul
      const friends = await db.friendRequest.findMany({
        where: {
          OR: [
            { userId, status: 'accepted' },
            { friendId: userId, status: 'accepted' }
          ]
        },
        select: {
          userId: true,
          friendId: true
        }
      })

      // Arkadaş ID'lerini topla
      const friendIds = friends.flatMap(friend => 
        friend.userId === userId ? friend.friendId : friend.userId
      )

      // Kendi ID'yi de ekle
      const allUserIds = [userId, ...friendIds]
      whereCondition.userId = { in: allUserIds }
    }

    // 3. Story'leri getir
    const stories = await db.postSocial.findMany({
      where: whereCondition,
      select: {
        id: true,
        type: true,
        text: true,
        images: true,
        background: true,
        expiresAt: true,
        viewers: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // 4. Story'leri kullanıcıya göre grupla
    const groupedStories = stories.reduce((acc: any, story) => {
      const userId = story.user.id
      if (!acc[userId]) {
        acc[userId] = {
          user: story.user,
          stories: [],
          hasUnviewed: false
        }
      }
      
      // Story'nin görüntülenme durumunu kontrol et
      let isViewed = false
      if (story.viewers && userId) {
        const viewers = JSON.parse(story.viewers as string)
        isViewed = viewers.includes(userId)
      }
      
      acc[userId].stories.push({
        id: story.id,
        type: story.type,
        text: story.text,
        images: story.images,
        background: story.background,
        expiresAt: story.expiresAt,
        viewers: story.viewers,
        createdAt: story.createdAt,
        isViewed
      })
      
      // Eğer görülmemiş story varsa işaretle
      if (!isViewed) {
        acc[userId].hasUnviewed = true
      }
      
      return acc
    }, {})

    // 5. Gruplanmış story'leri array'e çevir ve sırala (görülmemişler önce)
    const result = Object.values(groupedStories).sort((a: any, b: any) => {
      if (a.hasUnviewed && !b.hasUnviewed) return -1
      if (!a.hasUnviewed && b.hasUnviewed) return 1
      return new Date(b.stories[0].createdAt).getTime() - new Date(a.stories[0].createdAt).getTime()
    })

    return NextResponse.json({ 
      success: true, 
      stories: result,
      timestamp: now.toISOString()
    })
  } catch (error) {
    console.error('Get stories error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch stories' 
    }, { status: 500 })
  }
}

// POST /api/stories - Yeni story oluştur
export async function POST(request: NextRequest) {
  try {
    const {user} = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized' 
      }, { status: 401 })
    }

    const body = await request.json()
    const { text, images, background, type = 'story' } = body

    // 24 saat sonrasını expiresAt olarak ayarla
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    // Yeni story oluştur
    const story = await db.postSocial.create({
      data: {
        type,
        text,
        images: images || [],
        background,
        userId: user.id,
        expiresAt,
        viewers: '[]', // Boş array ile başlat
        createdAt: new Date()
      },
      select: {
        id: true,
        type: true,
        text: true,
        images: true,
        background: true,
        expiresAt: true,
        viewers: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        }
      }
    })

    return NextResponse.json({ 
      success: true, 
      story,
      message: 'Story created successfully'
    })
  } catch (error) {
    console.error('Create story error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to create story' 
    }, { status: 500 })
  }
}