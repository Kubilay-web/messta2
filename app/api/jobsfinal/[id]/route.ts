import { NextResponse } from "next/server";
import db from "@/app/lib/db"

interface Params {
  params: { id: string };
}

// ✅ Tek job getir
export async function GET(req: Request, { params }: Params) {
  try {
    const job = await db.jobs.findUnique({
      where: { id: params.id },
      include: {
        company: true,
        job_category: true,
        job_role: true,
        job_experience: true,
        education: true,
        job_type: true,
        salary_type: true,
        city: true,
        state: true,
        country: true,
        jobtags: true,
        Job_benfits: true,
        Jobskill: true,
      },
    });

    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

// ✅ Job güncelle
export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json();

    const job = await db.jobs.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

// ✅ Job sil
export async function DELETE(req: Request, { params }: Params) {
  try {
    await db.jobs.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Job deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
