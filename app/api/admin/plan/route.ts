import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(req) {
  try {
    const plans = await db.plan.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(plans);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      leble,
      price,
      joblimit,
      highlightjoblimit,
      featuredjoblimit,
      recommended,
      frontendshow,
      profileverify,
      home,
    } = body;

    // Prisma create
    const plan = await db.plan.create({
      data: {
        leble,
        price: parseFloat(price),
        joblimit: parseInt(joblimit),
        highlightjoblimit: parseInt(highlightjoblimit),
        featuredjoblimit: parseInt(featuredjoblimit),
        recommended: Boolean(recommended),
        frontendshow: Boolean(frontendshow),
        profileverify: Boolean(profileverify),
        home: Boolean(home),
      },
    });

    return NextResponse.json(plan);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
