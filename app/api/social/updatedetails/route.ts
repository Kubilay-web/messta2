// app/api/social/updatedetails/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";

export async function PUT(req: NextRequest) {
  try {
    // Kullanıcıyı doğrula
    const { user } = await validateRequest(); // token'den userId al
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { infos } = await req.json();

    // Prisma upsert: detay yoksa oluştur, varsa güncelle
    const updated = await db.userDetails.upsert({
      where: { userId: user.id },
      update: {
        biosocial: infos.bio,
        otherName: infos.otherName,
        job: infos.job,
        workplace: infos.workplace,
        highSchool: infos.highSchool,
        college: infos.college,
        currentCity: infos.currentCity,
        hometown: infos.hometown,
        relationship: infos.relationship,
        instagram: infos.instagram,
      },
      create: {
        userId: user.id,
        biosocial: infos.bio,
        otherName: infos.otherName,
        job: infos.job,
        workplace: infos.workplace,
        highSchool: infos.highSchool,
        college: infos.college,
        currentCity: infos.currentCity,
        hometown: infos.hometown,
        relationship: infos.relationship,
        instagram: infos.instagram,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error("Update Details Error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
