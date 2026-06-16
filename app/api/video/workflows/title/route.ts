import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

const TITLE_SYSTEM_PROMPT = `
Your task is to generate an SEO-focused title for a YouTube video based on its transcript.
Guidelines:
- Be concise but descriptive using relevant keywords.
- Highlight compelling or unique aspects.
- Avoid jargon unless required.
- Use action-oriented/value-driven phrasing.
- Title must be 3–8 words, max 100 chars.
- ONLY return the raw title text.
`;

export async function POST(req: Request) {
  try {
    const { videoId, userId } = await req.json();

    // 1. Video bilgisini çek
    const video = await prisma.video.findFirst({
      where: { id: videoId, userId },
    });

    if (!video) {
      return Response.json({ error: "Video not found" }, { status: 404 });
    }

    // 2. Mux transkriptini al
    const transcriptUrl = `https://stream.mux.com/${video.muxPlaybackId}/text/${video.muxTrackId}.txt`;
    const transcriptResponse = await fetch(transcriptUrl);
    const transcript = await transcriptResponse.text();

    if (!transcript) {
      return Response.json({ error: "Transcript not found" }, { status: 500 });
    }

    // 3. OpenAI API ile başlık oluştur
    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // gpt-4 yerine daha hızlı, yeni nesil model
        messages: [
          { role: "system", content: TITLE_SYSTEM_PROMPT },
          { role: "user", content: transcript },
        ],
        max_tokens: 50,
      }),
    });

    const data = await openAIResponse.json();
    const title = data?.choices?.[0]?.message?.content?.trim();

    if (!title) {
      return Response.json({ error: "Title generation failed" }, { status: 500 });
    }

    // 4. Videoyu güncelle
    await prisma.video.update({
      where: { id: video.id },
      data: { title },
    });

    return Response.json({ status: "success", title });

  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
