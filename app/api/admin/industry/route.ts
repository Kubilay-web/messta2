import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

export async function GET() {
  try {
    const industries = await db.industry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(industries);
  } catch (error: any) {
    console.error("[INDUSTRY_GET_ERROR]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { err: "Name is required and must be at least 3 characters long." },
        { status: 400 },
      );
    }

    const slug = slugify(name, { lower: true });

    const industry = await db.industry.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(industry);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
