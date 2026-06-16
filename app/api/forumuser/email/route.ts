import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validation
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Validation error",
            details: { email: ["Email is required"] },
          },
        },
        { status: 400 }
      );
    }

    // DB query
    const user = await db.user.findUnique({
      where: { email },
    });

    // Not found
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "User not found",
          },
        },
        { status: 404 }
      );
    }

    // Success
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "An unexpected error occurred.",
        },
      },
      { status: 500 }
    );
  }
}
