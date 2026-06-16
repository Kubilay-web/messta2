import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ err: "Not authorized" }, { status: 404 });
  }

  const { level, degree, year, notes } = body;

  try {
    // Giriş yapan kullanıcıya ait Candidate kaydını bul
    const candidate = await db.candidate.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    const education = await db.jobEducation.create({
      data: {
        candidate_id: candidate.id,
        level,
        degree,
        year,
        notes,
      },
    });

    return NextResponse.json(education);
  } catch (err: any) {
    console.error("POST /education error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ err: "Not authorized" }, { status: 404 });
  }

  try {
    const candidate = await db.candidate.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    const educations = await db.jobEducation.findMany({
      where: {
        candidate_id: candidate.id,
      },
    });

    return NextResponse.json(educations);
  } catch (err: any) {
    console.error("GET /education error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
