import { NextRequest, NextResponse } from "next/server";
import { EventLocationEnumType } from "@prisma/client";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

// DTO'ları burada tanımlıyoruz
interface CreateEventDto {
  title: string;
  description?: string;
  duration?: number;
  locationType: EventLocationEnumType;
}

// GET isteği için handler
export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 401 }
      );
    }

    const { events, username } = await getUserEventsService(userId);
    return NextResponse.json({
      message: "User events fetched successfully",
      data: { events, username },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST isteği için handler
export async function POST(request: NextRequest) {
  try {
    // Yeni event oluştur
    const createEventDto: CreateEventDto = await request.json();
const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = user?.id;


    if (!userId) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 401 }
      );
    }

    const event = await createEventService(userId, createEventDto);
    return NextResponse.json(
      {
        message: "Event created successfully",
        event,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Servis fonksiyonları
async function createEventService(
  userId: string,
  createEventDto: CreateEventDto
) {
  // Slug oluştur (başlıktan)
  const slug = createEventDto.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return await db.event.create({
    data: {
      title: createEventDto.title,
      description: createEventDto.description,
      duration: createEventDto.duration || 30,
      locationType: createEventDto.locationType,
      slug: slug,
      userId: userId,
    },
  });
}

async function getUserEventsService(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { username: true },
  });

  const events = await db.event.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      meetings: true,
    },
  });

  return { events, username: user?.username || "" };
}
