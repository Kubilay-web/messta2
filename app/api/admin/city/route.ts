import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma client import

// GET: Fetch all cities, including their associated state and country data
export async function GET() {
  try {
    const cities = await db.city.findMany({
      include: {
        state: true,
        country: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(cities);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// POST: Create a new city with selected country and state
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, selectedCountryId, selectedStateId } = body;

    // Create a new city record in the database
    const newCity = await db.city.create({
      data: {
        name,
        countryId: selectedCountryId,
        stateId: selectedStateId,
      },
    });

    return NextResponse.json(newCity);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
