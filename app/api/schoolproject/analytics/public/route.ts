import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Count users by role for public statistics
    const students = await db.user.count({
      where: {
        roleschool: "STUDENT",
      },
    });

    const teachers = await db.user.count({
      where: {
        roleschool: "TEACHER",
      },
    });

    const parents = await db.user.count({
      where: {
        roleschool: "PARENT",
      },
    });

    const schools = await db.school.count();

    const result = {
      students,
      teachers,
      schools,
      parents,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        students: 0,
        teachers: 0,
        schools: 0,
        parents: 0,
      },
      { status: 500 }
    );
  }
}