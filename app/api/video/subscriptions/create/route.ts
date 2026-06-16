import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: NextRequest) {
  try {
    console.log("=== SUBSCRIBE API START ===");
    
    const { user } = await validateRequest();
    console.log("User from validateRequest:", user?.id, user?.email);
    
    if (!user) {
      console.log("❌ No user found - returning 401");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log("Request body:", body);
    
    const { userId } = body;
    console.log("Target userId:", userId);

    if (!userId) {
      console.log("❌ No userId provided - returning 400");
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Mevcut kullanıcıyı bul
    console.log("Searching for current user with id:", user.id);
    const currentUser = await db.user.findUnique({
      where: { id: user.id }
    });
    console.log("Current user found:", currentUser?.id, currentUser?.email);

    if (!currentUser) {
      console.log("❌ Current user not found - returning 404");
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Kendine abone olmayı engelle
    if (currentUser.id === userId) {
      console.log("❌ Cannot subscribe to self - returning 400");
      return NextResponse.json(
        { error: "Cannot subscribe to yourself" },
        { status: 400 }
      );
    }

    // Hedef kullanıcının var olup olmadığını kontrol et
    console.log("Checking if target user exists:", userId);
    const targetUser = await db.user.findUnique({
      where: { id: userId }
    });
    console.log("Target user exists:", !!targetUser);
    
    if (!targetUser) {
      console.log("❌ Target user not found - returning 404");
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 }
      );
    }

    // Zaten abone mi kontrol et
    console.log("Checking existing subscription for viewer:", currentUser.id, "creator:", userId);
    const existingSubscription = await db.subscription.findFirst({
      where: {
        viewerId: currentUser.id,
        creatorId: userId
      }
    });
    console.log("Existing subscription:", existingSubscription?.id || "None");

    if (existingSubscription) {
      console.log("❌ Already subscribed - returning 400");
      return NextResponse.json(
        { error: "Already subscribed" },
        { status: 400 }
      );
    }

    // Yeni abonelik oluştur
    console.log("Creating new subscription...");
    const subscription = await db.subscription.create({
      data: {
        viewerId: currentUser.id,
        creatorId: userId
      }
    });
    console.log("✅ Subscription created successfully:", subscription.id);

    return NextResponse.json(
      { success: true, subscription },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Subscribe error DETAILS:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}