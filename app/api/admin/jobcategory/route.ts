import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

// GET: Tüm job kategorilerini getir
export async function GET() {
  try {
    const jobcat = await db.jobcategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(jobcat);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// POST: Yeni job kategori oluştur
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, icon } = body;

    // Basit validasyon
    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { err: "Name must be at least 3 characters long" },
        { status: 400 },
      );
    }

    if (!icon || icon.trim() === "") {
      return NextResponse.json({ err: "Icon is required" }, { status: 400 });
    }

    const slug = slugify(name, { lower: true });

    const jobcat = await db.jobcategory.create({
      data: {
        name,
        icon,
        slug,
      },
    });

    return NextResponse.json(jobcat);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
