import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db"
import { validateRequest } from '@/app/auth'

// POST /api/postsocial/[id]/save - Post'u kaydet/kaldır
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

    const postId = params.id

    // Post'un var olduğunu kontrol et
    const post = await db.postSocial.findUnique({
      where: { id: postId }
    })

    if (!post) {
      return NextResponse.json({
        success: false,
        error: 'Post not found'
      }, { status: 404 })
    }

    // Mevcut kaydı kontrol et
    const existingSave = await db.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId
        }
      }
    })

    let isSaved = false
    if (existingSave) {
      // Kaydı kaldır
      await db.savedPost.delete({
        where: { id: existingSave.id }
      })
    } else {
      // Kaydet
      await db.savedPost.create({
        data: {
          userId: user.id,
          postId,
          savedAt: new Date()
        }
      })
      isSaved = true
    }

    return NextResponse.json({
      success: true,
      isSaved,
      message: isSaved ? 'Post saved successfully' : 'Post removed from saved'
    })
  } catch (error) {
    console.error('Save post error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to save post'
    }, { status: 500 })
  }
}