import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { generateSlug } from "../generateSlug";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const slug = generateSlug(data.title);
    data.slug = slug;

    // Check if the stream already exists
    const existingStream = await db.stream.findUnique({
      where: {
        slug,
      },
    });

    if (existingStream) {
      return NextResponse.json(
        {
          data: null,
          error: "Stream Already exists",
        },
        { status: 409 }
      );
    }

    const newStream = await db.stream.create({
      data,
    });

    console.log(
      `Stream created successfully: ${newStream.title} (${newStream.id})`
    );

    return NextResponse.json(
      {
        data: newStream,
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
    const streams = await db.stream.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(streams, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch streams" },
      { status: 500 }
    );
  }
}