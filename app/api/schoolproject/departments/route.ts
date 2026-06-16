import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { generateSlug } from "../generateSlug";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const slug = generateSlug(data.name);
    data.slug = slug;

    // Check if department already exists
    const existingDepartment = await db.department.findUnique({
      where: {
        slug,
      },
    });

    if (existingDepartment) {
      return NextResponse.json(
        {
          data: null,
          error: "Department already exists",
        },
        { status: 409 }
      );
    }

    const newDepartment = await db.department.create({
      data,
    });

    return NextResponse.json(
      {
        data: newDepartment,
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

export async function GET(request: NextRequest) {
  try {
    const departments = await db.department.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        teachers: true,
        subjects: true,
      },
    });

    return NextResponse.json(departments, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}