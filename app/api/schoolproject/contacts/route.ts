import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, school } = data;

    // Check if the contact already exists
    const existingEmail = await db.contact.findUnique({
      where: {
        email,
      },
    });

    const existingSchool = await db.contact.findUnique({
      where: {
        school,
      },
    });

    if (existingSchool || existingEmail) {
      return NextResponse.json(
        {
          data: null,
          error: "We have already received a request for this school or email",
        },
        { status: 409 }
      );
    }

    const newContact = await db.contact.create({
      data,
    });

    console.log(
      `Contact created successfully: ${newContact.school} (${newContact.id})`
    );

    return NextResponse.json(
      {
        data: newContact,
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
    const contacts = await db.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 500 });
  }
}