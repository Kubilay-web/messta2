import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

export async function GET() {
  try {
    const jobroles = await db.jobrole.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobroles);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    const slug = slugify(name, { lower: true });

    const jobrole = await db.jobrole.create({
      data: { name, slug },
    });

    return NextResponse.json(jobrole);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
