// app/api/admin/team/[id]/route.ts

import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

// Update Team
export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ err: "Name is required" }, { status: 400 });
    }

    const updatedTeam = await db.team.update({
      where: { id },
      data: {
        name,
        slug: slugify(name, { lower: true }),
      },
    });

    return NextResponse.json(updatedTeam);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// Delete Team
export async function DELETE(
  req: Request,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const deletedTeam = await db.team.delete({
      where: { id },
    });

    return NextResponse.json(deletedTeam);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
