// /app/api/writer/route.ts
import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
export async function PUT(req: Request) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { penName, category } = await req.json();

    if (!penName || !category) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const users = await db.user.findUnique({
      where: { email: user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingWriter = await db.writer.findUnique({
      where: { userId: user.id },
    });

    if (existingWriter) {
      return NextResponse.json(
        { message: "You are already a writer" },
        { status: 400 },
      );
    }

    // Writer kaydı oluştur
    await db.writer.create({
      data: {
        penName,
        category,
        userId: user.id,
      },
    });

    // Rolü güncelle
    await db.user.update({
      where: { id: user.id },
      data: {
        role: "WRITER",
      },
    });

    return NextResponse.json({ message: "You are now a writer 🎉" });
  } catch (error) {
    console.error("Writer creation failed:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
