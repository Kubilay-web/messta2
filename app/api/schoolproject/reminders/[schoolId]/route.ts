import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { Key } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { schoolId: string } }
) {
  try {
    const { schoolId } = params;
    const searchParams = request.nextUrl.searchParams;
    const key = (searchParams.get("key") as Key) || "All";

    const reminders = await db.reminder.findMany({
      where: {
        schoolId,
        recipient: key,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reminders, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 500 });
  }
}