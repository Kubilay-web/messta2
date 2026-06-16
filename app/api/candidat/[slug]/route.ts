import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(req, context) {
  try {
    const { slug } = context.params;

    const candidate = await db.candidate.findFirst({
      where: { slug },
      include: {
        country: { select: { name: true } },
        city: { select: { name: true } },
        state: { select: { statename: true } },
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    const professions = await db.profession.findMany({
      where: { id: { in: candidate.professionIds } },
      select: { name: true },
    });

    // CandidateSkill
    const candidateSkills = await db.candidateSkill.findMany({
      where: { candidateId: candidate.id },
      select: { skillIds: true },
    });

    const skillIds = candidateSkills.flatMap((cs) => cs.skillIds);
    const skills = await db.skill.findMany({
      where: { id: { in: skillIds } },
      select: { name: true },
    });

    // CandidateLanguage
    const candidateLanguages = await db.candidateLanguage.findMany({
      where: { candidateId: candidate.id },
      select: { langIds: true },
    });

    const langIds = candidateLanguages.flatMap((cl) => cl.langIds);
    const languages = await db.language.findMany({
      where: { id: { in: langIds } },
      select: { name: true },
    });

    // Deneyimler
    const experiences = await db.experience.findMany({
      where: { candidate_id: candidate.id },
    });

    // Eğitimler
    const education = await db.jobEducation.findMany({
      where: { candidate_id: candidate.id },
    });

    return NextResponse.json({
      candidate,
      professions,
      skills: skills.map((s) => s.name),
      languages: languages.map((l) => l.name),
      experiences,
      education,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
