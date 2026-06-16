// app/api/availability/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

// GET isteği için handler
export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 401 }
      );
    }

    // Kullanıcının availability bilgilerini getir
    const availability = await db.availability.findUnique({
      where: { userId },
      include: {
        days: {
          orderBy: {
            day: "asc", // Günleri sıralı şekilde getir
          },
        },
      },
    });

    // Eğer availability bulunamazsa boş bir yapı döndür
    if (!availability) {
      return NextResponse.json(
        {
          message: "Availability not found, returning empty structure",
          availability: {
            timeGap: 30, // Varsayılan değer
            days: [],
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Fetched availability successfully",
        availability,
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

// POST isteği için handler (Availability oluşturma/update)
export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 401 }
      );
    }

    const { timeGap, days } = await request.json();

    // Mevcut availability'yi kontrol et
    const existingAvailability = await db.availability.findUnique({
      where: { userId },
    });

    if (existingAvailability) {
      // Güncelleme işlemi - önce mevcut günleri sil
      await db.dayAvailability.deleteMany({
        where: { availabilityId: existingAvailability.id },
      });

      // Sonra availability'yi güncelle
      const updatedAvailability = await db.availability.update({
        where: { userId },
        data: {
          timeGap,
          days: {
            create: days.map((day: any) => ({
              day: day.day,
              startTime: new Date(day.startTime),
              endTime: new Date(day.endTime),
              isAvailable: day.isAvailable,
            })),
          },
        },
        include: {
          days: {
            orderBy: {
              day: "asc",
            },
          },
        },
      });

      return NextResponse.json(
        {
          message: "Availability updated successfully",
          availability: updatedAvailability,
        },
        { status: 200 }
      );
    } else {
      // Yeni oluşturma işlemi
      const newAvailability = await db.availability.create({
        data: {
          timeGap,
          userId,
          days: {
            create: days.map((day: any) => ({
              day: day.day,
              startTime: new Date(day.startTime),
              endTime: new Date(day.endTime),
              isAvailable: day.isAvailable,
            })),
          },
        },
        include: {
          days: {
            orderBy: {
              day: "asc",
            },
          },
        },
      });

      return NextResponse.json(
        {
          message: "Availability created successfully",
          availability: newAvailability,
        },
        { status: 201 }
      );
    }
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

import { DayOfWeekEnum } from "@prisma/client";

// DTO interface'leri
interface UpdateAvailabilityDto {
  timeGap: number;
  days: DayAvailabilityDto[];
}

interface DayAvailabilityDto {
  day: DayOfWeekEnum;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// PUT isteği için handler (Availability güncelleme)
export async function PUT(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 401 }
      );
    }

    // Request body'den verileri al
    const updateAvailabilityDto: UpdateAvailabilityDto = await request.json();

    // Validasyon
    if (updateAvailabilityDto.timeGap <= 0) {
      return NextResponse.json(
        { message: "Time gap must be positive" },
        { status: 400 }
      );
    }

    if (
      !updateAvailabilityDto.days ||
      updateAvailabilityDto.days.length === 0
    ) {
      return NextResponse.json(
        { message: "Days array is required" },
        { status: 400 }
      );
    }

    // Mevcut availability'yi kontrol et
    const existingAvailability = await db.availability.findUnique({
      where: { userId },
    });

    if (!existingAvailability) {
      return NextResponse.json(
        { message: "Availability not found" },
        { status: 404 }
      );
    }

    // Transaction kullanarak atomic update işlemi
    const result = await db.$transaction(async (tx) => {
      // Önce mevcut günleri sil
      await tx.dayAvailability.deleteMany({
        where: { availabilityId: existingAvailability.id },
      });

      // Yeni günleri ekle
      const daysData = updateAvailabilityDto.days.map((day) => ({
        day: day.day,
        startTime: new Date(day.startTime),
        endTime: new Date(day.endTime),
        isAvailable: day.isAvailable,
        availabilityId: existingAvailability.id,
      }));

      await tx.dayAvailability.createMany({
        data: daysData,
      });

      // Availability'yi güncelle
      const updatedAvailability = await tx.availability.update({
        where: { userId },
        data: {
          timeGap: updateAvailabilityDto.timeGap,
          updatedAt: new Date(),
        },
        include: {
          days: {
            orderBy: {
              day: "asc",
            },
          },
        },
      });

      return updatedAvailability;
    });

    return NextResponse.json(
      {
        message: "Availability updated successfully",
        availability: result,
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
