import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function GET() {
  try {
    const { user } = await validateRequest();
    
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Writer'ı bul
    const writer = await db.writer.findUnique({
      where: { userId: user.id }
    });

    if (!writer) {
      return NextResponse.json({ message: "Writer not found" }, { status: 404 });
    }

    // Writer'ın kendi haberlerini getir
    const news = await db.news.findMany({
      where: { writerId: writer.id },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ news });
  } catch (error) {
    console.error("Error fetching writer news:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


// POST - Yeni writer ekle
export async function POST(request: Request) {
  try {
    const { user } = await validateRequest();
    
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    const { penName, category, userId } = await request.json();

    if (!penName || !category || !userId) {
      return NextResponse.json(
        { message: "Pen name, category and user ID are required" },
        { status: 400 }
      );
    }

    // Kullanıcı var mı kontrol et
    const existingUser = await db.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Kullanıcı zaten writer mı kontrol et
    const existingWriter = await db.writer.findUnique({
      where: { userId }
    });

    if (existingWriter) {
      return NextResponse.json(
        { message: "User is already a writer" },
        { status: 400 }
      );
    }

    // Yeni writer oluştur
    const newWriter = await db.writer.create({
      data: {
        penName,
        category,
        userId,
      }
    });

    // Kullanıcının rolünü WRITER olarak güncelle
    await db.user.update({
      where: { id: userId },
      data: { role: "WRITER" }
    });

    return NextResponse.json({
      success: true,
      message: "Writer added successfully",
      writer: newWriter
    });
  } catch (error) {
    console.error("Error adding writer:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Writer güncelle (eski kod)
export async function PUT(request: Request) {
  try {
    const { user } = await validateRequest();
    
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 403 }
      );
    }

    const { penName, category, userId } = await request.json();

    if (!penName || !category || !userId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedWriter = await db.writer.update({
      where: { userId },
      data: { penName, category }
    });

    return NextResponse.json({
      success: true,
      message: "Writer updated successfully",
      writer: updatedWriter
    });
  } catch (error) {
    console.error("Error updating writer:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}