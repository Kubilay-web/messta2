import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { schoolId: string } }
) {
  try {
    const { schoolId } = params;

    const classes = await db.class.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        schoolId,
      },
      select: {
        id: true,
        title: true,
      },
    });

    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}