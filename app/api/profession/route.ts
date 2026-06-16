import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const professions = await db.profession.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(professions);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
