// app/api/admin/plan/[id]/route.ts
import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await req.json();

    // Prisma update
    const updatedPlan = await db.plan.update({
      where: { id },
      data: {
        leble: body.leble,
        price: Number(body.price),
        joblimit: Number(body.joblimit),
        featuredjoblimit: Number(body.featuredjoblimit),
        highlightjoblimit: Number(body.highlightjoblimit),
        recommended: Boolean(body.recommended),
        frontendshow: Boolean(body.frontendshow),
        profileverify: Boolean(body.profileverify),
        home: Boolean(body.home),
      },
    });

    return NextResponse.json(updatedPlan);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;

    const deletedPlan = await db.plan.delete({
      where: { id },
    });

    return NextResponse.json(deletedPlan);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
