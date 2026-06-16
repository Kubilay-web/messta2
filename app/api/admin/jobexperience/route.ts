import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma client'ının yolu (gerekirse değiştir)
import slugify from "slugify";

// GET: Tüm job experience ID'leri getir
export async function GET() {
  try {
    const jobExperiences = await db.jobexperienceId.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobExperiences);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Yeni bir job experience ID oluştur
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    const slug = slugify(name, { lower: true });

    const newJobExperience = await db.jobexperienceId.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(newJobExperience);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
