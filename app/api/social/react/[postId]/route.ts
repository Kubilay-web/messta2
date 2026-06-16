import { validateRequest } from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Path param'dan postId al
    // req.nextUrl.pathname örn: "/api/social/react/68c7ca4737d7fd2f185ad67d"
    const segments = req.nextUrl.pathname.split("/");
    const postId = segments[segments.length - 1];

    const { user } = await validateRequest();

    if (!postId) return NextResponse.json({ message: "Missing postId" }, { status: 400 });

    const reactsArray = await db.react.findMany({
      where: { postRefId: postId },
    });

    const grouped = reactsArray.reduce((acc: any, r) => {
      acc[r.react] = acc[r.react] || [];
      acc[r.react].push(r);
      return acc;
    }, {});

    const reacts = ["like", "love", "haha", "sad", "wow", "angry"].map((type) => ({
      react: type,
      count: grouped[type]?.length || 0,
    }));

    const userReact = user
      ? await db.react.findFirst({
          where: { postRefId: postId, reactById: user.id },
        })
      : null;

    return NextResponse.json({
      reacts,
      check: userReact?.react || null,
      total: reactsArray.length,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
