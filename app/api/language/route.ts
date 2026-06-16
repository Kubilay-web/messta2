import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const languages = await db.language.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(languages);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
