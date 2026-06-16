// app/api/admin/team/route.ts

import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

export async function GET() {
  try {
    const teams = await db.team.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(teams);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ err: "Name is required" }, { status: 400 });
    }

    const team = await db.team.create({
      data: {
        name,
        slug: slugify(name, { lower: true }),
      },
    });

    return NextResponse.json(team);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
