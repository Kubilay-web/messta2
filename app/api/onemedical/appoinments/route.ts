// app/api/appointments/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const paymentStatus = searchParams.get("paymentStatus"); // ✅ EKLENDİ
    const doctorId = searchParams.get("doctorId");
    const patientId = searchParams.get("patientId");
    const search = searchParams.get("search");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const skip = (page - 1) * limit;

    // Filter oluştur
    let where: any = {};

    if (status && status !== "all") {
      where.status = status;
    }

    if (paymentStatus && paymentStatus !== "all") {
      where.paymentStatus = paymentStatus;
    }

    if (doctorId) {
      where.doctorId = doctorId;
    }

    if (patientId) {
      where.patientId = patientId;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    if (startDate || endDate) {
      where.appointmentDate = {};
      if (startDate) {
        where.appointmentDate.gte = new Date(startDate);
      }
      if (endDate) {
        where.appointmentDate.lte = new Date(endDate);
      }
    }

    // Verileri çek
    const [appointments, total] = await Promise.all([
      db.appointment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { appointmentDate: "desc" },
      }),
      db.appointment.count({ where }),
    ]);

    // İstatistikler - Haftalık ve Aylık

    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7); // ✅ DÜZELTİLDİ
    const monthAgo = new Date(now);
    monthAgo.setMonth(now.getMonth() - 1); // ✅ DÜZELTİLDİ

    const twoWeeksAgo = new Date(now);
    twoWeeksAgo.setDate(now.getDate() - 14); // ✅ EKLENDİ
    const twoMonthsAgo = new Date(now);
    twoMonthsAgo.setMonth(now.getMonth() - 2); // ✅ EKLENDİ

    const [thisWeekStats, thisMonthStats, lastWeekStats, lastMonthStats] =
      await Promise.all([
        // Bu hafta
        db.appointment.aggregate({
          where: {
            paymentStatus: "paid",
            appointmentDate: { gte: weekAgo },
          },
          _sum: { paymentAmount: true },
          _count: true,
        }),
        // Bu ay
        db.appointment.aggregate({
          where: {
            paymentStatus: "paid",
            appointmentDate: { gte: monthAgo },
          },
          _sum: { paymentAmount: true },
          _count: true,
        }),
        // Geçen hafta (önceki 7 gün)
        db.appointment.aggregate({
          where: {
            paymentStatus: "paid",
            appointmentDate: {
              gte: new Date(now.setDate(now.getDate() - 14)),
              lt: weekAgo,
            },
          },
          _sum: { paymentAmount: true },
        }),
        // Geçen ay
        db.appointment.aggregate({
          where: {
            paymentStatus: "paid",
            appointmentDate: {
              gte: new Date(now.setMonth(now.getMonth() - 2)),
              lt: monthAgo,
            },
          },
          _sum: { paymentAmount: true },
        }),
      ]);

    const thisWeekTotal = (thisWeekStats._sum.paymentAmount || 0) / 100;
    const thisMonthTotal = (thisMonthStats._sum.paymentAmount || 0) / 100;
    const lastWeekTotal = (lastWeekStats._sum.paymentAmount || 0) / 100;
    const lastMonthTotal = (lastMonthStats._sum.paymentAmount || 0) / 100;

    const weekIncrease =
      lastWeekTotal > 0
        ? ((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100
        : thisWeekTotal > 0
          ? 100
          : 0;

    const monthIncrease =
      lastMonthTotal > 0
        ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
        : thisMonthTotal > 0
          ? 100
          : 0;

    return NextResponse.json({
      appointments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        thisWeek: thisWeekTotal,
        thisMonth: thisMonthTotal,
        weekIncrease: Math.round(weekIncrease),
        monthIncrease: Math.round(monthIncrease),
        thisWeekCount: thisWeekStats._count,
        thisMonthCount: thisMonthStats._count,
      },
    });
  } catch (error) {
    console.error("Appointments fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// app/api/appointments/route.ts - POST method ekleyin

export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      doctorId,
      doctorName,
      patientId,
      firstName,
      lastName,
      email,
      phone,
      gender,
      dob,
      location,
      appointmentReason,
      appointmentDate,
      appointmentFormattedDate,
      appointmentTime,
      charge,
      occupation,
      medicalDocuments,
    } = body;

    // Charge amount cents'e çevir (eğer dolar olarak geldiyse)
    const amountInCents = Math.round(charge * 100);

    const appointment = await db.appointment.create({
      data: {
        doctorId,
        doctorName: doctorName || null,
        patientId,
        firstName: firstName || null,
        lastName: lastName || null,
        email: email || null,
        phone: phone || null,
        gender: gender || null,
        dob: dob ? new Date(dob) : null,
        location: location || null,
        appointmentReason: appointmentReason || null,
        appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
        appointmentFormattedDate:
          appointmentFormattedDate || new Date().toISOString().split("T")[0],
        appointmentTime: appointmentTime || null,
        charge: amountInCents,
        paymentAmount: amountInCents,
        occupation: occupation || null,
        medicalDocuments: medicalDocuments || [],
        status: "pending",
        paymentStatus: "unpaid",
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Appointment create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
