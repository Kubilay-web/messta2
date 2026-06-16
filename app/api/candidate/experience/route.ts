import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { user } = await validateRequest();

  const {
    company,
    department,
    designation,
    end,
    start,
    responsibilities,
    currently_working,
  } = body;

  try {
    const candidate = await db.candidate.findUnique({
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

    const experience = await db.experience.create({
      data: {
        candidate_id: candidate.id,
        company,
        department,
        designation,
        start: start ? new Date(start) : null,
        end: end ? new Date(end) : null,
        responsibilities,
        currently_working: currently_working ?? false,
      },
    });

    return NextResponse.json(experience);
  } catch (err: any) {
    console.error("POST /experience error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { user } = await validateRequest();

  try {
    const candidate = await db.candidate.findUnique({
      where: {
        userId: user?.id,
      },
      include: {
        Experience: true,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(candidate.Experience);
  } catch (err: any) {
    console.error("GET /experience error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
