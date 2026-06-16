// app/api/apply/[apply]/route.ts

import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function GET(
  req: Request,
  context: { params: { apply: string } },
) {
  try {
    const { user } = await validateRequest();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Kullanıcının Candidate kaydını al
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

    // Slug'a göre iş ilanını bul
    const job = await db.jobs.findUnique({
      where: {
        slug: context.params.apply,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Daha önce bu iş için başvuru yapılıp yapılmadığını kontrol et
    const alreadyExists = await db.applyjob.findFirst({
      where: {
        candidateId: candidate.id,
        jobId: job.id,
      },
    });

    return NextResponse.json({ alreadyExists });
  } catch (error) {
    console.error("Error checking apply status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
