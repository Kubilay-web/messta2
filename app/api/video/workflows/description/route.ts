
import fetch from "node-fetch";
import db from "@/app/lib/db"

const DESCRIPTION_SYSTEM_PROMPT = `
Your task is to summarize the transcript of a video. Please follow these guidelines:
- Be brief. Condense the content into a summary that captures the key points.
- Avoid jargon or overly complex language.
- Focus on the most critical information.
- ONLY return the summary, no other text.
- Summary should be 3–5 sentences and no more than 200 characters.
`;


export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    console.log("REQUEST BODY =>", body);

    if (!body) {
      return Response.json({ error: "Missing body" }, { status: 400 });
    }

    const { videoId, userId } = body;

    if (!videoId || !userId) {
      return Response.json({ error: "Missing videoId or userId" }, { status: 400 });
    }

    const video = await db.video.findFirst({
      where: { id: videoId, userId },
    });

    if (!video) {
      return Response.json({ error: "Video not found" }, { status: 404 });
    }

    const trackUrl = `https://stream.mux.com/${video.muxPlaybackId}/text/${video.muxTrackId}.txt`;

    const transcriptResponse = await fetch(trackUrl);

    if (!transcriptResponse.ok) {
      console.error("TRANSCRIPT FETCH ERROR:", transcriptResponse.status, await transcriptResponse.text());
      return Response.json({ error: "Transcript fetch failed" }, { status: 500 });
    }

    const transcript = await transcriptResponse.text();

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: DESCRIPTION_SYSTEM_PROMPT },
          { role: "user", content: transcript },
        ],
        max_tokens: 200,
      }),
    });

    if (!openaiResponse.ok) {
      console.error("OPENAI ERROR:", openaiResponse.status, await openaiResponse.text());
      return Response.json({ error: "OpenAI error" }, { status: 500 });
    }

    const aiBody = await openaiResponse.json();
    const description = aiBody?.choices?.[0]?.message?.content;

    if (!description) {
      return Response.json({ error: "Empty description" }, { status: 500 });
    }

    await db.video.update({
      where: { id: video.id },
      data: { description },
    });

    return Response.json({ status: "success", description });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

