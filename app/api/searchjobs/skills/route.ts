import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing job ID" }, { status: 400 });
    }

    const skills = await db.jobskill.findMany({
      where: {
        jobId: id, // Prisma modelindeki jobId alanı
      },
      orderBy: {
        createdAt: "desc", // createdAt alanı modelde tanımlı
      },
      include: {
        skill: true, // skill ilişkisi modelde tanımlı
      },
    });

    return NextResponse.json(skills);
  } catch (err) {
    console.error("Error fetching job skills:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
