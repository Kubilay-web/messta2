import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma client
import { z } from "zod";

// Dinamik parametre DTO validasyonu
const EventIdSchema = z.object({
  eventId: z.string(),
});

export async function GET(
  request: NextRequest,
  context: { params: { eventId: string } }
) {
  try {
    const { eventId } = context.params;

    // Validasyon
    const parseResult = EventIdSchema.safeParse({ eventId });
    if (!parseResult.success) {
      return NextResponse.json(
        { message: "Invalid eventId" },
        { status: 400 }
      );
    }

    // Etkinliğin availability bilgisini getir
    const availability = await db.availability.findFirst({
      where: {
        userId: (await db.event.findUnique({ where: { id: eventId } }))?.userId,
      },
      include: {
        days: true,
      },
    });

    if (!availability) {
      return NextResponse.json(
        { message: "Availability not found", data: [] },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Event availability fetched successfully",
      data: availability,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
