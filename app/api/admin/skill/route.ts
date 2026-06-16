import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

export async function GET() {
  try {
    const skills = await db.skill.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(skills);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;
    const slug = slugify(name, { lower: true });

    const skill = await db.skill.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(skill);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
