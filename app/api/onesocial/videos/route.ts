// app/api/onesocial/user/videos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db"
import { validateRequest } from '@/app/auth'

export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    // Kullanıcının videolarını getir
    const videos = await db.video.findMany({
      where: {
        userId: user.id,
        muxStatus: { not: 'errored' } // Hatalı videoları gösterme
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        },
        category: {
          select: {
            id: true,
            name: true
          }
        },
        views: {
          select: {
            id: true
          }
        },
        reactions: {
          where: {
            type: 'like'
          },
          select: {
            id: true
          }
        },
        comments: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })

    // Toplam video sayısı
    const totalVideos = await db.video.count({
      where: {
        userId: user.id,
        muxStatus: { not: 'errored' }
      }
    })

    // Format videos with stats
    const formattedVideos = videos.map(video => ({
      id: video.id,
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      previewUrl: video.previewUrl,
      muxPlaybackId: video.muxPlaybackId,
      muxStatus: video.muxStatus,
      duration: video.duration,
      visibility: video.visibility,
      createdAt: video.createdAt,
      updatedAt: video.updatedAt,
      user: video.user,
      category: video.category,
      stats: {
        views: video.views.length,
        likes: video.reactions.length,
        comments: video.comments.length
      }
    }))

    return NextResponse.json({
      success: true,
      videos: formattedVideos,
      pagination: {
        page,
        limit,
        total: totalVideos,
        pages: Math.ceil(totalVideos / limit)
      }
    })
  } catch (error) {
    console.error('Get user videos error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch user videos'
    }, { status: 500 })
  }
}

// Tüm videoları getir (admin için)
export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    const body = await request.json()
    const { 
      page = 1, 
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search = '',
      categoryId
    } = body

    const skip = (page - 1) * limit

    // Filtre oluştur
    const where: any = {
      muxStatus: { not: 'errored' }
    }

    // Arama filtresi
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Kategori filtresi
    if (categoryId) {
      where.categoryId = categoryId
    }

    // Eğer admin değilse sadece kendi videolarını göster
    if (user.role !== 'ADMIN') {
      where.userId = user.id
    }

    // Videoları getir
    const videos = await db.video.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        },
        category: {
          select: {
            id: true,
            name: true
          }
        },
        views: {
          select: {
            id: true
          }
        },
        reactions: {
          where: {
            type: 'like'
          },
          select: {
            id: true
          }
        },
        comments: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        [sortBy]: sortOrder
      },
      skip,
      take: limit
    })

    // Toplam video sayısı
    const totalVideos = await db.video.count({ where })

    // Format videos
    const formattedVideos = videos.map(video => ({
      id: video.id,
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      previewUrl: video.previewUrl,
      muxPlaybackId: video.muxPlaybackId,
      muxStatus: video.muxStatus,
      duration: video.duration,
      visibility: video.visibility,
      createdAt: video.createdAt,
      updatedAt: video.updatedAt,
      user: video.user,
      category: video.category,
      stats: {
        views: video.views.length,
        likes: video.reactions.length,
        comments: video.comments.length
      }
    }))

    return NextResponse.json({
      success: true,
      videos: formattedVideos,
      pagination: {
        page,
        limit,
        total: totalVideos,
        pages: Math.ceil(totalVideos / limit)
      }
    })
  } catch (error) {
    console.error('Get videos error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch videos'
    }, { status: 500 })
  }
}