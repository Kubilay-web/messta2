import  db  from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { doctorProfileId, availability } = data;

    if (!doctorProfileId || !availability) {
      return NextResponse.json({ error: "Eksik veri" }, { status: 400 });
    }

    const saved = await db.availability.upsert({
      where: { doctorProfileId },
      update: availability,
      create: { doctorProfileId, ...availability },
    });

    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Kayıt sırasında hata oluştu" }, { status: 500 });
  }
}
