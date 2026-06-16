import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import queryString from "query-string";

export async function GET(req: Request) {
  try {
    const { query } = queryString.parseUrl(req.url);
    const { country, state, city, skill } = query as {
      country?: string;
      state?: string;
      city?: string;
      skill?: string;
    };

    const filters: any = {};

    if (country) {
      filters.countryId = country;
    }
    if (state) {
      filters.stateId = state;
    }
    if (city) {
      filters.cityId = city;
    }
    if (skill) {
      filters.skill_id = {
        has: skill,
      };
    }

    const candidates = await db.candidate.findMany({
      where: filters,
      include: {
        country: true,
        state: true,
        city: true,
      },
    });

    return NextResponse.json(candidates);
  } catch (err: any) {
    console.error("Error fetching candidates:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
