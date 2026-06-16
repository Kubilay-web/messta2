import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db"
import { validateRequest } from '@/app/auth'

// POST /api/stories/[id]/view - Story'yi görüntüle
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {user} = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized' 
      }, { status: 401 })
    }

    const storyId = params.id

    // Story'yi bul
    const story = await db.postSocial.findUnique({
      where: { id: storyId },
      select: { viewers: true }
    })

    if (!story) {
      return NextResponse.json({ 
        success: false,
        error: 'Story not found' 
      }, { status: 404 })
    }

    // Viewers array'ini parse et
    let viewers = []
    try {
      viewers = JSON.parse(story.viewers as string)
    } catch {
      viewers = []
    }

    // Kullanıcı zaten görmüş mü kontrol et
    if (!viewers.includes(user.id)) {
      viewers.push(user.id)
      
      // Story'yi güncelle
      await db.postSocial.update({
        where: { id: storyId },
        data: {
          viewers: JSON.stringify(viewers)
        }
      })
    }

    return NextResponse.json({ 
      success: true,
      message: 'Story viewed successfully'
    })
  } catch (error) {
    console.error('View story error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to mark story as viewed' 
    }, { status: 500 })
  }
}