import db from "@/app/lib/db";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const userId = pathParts[pathParts.length - 1];

    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, message: "User ID is required" }),
        { status: 400 },
      );
    }

    const page = Number(url.searchParams.get("page") || 1);
    const pageSize = Number(url.searchParams.get("pageSize") || 10);
    const skip = (page - 1) * pageSize;

    const totalAnswers = await db.answerForum.count({
      where: { UserId: userId },
    });

    const answers = await db.answerForum.findMany({
      where: { UserId: userId },
      skip,
      take: pageSize,
      select: {
        id: true,
        content: true,
        upvotes: true,
        downvotes: true,
        createdAt: true,

        user: {
          select: { id: true, username: true, avatarUrl: true },
        },
        question: {
          select: {
            id: true,
            title: true,
            content: true,
            tagQuestions: {
              select: {
                tag: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    const isNext = totalAnswers > skip + answers.length;

    return new Response(
      JSON.stringify({ success: true, data: { answers, isNext } }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while fetching the answers.",
      }),
      { status: 500 },
    );
  }
}
