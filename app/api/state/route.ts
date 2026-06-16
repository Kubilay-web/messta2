import { NextResponse } from "next/server";
import db from "@/app/lib/db";

// GET: Tüm state'leri getir
export async function GET() {
  try {
    const states = await db.state.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(states);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { countryId } = body;

    if (!countryId) {
      return NextResponse.json(
        { err: "countryId is required" },
        { status: 400 },
      );
    }

    const states = await db.state.findMany({
      where: {
        countryId: countryId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(states);
  } catch (err: any) {
    console.error("POST /api/state error:", err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
