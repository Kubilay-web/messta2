import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const states = await db.state.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        statename: true,
        countryId: true,
      },
      // include: { country: true },
    });

    return NextResponse.json(states);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { statename, selectedCountryId } = body;

    const state = await db.state.create({
      data: {
        statename,
        countryId: selectedCountryId,
      },
    });

    return NextResponse.json(state);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
