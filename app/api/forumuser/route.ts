import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma Client burada tanımlı olmalı

export async function GET() {
  try {
    const users = await db.user.findMany();

    return NextResponse.json(
      { success: true, data: users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while fetching users.",
      },
      { status: 500 }
    );
  }
}
