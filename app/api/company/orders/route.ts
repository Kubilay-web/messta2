import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function GET() {
  try {
    // Fetch the session
    const { user } = await validateRequest();

    if (!user?.id) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    // Find the company associated with the logged-in user
    const company = await db.company.findUnique({
      where: { userId: user.id },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Fetch orders associated with the company
    const orders = await db.orderJob.findMany({
      where: { company_id: company.id },
    });

    console.log("Orders: ", orders);

    return NextResponse.json(orders);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
