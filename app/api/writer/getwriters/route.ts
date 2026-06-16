// app/api/writers/route.ts
import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const writers = await db.writer.findMany({
      where: {
        user: {
          role: "WRITER",
        },
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
            role: true,
            avatarUrl: true,
          },
        },
      },
    });

    return NextResponse.json({ writers });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to load writers" },
      { status: 500 },
    );
  }
}
