import { NextResponse } from "next/server";
import db from "@/app/lib/db";

// GET: Tüm ülkeleri getir
export async function GET() {
  try {
    const countries = await db.countryJob.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(countries);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// POST: Yeni ülke oluştur
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    const country = await db.countryJob.create({
      data: { name },
    });

    return NextResponse.json(country);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
