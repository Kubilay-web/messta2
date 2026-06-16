import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

export async function GET() {
  try {
    const educationids = await db.educationid.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(educationids);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  try {
    const educationid = await db.educationid.create({
      data: {
        name,
        slug: slugify(name, { lower: true }),
      },
    });

    return NextResponse.json(educationid);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
