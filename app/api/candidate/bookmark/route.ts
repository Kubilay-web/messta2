import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user } = await validateRequest();

    const { ids: jobId } = body;

    if (!user?.id) {
      return NextResponse.json(
        { err: "First you must login" },
        { status: 401 },
      );
    }

    if (["company", "admin"].includes(user.rolejob)) {
      return NextResponse.json(
        { err: "You must be logged in as a candidate" },
        { status: 403 },
      );
    }

    const candidate = await db.candidate.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!candidate) {
      return NextResponse.json({ err: "Candidate not found" }, { status: 404 });
    }

    const alreadyExists = await db.jobbookmark.findFirst({
      where: {
        candidateId: candidate.id,
        jobId: jobId,
      },
    });

    if (alreadyExists) {
      return NextResponse.json(
        { err: "You have already bookmarked this job" },
        { status: 400 },
      );
    }

    const bookmark = await db.jobbookmark.create({
      data: {
        candidateId: candidate.id,
        jobId: jobId,
      },
    });

    return NextResponse.json(bookmark);
  } catch (err: any) {
    console.error("Bookmark POST error:", err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
