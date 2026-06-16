import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { type, prompt } = body;

    let workflowUrl;
    
    switch (type) {
      case "description":
        workflowUrl = `${process.env.UPSTASH_WORKFLOW_URL}/api/videos/workflows/description`;
        break;
      case "title":
        workflowUrl = `${process.env.UPSTASH_WORKFLOW_URL}/api/videos/workflows/title`;
        break;
      case "thumbnail":
        if (!prompt) {
          return NextResponse.json(
            { error: "Prompt is required for thumbnail generation" },
            { status: 400 }
          );
        }
        workflowUrl = `${process.env.UPSTASH_WORKFLOW_URL}/api/videos/workflows/thumbnail`;
        break;
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const workflowResponse = await fetch(workflowUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        videoId: params.id,
        ...(prompt && { prompt }),
      }),
    });

    const { workflowRunId } = await workflowResponse.json();

    return NextResponse.json({ workflowRunId });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}