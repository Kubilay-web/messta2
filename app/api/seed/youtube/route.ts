// app/api/seed/video/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log("🗑️ Deleting all video-related data...");

    await prisma.commentReaction.deleteMany({});
    await prisma.commentVideo.deleteMany({});
    await prisma.playlistVideo.deleteMany({});
    await prisma.playlist.deleteMany({});
    await prisma.videoReaction.deleteMany({});
    await prisma.videoView.deleteMany({});
    await prisma.video.deleteMany({});
    await prisma.videoCategory.deleteMany({});
    await prisma.subscription.deleteMany({});

    console.log("✅ All data deleted successfully");

    return NextResponse.json({
      success: true,
      message: "All video-related data deleted",
    });
  } catch (error) {
    console.error("❌ Delete error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error deleting data",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  return POST();
}