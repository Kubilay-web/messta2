import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { RoleMedical, DoctorStatus } from "@prisma/client";
import { Resend } from "resend";
import { validateRequest } from "@/app/auth";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateToken() {
  return Math.floor(100000 + Math.random() * 900000); // 6 haneli
}

export async function POST(req: Request) {
  try {
    // 1️⃣ Kullanıcıyı doğrula
    const { user } = await validateRequest();

    if (!user?.id || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const token = generateToken();

    // 2️⃣ User güncelle
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        rolemedical: RoleMedical.DOCTOR, // sabit DOCTOR
        plan: body.plan ?? "professional",
        isVerfied: false,
        token,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        country: body.country,
      },
    });

    // 3️⃣ DoctorProfile oluştur
    // ⚠️ userId artık string olmalı (ObjectId değil)
    await db.doctorProfile.create({
      data: {
        userId: user.id, // string id
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        country: body.country,
        status: DoctorStatus.PENDING,
        trackingNumber: `DOC-${Date.now()}`,
      },
    });

    // 4️⃣ Mail gönder
    await resend.emails.send({
      from: "sandbox@resend.dev", // Resend’de doğrulanmış mail
      to: "kubilayozdemir95@gmail.com", // Kullanıcı maili, kayıtlı olması gerekmez
      subject: "Verify your medical account",
      html: `
    <div style="font-family: Arial, sans-serif; line-height:1.5;">
      <h2>Hello,</h2>
      <p>Your verification code is:</p>
      <h1 style="letter-spacing:4px;">${token}</h1>
      <p>Please enter this code to verify your account.</p>
    </div>
  `,
    });

    return NextResponse.json({
      success: true,
      userId: updatedUser.id,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
