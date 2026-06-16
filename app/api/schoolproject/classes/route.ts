import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { generateSlug } from "../generateSlug";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const slug = generateSlug(data.title);
    data.slug = slug;

    // Check if the class already exists
    const existingClass = await db.class.findUnique({
      where: {
        slug,
      },
    });

    if (existingClass) {
      return NextResponse.json(
        {
          data: null,
          error: "Class Already exists",
        },
        { status: 409 }
      );
    }

    const newClass = await db.class.create({
      data,
    });

    console.log(
      `Class created successfully: ${newClass.title} (${newClass.id})`
    );

    return NextResponse.json(
      {
        data: newClass,
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
    const classes = await db.class.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        streams: {
          include: {
            _count: {
              select: {
                students: true,
              },
            },
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
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