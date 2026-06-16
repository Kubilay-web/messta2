import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // prisma client

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const writer = await db.writer.findUnique({
      where: { id },
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

    if (!writer) {
      return NextResponse.json(
        { message: "Writer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ writer });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get writer" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Güncellenebilir alanlar
    const { penName, category } = body;

    const updatedWriter = await db.writer.update({
      where: { id },
      data: {
        penName,
        category,
      },
    });

    return NextResponse.json({ updatedWriter });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update writer" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // Writer'ı sil
    await db.writer.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Writer deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update writer" },
      { status: 500 },
    );
  }
}
