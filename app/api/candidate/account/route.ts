import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req) {
  const body = await req.json();

  const { countryId, stateId, cityId, phone_one, phone_two, address, email } =
    body;

  const { user } = await validateRequest();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const candidate = await db.candidate.upsert({
      where: { userId: user.id },
      update: {
        phone_one,
        phone_two,
        address,
        email,
        ...(countryId && { country: { connect: { id: countryId } } }),
        ...(stateId && { state: { connect: { id: stateId } } }),
        ...(cityId && { city: { connect: { id: cityId } } }),
      },
      create: {
        user: { connect: { id: user.id } },
        phone_one,
        phone_two,
        address,
        email,
        ...(countryId && { country: { connect: { id: countryId } } }),
        ...(stateId && { state: { connect: { id: stateId } } }),
        ...(cityId && { city: { connect: { id: cityId } } }),
      },
    });

    return NextResponse.json(candidate);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const candidate = await db.candidate.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        country: true,
        state: true,
        city: true,
        CandidateSkill: true,
        CandidateLanguage: true,
        Experience: true,
        JobEducation: true,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(candidate);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
