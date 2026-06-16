import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

// GET /api/user/stats
export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Kullanıcı bilgileri
    const users = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        avatarUrl: true,
        googleId: true,
        role: true,
        rolejob: true,
        bio: true,
        cover: true,
        location: true,
        bannerUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!users) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // İstatistikler
    const [
      postSocialCount,
      photosCount,
      videosCount,
      friendCount,
      friendRequestCount,
      followingCount,
      followersCount,
      socialFollowingCount,
      socialFollowersCount,
    ] = await Promise.all([
      // PostSocial toplam post
      db.postSocial.count({
        where: { userId: user.id },
      }),

      // Fotoğraflı postlar
      db.postSocial.count({
        where: {
          userId: user.id,
          images: { isEmpty: false },
        },
      }),

      // Videolar
      db.video.count({
        where: {
          userId: user.id,
          visibility: "public",
        },
      }),

      // Arkadaşlar (accepted)
      db.friendRequest.count({
        where: {
          OR: [
            { userId: user.id, status: "accepted" },
            { friendId: user.id, status: "accepted" },
          ],
        },
      }),

      // Bekleyen istekler
      db.friendRequest.count({
        where: {
          friendId: user.id,
          status: "pending",
        },
      }),

      // Follow (ana sistem)
      db.follow.count({
        where: { followerId: user.id },
      }),

      db.follow.count({
        where: { followingId: user.id },
      }),

      // Social follow
      db.followSocial.count({
        where: { followerId: user.id },
      }),

      db.followSocial.count({
        where: { followingId: user.id },
      }),
    ]);

    return NextResponse.json({
      success: true,
      users,
      stats: {
        posts: postSocialCount,
        photos: photosCount,
        videos: videosCount,
        friends: friendCount,
        friendRequests: friendRequestCount,

        following: followingCount,
        followers: followersCount,

        socialFollowing: socialFollowingCount,
        socialFollowers: socialFollowersCount,

        totalFollowing: followingCount + socialFollowingCount,
        totalFollowers: followersCount + socialFollowersCount,

        events: 0, // ileride eklenecek
      },
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user stats" },
      { status: 500 }
    );
  }
}
