import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
export async function POST(req: Request) {
  const { user } = await validateRequest();
  const body = await req.json();
  const { id: jobId } = body;

  try {
    if (!user) {
      return NextResponse.json(
        { err: "First you must login" },
        { status: 401 },
      );
    }

    const userId = user.id;

    // 1. Adayı bul
    const candidate = await db.candidate.findUnique({
      where: { userId },
    });

    if (!candidate) {
      return NextResponse.json({ err: "Candidate not found" }, { status: 404 });
    }

    // 2. Aynı ilana daha önce başvurmuş mu?
    const existingApplication = await db.applyjob.findFirst({
      where: {
        candidateId: candidate.id,
        jobId,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { err: "You have already applied" },
        { status: 400 },
      );
    }

    // 3. Yeni başvuru oluştur
    const application = await db.applyjob.create({
      data: {
        candidate: { connect: { id: candidate.id } },
        job: { connect: { id: jobId } },
      },
    });

    // 4. Job'a ait başvuru sayısını arttır
    await db.jobs.update({
      where: { id: jobId },
      data: { jobcount: { increment: 1 } },
    });

    return NextResponse.json(application, { status: 200 });
  } catch (error: any) {
    console.error("Apply Error:", error);
    return NextResponse.json(
      { err: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
