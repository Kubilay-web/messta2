import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/app/auth';
import db from "@/app/lib/db";

// GET: Ürün sorularını getir (sadece okuma)
export async function GET(
  request: NextRequest,
  { params }: { params: { productSlug: string } }
) {
  try {
    const product = await db.product.findUnique({
      where: { slug: params.productSlug },
      include: {
        questions: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
    }

    // Question modelinde user bilgisi yok, sadece admin tarafından eklenen Q&A
    const formattedQuestions = product.questions.map(q => ({
      ...q,
      // Frontend'in beklediği format için dummy user
      user: {
        id: "admin",
        displayName: "Satıcı",
        avatarUrl: null
      },
      upvotes: 0,
      downvotes: 0,
      userVote: null
    }));

    return NextResponse.json({ questions: formattedQuestions });

  } catch (error) {
    console.error('Soru getirme hatası:', error);
    return NextResponse.json({ error: 'Sorular getirilemedi' }, { status: 500 });
  }
}

