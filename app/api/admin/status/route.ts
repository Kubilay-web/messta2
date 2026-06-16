import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { value, jobId } = body;

    // Status değerini belirle
    const status = value ? "active" : "pending";

    // İş ilanını güncelle
    const updatedJob = await db.jobs.update({
      where: {
        id: jobId,
      },
      data: {
        status,
      },
    });

    if (!updatedJob) {
      return NextResponse.json(
        { err: "Job not found or not updated" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedJob);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        err: err.message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      },
      { status: 500 },
    );
  }
}
