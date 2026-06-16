import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

export async function GET(req: Request) {
  try {
    // Fetch all professions, sorted by the createdAt field
    const professions = await db.profession.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(professions);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  try {
    // Create a new profession
    const profession = await db.profession.create({
      data: {
        name,
        slug: slugify(name, { lower: true }),
      },
    });

    return NextResponse.json(profession);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
