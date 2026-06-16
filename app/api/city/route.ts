import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { stateId } = await req.json();

    const cities = await db.city.findMany({
      where: {
        stateId: stateId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(cities);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cities = await db.city.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(cities);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
