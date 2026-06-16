import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json();

  try {
    const updatedState = await db.state.update({
      where: { id },
      data: {
        statename: body.statename,
        countryId: body.countryId,
      },
    });

    return NextResponse.json(updatedState);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const deletedState = await db.state.delete({
      where: { id },
    });

    return NextResponse.json(deletedState);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
