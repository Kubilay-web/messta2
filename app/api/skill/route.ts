import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const skills = await db.skill.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(skills);
  } catch (error: any) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
