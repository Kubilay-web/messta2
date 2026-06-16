import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";


export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Check if period already exists
    const existingPeriod = await db.period.findFirst({
      where: {
        year: data.year,
        term: data.term,
        schoolId: data.schoolId,
      },
    });

    if (existingPeriod) {
      return NextResponse.json(
        {
          data: null,
          error: `Period for Year ${data.year}, Term ${data.term} already exists`,
        },
        { status: 409 }
      );
    }

    // If this period is set as active, deactivate all other periods
    if (data.isActive) {
      await db.period.updateMany({
        where: {
          schoolId: data.schoolId,
          isActive: true,
        },
        data: {
          isActive: false,
        },
      });
    }

    const newPeriod = await db.period.create({
      data,
    });

    return NextResponse.json(
      {
        data: newPeriod,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}