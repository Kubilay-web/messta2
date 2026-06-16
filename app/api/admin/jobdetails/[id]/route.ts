// import { NextResponse } from "next/server";
// import db from "@/app/lib/db";


// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } },
// ) {
//   try {
//     const jobId = params.id;

//     // İş ilanını getir
//     const job = await db.jobs.findUnique({
//       where: { id: jobId },
//     });

//     if (!job) {
//       return NextResponse.json({ error: "No jobs found" }, { status: 404 });
//     }

//     // İlgili diğer verileri getir
//     const jobTag = await db.jobtag.findFirst({
//       where: { jobId: job.id },
//     });

//     const benefits = await db.benfits.findFirst({
//       where: { companyId: job.companyId },
//     });

//     const jobSkills = await db.jobskill.findFirst({
//       where: { jobId: job.id },
//     });

//     return NextResponse.json({
//       job,
//       jobTag,
//       benefits,
//       jobSkills,
//     });
//   } catch (error) {
//     console.error("Hata:", error);
//     return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
//   }
// }









import { NextResponse } from "next/server";
import db from "@/app/lib/db";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } },
) {
  try {
    // ✅ params'ı await ile al (Next.js 15 için)
    const { id: jobId } = await params;

    console.log("Fetching job details for id:", jobId);

    // İş ilanını getir
    const job = await db.jobs.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: "No jobs found" }, { status: 404 });
    }

    // İlgili diğer verileri getir
    const jobTag = await db.jobtag.findFirst({
      where: { jobId: job.id },
    });

    const benefits = await db.benfits.findFirst({
      where: { companyId: job.companyId },
    });

    const jobSkills = await db.jobskill.findFirst({
      where: { jobId: job.id },
    });

    return NextResponse.json({
      job,
      jobTag,
      benefits,
      jobSkills,
    });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}