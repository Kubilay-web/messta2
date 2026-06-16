import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: Request, context: { params: Params }) {
  const { id } = context.params;

  try {
    // 1. CandidateSkill'leri getir
    const candidateSkills = await db.candidateSkill.findMany({
      where: {
        candidateId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 2. Skill detaylarını manuel olarak getir
    const skillsData = await db.skill.findMany({
      where: {
        id: {
          in: candidateSkills.flatMap((cs) => cs.skillIds),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    // 3. CandidateSkill + ilgili skill detaylarını eşle
    const merged = candidateSkills.map((cs) => ({
      ...cs,
      skills: skillsData.filter((skill) => cs.skillIds.includes(skill.id)),
    }));

    return NextResponse.json(merged);
  } catch (err: any) {
    console.error("Error fetching candidate skills:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
