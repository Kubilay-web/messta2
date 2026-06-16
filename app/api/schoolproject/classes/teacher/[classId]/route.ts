import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { classId: string } }
) {
  try {
    const { classId } = params;
    const data = await request.json();

    const updatedClass = await db.class.update({
      where: {
        id: classId,
      },
      data: {
        classTeacherId: data.classTeacherId,
        classTeacherName: data.classTeacherName,
      },
    });

    await db.teacher.update({
      where: {
        id: data.classTeacherId,
      },
      data: {
        isClassTeacher: true,
      },
    });

    if (data.oldClassTeacherId) {
      await db.teacher.update({
        where: {
          id: data.oldClassTeacherId,
        },
        data: {
          isClassTeacher: false,
        },
      });
    }

    console.log(
      `Class updated successfully => New Class teacher: ${updatedClass.classTeacherName}`
    );

    return NextResponse.json(
      {
        data: updatedClass,
        error: null,
      },
      { status: 200 }
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