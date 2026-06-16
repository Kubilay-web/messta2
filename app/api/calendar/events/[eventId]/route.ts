// app/api/events/[eventId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

interface RouteParams {
  params: {
    eventId: string;
  };
}

// DELETE isteği için handler
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { eventId } = params;

    const { user } = await validateRequest();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 401 }
      );
    }

    // Event'ı bul ve yetki kontrolü yap
    const event = await db.event.findFirst({
      where: {
        id: eventId,
        userId: userId,
      },
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // İlişkili meeting kayıtlarını sil
    await db.meeting.deleteMany({
      where: { eventId: eventId },
    });

    // Event'ı sil
    await db.event.delete({
      where: { id: eventId },
    });

    return NextResponse.json(
      {
        message: "Event deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Diğer HTTP methodları için hata döndür
export async function GET() {
  return NextResponse.json(
    {
      message: "Method not allowed",
    },
    { status: 405 }
  );
}

export async function POST() {
  return NextResponse.json(
    {
      message: "Method not allowed",
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    {
      message: "Method not allowed",
    },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    {
      message: "Method not allowed",
    },
    { status: 405 }
  );
}
