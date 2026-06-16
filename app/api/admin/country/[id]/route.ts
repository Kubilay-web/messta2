import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json();

  try {
    const updatedCountry = await db.countryJob.update({
      where: { id },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(updatedCountry);
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
    const deletedCountry = await db.countryJob.delete({
      where: { id },
    });

    return NextResponse.json(deletedCountry);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
