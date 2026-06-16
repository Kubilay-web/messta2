import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function DELETE(req: Request) {
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

    const candidate = await db.candidate.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!candidate) {
      return NextResponse.json({ err: "Candidate not found" }, { status: 404 });
    }

    const deleted = await db.jobbookmark.deleteMany({
      where: {
        candidateId: candidate.id,
        jobId: jobId,
      },
    });

    return NextResponse.json({ success: true, deletedCount: deleted.count });
  } catch (err: any) {
    console.error("Error deleting bookmark:", err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
