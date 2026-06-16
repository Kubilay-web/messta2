import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { user } = await validateRequest();
    const currentUserId = user?.id;
    const { username } = params;

    // Kullanıcıyı bul
    const userExists = await db.user.findUnique({
      where: { username },
      select: { id: true, username: true, displayName: true, avatarUrl: true }
    });

    if (!userExists) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Sayfalama parametreleri
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const type = searchParams.get('type') || 'posts'; // 'posts' veya 'saved'

    let posts = [];
    let total = 0;

    // Postları veya kaydedilen postları al
    if (type === 'posts') {
      [posts, total] = await Promise.all([
        db.postSocial.findMany({
          where: { userId: user?.id },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true
              }
            },
            comments: {
              include: {
                commentBy: {
                  select: {
                    id: true,
                    username: true,
                    displayName: true,
                    avatarUrl: true
                  }
                }
              },
              orderBy: { commentAt: 'desc' },
              take: 2
            },
            React: {
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
            },
            SavedPost: {
              where: { userId: currentUserId || '' },
              take: 1
            }
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit
        }),
        db.postSocial.count({
          where: { userId: user?.id }
        })
      ]);
    } else if (type === 'saved' && currentUserId) {
      [posts, total] = await Promise.all([
        db.savedPost.findMany({
          where: { userId: currentUserId },
          include: {
            post: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    displayName: true,
                    avatarUrl: true
                  }
                },
                comments: {
                  include: {
                    commentBy: {
                      select: {
                        id: true,
                        username: true,
                        displayName: true,
                        avatarUrl: true
                      }
                    }
                  },
                  orderBy: { commentAt: 'desc' },
                  take: 2
                },
                React: {
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
                },
                SavedPost: {
                  where: { userId: currentUserId },
                  take: 1
                }
              }
            }
          },
          orderBy: { savedAt: 'desc' },
          skip,
          take: limit
        }).then(savedPosts => savedPosts.map(sp => ({ ...sp.post, savedAt: sp.savedAt }))),
        db.savedPost.count({
          where: { userId: currentUserId }
        })
      ]);
    }

    return NextResponse.json({
      success: true,
      data: {
        posts,
        total,
        page,
        limit,
        hasMore: skip + posts.length < total,
        user: {
          id: user?.id,
          username: user.username,
          displayName: user.displayName,
          avatarUrl: user.avatarUrl
        }
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
