import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db"
import { validateRequest } from '@/app/auth'



// GET /api/onesocial/suggestions - Takip edilebilecek kişileri öner
export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest()
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '5')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    const userId = user?.id

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    // 1. Şu anda takip ettiğim kişileri bul
    const following = await db.followSocial.findMany({
      where: {
        followerId: userId
      },
      select: {
        followingId: true
      }
    })

    const followingIds = following.map(f => f.followingId)
    const excludedIds = [...followingIds, userId] // Kendimi ve takip ettiklerimi hariç tut

    // 2. Arkadaşlık isteği gönderdiğim kişileri bul
    const friendRequests = await db.friendRequest.findMany({
      where: {
        OR: [
          { userId, status: 'pending' },
          { friendId: userId, status: 'pending' }
        ]
      },
      select: {
        userId: true,
        friendId: true
      }
    })

    const requestedFriendIds = friendRequests.flatMap(req => 
      req.userId === userId ? req.friendId : req.userId
    )

    // 3. Önerilecek kişileri bul
    let suggestedUsers = []

    // 3.1. Takip edilen kişilerin takip ettiklerini bul
    if (followingIds.length > 0) {
      const followingOfFollowing = await db.followSocial.findMany({
        where: {
          followerId: { in: followingIds },
          followingId: { notIn: excludedIds }
        },
        include: {
          following: {
            include: {
              UserDetails: {
                select: {
                  job: true,
                  workplace: true,
                  biosocial: true
                }
              },
              postsocial: {
                select: {
                  id: true
                }
              }
            }
          }
        }
      })

      // Null olan veya following bilgisi eksik olan kayıtları filtrele
      const validFollowingOfFollowing = followingOfFollowing.filter(item => 
        item.following && item.following.id
      )

      // Benzersiz kullanıcıları ekle
      validFollowingOfFollowing.forEach(item => {
        const followingUser = item.following
        if (!suggestedUsers.find(u => u.id === followingUser.id) &&
            !excludedIds.includes(followingUser.id)) {
          suggestedUsers.push(followingUser)
        }
      })
    }

    // 4. Ortak takipçilere sahip kişileri bul
    const usersWithCommonFollowers = await db.user.findMany({
      where: {
        AND: [
          { id: { notIn: excludedIds } }, // Kendimi ve takip ettiklerimi hariç tut
          { id: { notIn: requestedFriendIds } }, // Arkadaşlık isteği gönderdiğim kişileri hariç tut
          { id: { notIn: suggestedUsers.map(u => u.id) } } // Zaten eklenmiş olanları hariç tut
        ]
      },
      include: {
        // Kullanıcının takipçileri
        FollowSocials: {
          select: {
            followerId: true
          }
        },
        // Kullanıcının takip ettikleri
        FollowSocial: {
          select: {
            followingId: true
          }
        },
        // Kullanıcı detayları
        UserDetails: {
          select: {
            job: true,
            workplace: true,
            biosocial: true
          }
        },
        // Post sayısı için
        postsocial: {
          select: {
            id: true
          }
        }
      },
      take: 50 // Daha fazla veri çekiyoruz
    })

    // 5. Kullanıcıları puanlandır ve sırala
    const scoredUsers = usersWithCommonFollowers.map(user => {
      let score = 0
      
      // Ortak takipçi sayısı
      const commonFollowers = user.FollowSocials?.filter(f => 
        followingIds.includes(f.followerId)
      ).length || 0
      score += commonFollowers * 10

      // Ortak takip edilen kişi sayısı
      const commonFollowing = user.FollowSocial?.filter(f => 
        followingIds.includes(f.followingId)
      ).length || 0
      score += commonFollowing * 5

      // Şehir veya iş yerine göre puan
      const userDetails = user.UserDetails?.[0]
      if (userDetails?.workplace) {
        score += 2
      }

      // Kullanıcı aktivitesi (post sayısı)
      const postCount = user.postsocial?.length || 0
      score += postCount

      return {
        ...user,
        score,
        postCount
      }
    })

    // 6. Suggested users'a puan ekleyelim
    const suggestedScoredUsers = suggestedUsers.map(user => {
      let score = 50 // Başlangıç puanı - takip ettiğim kişilerin takip ettikleri

      // Ortak takipçi puanı ekleyelim
      const commonFollowers = user.FollowSocials?.filter(f => 
        followingIds.includes(f.followerId)
      ).length || 0
      score += commonFollowers * 15

      // Post sayısına göre puan
      const postCount = user.postsocial?.length || 0
      score += postCount * 2

      return {
        ...user,
        score,
        postCount
      }
    })

    // 7. Tüm kullanıcıları birleştir ve sırala
    const allUsers = [...scoredUsers, ...suggestedScoredUsers]
      .filter(user => user.id && user.displayName) // Geçerli kullanıcıları filtrele

    const topUsers = allUsers
      .sort((a, b) => b.score - a.score)
      .slice(skip, skip + limit)

    // 8. Yanıtı formatla
    const formattedUsers = topUsers.map(user => {
      const userDetails = user.UserDetails?.[0]
      
      // Arkadaşlık isteği durumunu kontrol et
      const friendRequest = friendRequests.find(req => 
        (req.userId === userId && req.friendId === user.id) ||
        (req.friendId === userId && req.userId === user.id)
      )

      // Takip durumunu kontrol et
      const isFollowing = followingIds.includes(user.id)

      // Post sayısını güvenli şekilde al
      const postCount = user.postsocial?.length || 0
      const followerCount = user.FollowSocials?.length || 0
      const followingCount = user.FollowSocial?.length || 0

      return {
        id: user.id,
        name: user.displayName || user.username,
        username: user.username,
        avatar: user.avatarUrl || '/default-avatar.png',
        bio: userDetails?.biosocial || user.bio || '',
        role: userDetails?.job || 'User',
        workplace: userDetails?.workplace,
        mutualFollowers: user.FollowSocials?.filter(f => 
          followingIds.includes(f.followerId)
        ).length || 0,
        isFollowing: isFollowing,
        hasRequested: friendRequest ? {
          id: friendRequest.id,
          status: friendRequest.status,
          isIncoming: friendRequest.friendId === userId
        } : null,
        stats: {
          posts: postCount,
          followers: followerCount,
          following: followingCount
        }
      }
    })

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      pagination: {
        page,
        limit,
        total: allUsers.length,
        hasMore: skip + limit < allUsers.length
      }
    })
  } catch (error) {
    console.error('Get suggestions error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch suggestions'
    }, { status: 500 })
  }
}