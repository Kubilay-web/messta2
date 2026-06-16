import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

export async function POST() {
  try {
    const jobTitles = [
      "Software Engineer",
      "Marketing Manager",
      "Data Analyst",
      "Product Designer",
      "Financial Analyst",
      "HR Specialist",
      "Sales Representative",
      "Graphic Designer",
      "Operations Manager",
      "Content Writer",
      "Software Developer",
      "Research Scientist",
      "UX/UI Designer",
      "Business Analyst",
      "Project Manager",
      "Content Strategist",
      "Quality Assurance Engineer",
      "Customer Success Manager",
      "Digital Marketing Specialist",
      "Operations Analyst",
    ];

    // Tüm kayıtları sil
    await db.jobexperience_id.deleteMany();

    // Yeni kayıtları toplu ekle
    const inserted = await db.jobexperience_id.createMany({
      data: jobTitles.map((name) => ({
        name,
        slug: slugify(name, { lower: true }),
      })),
      skipDuplicates: true, // Aynı slug varsa atlar
    });

    return NextResponse.json({ insertedCount: inserted.count });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
