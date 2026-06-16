import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { schoolId: string } }
) {
  try {
    const { schoolId } = params;

    const students = await db.student.count({
      where: {
        schoolId,
      },
    });

    const parents = await db.parent.count({
      where: {
        schoolId,
      },
    });

    const teachers = await db.teacher.count({
      where: {
        schoolId,
      },
    });

    const result = {
      students,
      parents,
      teachers,
    };

    console.log(result);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        students: 0,
        parents: 0,
        teachers: 0,
      },
      { status: 500 }
    );
  }
}