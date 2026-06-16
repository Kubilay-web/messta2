import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
  const _req = await req.json();

  try {
    // Slug'ı başlıktan oluştur
    const slug = slugify(_req.title, { lower: true });

    // Yeni blog oluştur
    const blog = await db.blog.create({
      data: {
        ..._req,
        slug,
      },
    });

    return NextResponse.json(blog);
  } catch (err: any) {
    console.error(err);

    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Son 3 blogu getir
    const blogs = await db.blog.findMany({
      take: 50, // En son 3 blog
    });

    return NextResponse.json(blogs);
  } catch (err: any) {
    console.error(err);

    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
