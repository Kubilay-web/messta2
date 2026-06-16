import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    // If this period is set as active, deactivate all other periods
    if (data.isActive) {
      await db.period.updateMany({
        where: {
          schoolId: data.schoolId,
          isActive: true,
          id: { not: id },
        },
        data: {
          isActive: false,
        },
      });
    }

    const updatedPeriod = await db.period.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      {
        data: updatedPeriod,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await db.period.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}