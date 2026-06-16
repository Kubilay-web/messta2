import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { user } = await validateRequest();

  const {
    gender,
    maritalStatus,
    status,
    bio,
    selectedLanguages,
    selectedProfessions,
    selectedSkill,
  } = body;

  try {
    // 1. Candidate güncelle veya oluştur
    const updatedCandidate = await db.candidate.upsert({
      where: {
        userId: user.id || "",
      },
      update: {
        gender,
        marital_status: maritalStatus,
        status,
        bio,
        professionIds: selectedProfessions,
        skill_id: selectedSkill, // string[] olarak gönderiliyor varsayımıyla
      },
      create: {
        gender,
        marital_status: maritalStatus,
        status,
        bio,
        professionIds: selectedProfessions,
        skill_id: selectedSkill,
        user: {
          connect: {
            id: user.id || "",
          },
        },
      },
    });

    // 2. CandidateSkill var mı kontrol et
    const existingCandidateSkill = await db.candidateSkill.findFirst({
      where: { candidateId: updatedCandidate.id },
    });

    const updatedSkill = await db.candidateSkill
      .upsert({
        where: {
          id: existingCandidateSkill ? existingCandidateSkill.id : "", // boş string hata verir, alternatif olarak create yapacağız
        },
        update: {
          skillIds: selectedSkill,
        },
        create: {
          candidateId: updatedCandidate.id,
          skillIds: selectedSkill,
        },
      })
      .catch(async (err) => {
        // Eğer id boş olduğu için hata alınırsa, create yap
        if (existingCandidateSkill === null) {
          return await db.candidateSkill.create({
            data: {
              candidateId: updatedCandidate.id,
              skillIds: selectedSkill,
            },
          });
        }
        throw err;
      });

    // 3. CandidateLanguage var mı kontrol et
    const existingCandidateLanguage = await db.candidateLanguage.findFirst({
      where: { candidateId: updatedCandidate.id },
    });

    const updatedLanguage = await db.candidateLanguage
      .upsert({
        where: {
          id: existingCandidateLanguage ? existingCandidateLanguage.id : "",
        },
        update: {
          langIds: selectedLanguages,
        },
        create: {
          candidateId: updatedCandidate.id,
          langIds: selectedLanguages,
        },
      })
      .catch(async (err) => {
        if (existingCandidateLanguage === null) {
          return await db.candidateLanguage.create({
            data: {
              candidateId: updatedCandidate.id,
              langIds: selectedLanguages,
            },
          });
        }
        throw err;
      });

    return NextResponse.json({
      updatedUser: updatedCandidate,
      updatedSkill,
      updatedLanguage,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { user } = await validateRequest();

  try {
    // 1. Candidate'ı userId'ye göre bul
    const candidate = await db.candidate.findUnique({
      where: {
        userId: user?.id,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    // 2. CandidateLanguage kayıtlarını getir
    const language = await db.candidateLanguage.findMany({
      where: {
        candidateId: candidate.id,
      },
    });

    // 3. CandidateSkill kayıtlarını getir
    const skill = await db.candidateSkill.findMany({
      where: {
        candidateId: candidate.id,
      },
    });

    return NextResponse.json({ candidate, language, skill });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
