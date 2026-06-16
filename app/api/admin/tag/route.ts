import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

// GET isteği: Tüm tag'leri listele
export async function GET() {
  try {
    const tags = await db.tag.findMany({
      orderBy: { createdAt: "desc" }, // createdAt'e göre azalan sırayla getir
    });

    return NextResponse.json(tags);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// POST isteği: Yeni bir tag oluştur
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ err: "Name is required" }, { status: 400 });
    }

    const tag = await db.tag.create({
      data: {
        name,
        slug: slugify(name, { lower: true }),
      },
    });

    return NextResponse.json(tag);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
