// app/api/onesocial/profile/[username]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/app/auth';
import db from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  context: { params: { username: string } }
) {
  try {
    const { user } = await validateRequest();
    const { username } = await context.params;

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Belirli bir kullanıcının profilini getir
    const profileUser = await db.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        avatarUrl: true,
        bio: true,
        location: true,
        portfolio: true,
        bannerUrl: true,
        cover: true,
        role: true,
        createdAt: true,
        UserDetails: {
          select: {
            biosocial: true,
            otherName: true,
            job: true,
            workplace: true,
            highSchool: true,
            college: true,
            currentCity: true,
            hometown: true,
            relationship: true,
            instagram: true,
          }
        },
        posts: {
          select: { id: true },
        },
        followers: {
          select: { id: true },
        },
        following: {
          select: { id: true },
        },
      }
    });

    if (!profileUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Kullanıcı detaylarını birleştir
    const formattedUser = {
      ...profileUser,
      ...(profileUser.UserDetails && profileUser.UserDetails[0] 
        ? profileUser.UserDetails[0] 
        : {}
      ),
      UserDetails: undefined,
      stats: {
        posts: profileUser.posts?.length || 0,
        followers: profileUser.followers?.length || 0,
        following: profileUser.following?.length || 0,
      },
      posts: undefined,
      followers: undefined,
      following: undefined,
    };

    // Arkadaşları getir
    const friends = await db.friendRequest.findMany({
      where: {
        OR: [
          { userId: profileUser.id, status: 'accepted' },
          { friendId: profileUser.id, status: 'accepted' }
        ]
      },
      take: 8,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        },
        friend: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        }
      }
    });

    // Fotoğrafları getir
    const photos = await db.postSocial.findMany({
      where: {
        userId: profileUser.id,
        images: {
          isEmpty: false
        }
      },
      take: 9,
      select: {
        images: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Arkadaşları formatla
    const formattedFriends = friends.map(friend => {
      const friendUser = friend.userId === profileUser.id ? friend.friend : friend.user;
      return {
        id: friendUser.id,
        username: friendUser.username,
        name: friendUser.displayName || friendUser.username,
        avatar: friendUser.avatarUrl || '/default-avatar.png',
        isStory: Math.random() > 0.5,
        mutualCount: Math.floor(Math.random() * 50) + 1
      };
    });

    // Fotoğrafları formatla
    const formattedPhotos = photos.flatMap(photo =>
      photo.images.slice(0, 3).map(img => img)
    ).slice(0, 9);

    return NextResponse.json({
      success: true,
      data: {
        user: formattedUser,
        friends: formattedFriends,
        photos: formattedPhotos,
        isCurrentUser: username === user.username
      }
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PATCH: Profil bilgilerini güncelle (sadece kendi profili için)
export async function PATCH(
  request: NextRequest,
  context: { params: { username: string } }
) {
  try {
    const { user } = await validateRequest();
    const { username } = await context.params;

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Sadece kendi profili güncellenebilir
    if (username !== user.username) {
      return NextResponse.json(
        { success: false, message: 'You can only update your own profile' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      displayName,
      bio,
      location,
      portfolio,
      avatarUrl,
      bannerUrl,
      cover,
      biosocial,
      otherName,
      job,
      workplace,
      highSchool,
      college,
      currentCity,
      hometown,
      relationship,
      instagram,
    } = body;

    // Temel kullanıcı bilgilerini güncelle
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        displayName,
        bio,
        location,
        portfolio,
        avatarUrl,
        bannerUrl,
        cover,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        avatarUrl: true,
        bio: true,
        location: true,
        portfolio: true,
        bannerUrl: true,
        cover: true,
        role: true,
        createdAt: true,
      }
    });

    // UserDetails varsa güncelle, yoksa oluştur
    await db.userDetails.upsert({
      where: { userId: user.id },
      update: {
        biosocial,
        otherName,
        job,
        workplace,
        highSchool,
        college,
        currentCity,
        hometown,
        relationship,
        instagram,
      },
      create: {
        userId: user.id,
        biosocial,
        otherName,
        job,
        workplace,
        highSchool,
        college,
        currentCity,
        hometown,
        relationship,
        instagram,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}