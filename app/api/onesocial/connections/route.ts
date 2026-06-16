import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/app/auth';
import db from "@/app/lib/db"

export async function GET(request: NextRequest) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // URL'den query parametrelerini al
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    const status = searchParams.get('status') || 'friends'; // 'friends', 'pending', 'suggestions'

    let connections = [];
    let total = 0;

    switch (status) {
      case 'friends':
        // Kabul edilmiş arkadaşlıkları getir
        const friends = await db.friendRequest.findMany({
          where: {
            OR: [
              { userId: user.id, status: 'accepted' },
              { friendId: user.id, status: 'accepted' }
            ]
          },
          take: limit,
          skip: skip,
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                bio: true,
                location: true,
                role: true,
                createdAt: true
              }
            },
            friend: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                bio: true,
                location: true,
                role: true,
                createdAt: true
              }
            }
          }
        });

        // Mevcut kullanıcı için arkadaş bilgilerini formatla
        connections = friends.map(friend => {
          const isUser = friend.userId === user.id;
          const friendUser = isUser ? friend.friend : friend.user;
          
          return {
            id: friend.id,
            user: {
              id: friendUser.id,
              name: friendUser.displayName || friendUser.username,
              username: friendUser.username,
              avatar: friendUser.avatarUrl || '/default-avatar.png',
              bio: friendUser.bio,
              location: friendUser.location,
              role: friendUser.role,
              joinedDate: friendUser.createdAt
            },
            status: 'accepted',
            friendshipDate: friend.createdAt,
            mutualFriends: Math.floor(Math.random() * 50) + 1 // Mock data - gerçek veritabanı sorgusu yapılmalı
          };
        });

        total = await db.friendRequest.count({
          where: {
            OR: [
              { userId: user.id, status: 'accepted' },
              { friendId: user.id, status: 'accepted' }
            ]
          }
        });
        break;

      case 'pending':
        // Bekleyen arkadaşlık isteklerini getir (bana gelen istekler)
        const pendingRequests = await db.friendRequest.findMany({
          where: {
            friendId: user.id,
            status: 'pending'
          },
          take: limit,
          skip: skip,
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                bio: true,
                location: true,
                role: true,
                createdAt: true
              }
            }
          }
        });

        connections = pendingRequests.map(request => ({
          id: request.id,
          user: {
            id: request.user.id,
            name: request.user.displayName || request.user.username,
            username: request.user.username,
            avatar: request.user.avatarUrl || '/default-avatar.png',
            bio: request.user.bio,
            location: request.user.location,
            role: request.user.role,
            joinedDate: request.user.createdAt
          },
          status: 'pending',
          requestDate: request.createdAt,
          mutualFriends: Math.floor(Math.random() * 20) + 1
        }));

        total = await db.friendRequest.count({
          where: {
            friendId: user.id,
            status: 'pending'
          }
        });
        break;

      case 'suggestions':
        // Arkadaş önerilerini getir (takip ettiğim kişilerin arkadaşları)
        const following = await db.followSocial.findMany({
          where: {
            followerId: user.id
          },
          select: {
            followingId: true
          }
        });

        const followingIds = following.map(f => f.followingId);
        
        // Takip ettiklerimin arkadaşlarını bul (ben hariç)
        const suggestedFriends = await db.friendRequest.findMany({
          where: {
            OR: [
              {
                userId: { in: followingIds },
                friendId: { not: user.id },
                status: 'accepted'
              },
              {
                friendId: { in: followingIds },
                userId: { not: user.id },
                status: 'accepted'
              }
            ]
          },
          take: limit,
          skip: skip,
          distinct: ['userId', 'friendId'],
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                bio: true,
                location: true,
                role: true,
                createdAt: true
              }
            },
            friend: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                bio: true,
                location: true,
                role: true,
                createdAt: true
              }
            }
          }
        });

        // Önerileri formatla ve benzersiz yap
        const uniqueSuggestions = new Map();
        
        suggestedFriends.forEach(friend => {
          const suggestedUser = friend.userId === user.id ? friend.friend : 
                               friend.friendId === user.id ? friend.user :
                               friend.userId !== user.id ? friend.user : friend.friend;
          
          if (suggestedUser.id !== user.id && !uniqueSuggestions.has(suggestedUser.id)) {
            uniqueSuggestions.set(suggestedUser.id, {
              id: suggestedUser.id,
              name: suggestedUser.displayName || suggestedUser.username,
              username: suggestedUser.username,
              avatar: suggestedUser.avatarUrl || '/default-avatar.png',
              bio: suggestedUser.bio,
              location: suggestedUser.location,
              role: suggestedUser.role,
              joinedDate: suggestedUser.createdAt,
              mutualFriends: Math.floor(Math.random() * 10) + 1,
              commonInterests: ['Technology', 'Music', 'Sports', 'Travel'].slice(0, Math.floor(Math.random() * 3) + 1)
            });
          }
        });

        connections = Array.from(uniqueSuggestions.values());
        total = uniqueSuggestions.size;
        break;

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid status parameter' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: connections,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total
      }
    });

  } catch (error) {
    console.error('Error fetching connections:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch connections' },
      { status: 500 }
    );
  }
}