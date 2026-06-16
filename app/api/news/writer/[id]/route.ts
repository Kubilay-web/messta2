// app/api/writer/[id]/route.ts
import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const writer = await db.writer.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            role: true,
          }
        }
      }
    });

    if (!writer) {
      return NextResponse.json(
        { message: "Writer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ writer });
  } catch (error) {
    console.error("Error fetching writer:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const writer = await db.writer.findUnique({
      where: { id: params.id }
    });

    if (!writer) {
      return NextResponse.json(
        { message: "Writer not found" },
        { status: 404 }
      );
    }

    // Kullanıcının rolünü USER'a çevir
    await db.user.update({
      where: { id: writer.userId },
      data: { role: "USER" }
    });

    // Writer'ı sil
    await db.writer.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: "Writer deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting writer:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}