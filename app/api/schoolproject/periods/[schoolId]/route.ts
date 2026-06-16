import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { schoolId: string } }
) {
  try {
    const { schoolId } = params;

    const periods = await db.period.findMany({
      where: {
        schoolId,
      },
      orderBy: [{ year: "desc" }, { term: "asc" }],
    });

    // Group periods by year
    const groupedPeriods = periods.reduce((acc, period) => {
      const year = period.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(period);
      return acc;
    }, {}); // {} yerine any veya implicit type

    // Sort terms within each year
    Object.keys(groupedPeriods).forEach((year) => {
      groupedPeriods[Number(year)].sort((a, b) => a.term - b.term);
    });

    return NextResponse.json(
      {
        data: periods,
        grouped: groupedPeriods,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: [],
        grouped: {},
      },
      { status: 500 }
    );
  }
}