import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

// POST /api/postsocial/[id]/react - Post'a react ekle/güncelle
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
    const body = await request.json()
    const { reactType } = body

    // Geçerli react tipleri
    const validReacts = ['like', 'love', 'haha', 'sad', 'angry', 'wow']
    if (!validReacts.includes(reactType)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid react type'
      }, { status: 400 })
    }

    // Mevcut react'ı kontrol et
    const existingReact = await db.react.findFirst({
      where: {
        postRefId: postId,
        reactById: user.id
      }
    })

    let resultReact
    if (existingReact) {
      // Eğer aynı react varsa sil
      if (existingReact.react === reactType) {
        await db.react.delete({
          where: { id: existingReact.id }
        })
        resultReact = null
      } else {
        // Farklı react varsa güncelle
        resultReact = await db.react.update({
          where: { id: existingReact.id },
          data: { react: reactType },
          include: {
            reactBy: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true
              }
            }
          }
        })
      }
    } else {
      // Yeni react oluştur
      resultReact = await db.react.create({
        data: {
          react: reactType,
          postRefId: postId,
          reactById: user.id,
          createdAt: new Date()
        },
        include: {
          reactBy: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true
            }
          }
        }
      })
    }

    // Post'un tüm react'larını say
    const postReacts = await db.react.findMany({
      where: { postRefId: postId }
    })

    const likesCount = postReacts.filter(r => 
      ['like', 'love', 'haha', 'wow'].includes(r.react)
    ).length

    // Bildirim oluştur (beğenme için)
    if (resultReact && reactType === 'like') {
      const post = await db.postSocial.findUnique({
        where: { id: postId },
        select: { userId: true }
      })

      if (post && post.userId !== user.id) {
        await db.notificationSocial.create({
          data: {
            type: 'like',
            message: `${user.id} liked your post`,
            fromUserId: user.id,
            toUserId: post.userId,
            postId,
            isRead: false,
            createdAt: new Date()
          }
        })
      }
    }

    return NextResponse.json({
      success: true,
      react: resultReact ? {
        id: resultReact.id,
        type: resultReact.react,
        userId: resultReact.reactById,
        user: resultReact.reactBy
      } : null,
      likesCount,
      message: resultReact ? 'React added successfully' : 'React removed successfully'
    })
  } catch (error) {
    console.error('React error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process react'
    }, { status: 500 })
  }
}





// GET /api/postsocial/[id]/react - Post'a yapılan beğenileri kontrol et
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const postId = params.id;

    // Kullanıcının bu post'a bir reaksiyonu olup olmadığını kontrol et
    const existingReact = await db.react.findFirst({
      where: {
        postRefId: postId,
        reactById: user.id,
      },
    });

    const reacts = await db.react.findMany({
      where: {
        postRefId: postId,
      },
      include: {
        reactBy: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      reacts,  // Bu post'a yapılan tüm reaksiyonlar
      isLiked: existingReact ? existingReact.react === 'like' : false, // Kullanıcı beğendi mi?
    });
  } catch (error) {
    console.error('React error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch react status',
      },
      { status: 500 }
    );
  }
}
