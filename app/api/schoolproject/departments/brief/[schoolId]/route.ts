import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { schoolId: string } }
) {
  try {
    const { schoolId } = params;

    const departments = await db.department.findMany({
      where: {
        schoolId,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(departments, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 500 });
  }
}