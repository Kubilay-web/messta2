// app/api/users/non-writers/route.ts
import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function GET() {
  try {
    const { user } = await validateRequest();
    
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Writer olmayan kullanıcıları bul
    const existingWriters = await db.writer.findMany({
      select: { userId: true }
    });
    
    const writerUserIds = existingWriters.map(w => w.userId);
    
    const users = await db.user.findMany({
      where: {
        id: { notIn: writerUserIds },
        role: { not: "ADMIN" } // Admin'leri de gösterme
      },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
      }
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching non-writer users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}



