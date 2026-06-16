import React, { useEffect, useState } from "react";
import AnswerForm from "@/app/projects/components/stackoverflow/forms/AnswerForm";
import TagCard from "@/app/projects/components/stackoverflow/cards/TagCard";
import Preview from "@/app/projects/components/stackoverflow/editor/Preview";
import Metric from "@/app/projects/components/stackoverflow/Metric";
import { formatNumbers, getTimeStamp } from "@/app/lib/utils";
import { redirect } from "next/navigation";
import AllAnswers from "@/app/projects/components/stackoverflow/answers/AllAnswers";
import Votes from "@/app/projects/components/stackoverflow/votes/Votes";
import SaveQuestion from "@/app/projects/components/stackoverflow/questions/SaveQuestion";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

interface Question {
  id: string;
  title: string;
  content: string;
  views: number;
  answers: number;
  createdAt: string;
  tags: { id: string; name: string }[];
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
}

interface Answer {
  id: string;
  content: string;
  upvotes: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
}

// Yeni fonksiyon: kullanıcının soruyu kaydedip kaydetmediğini kontrol et
const fetchHasSaved = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/collection/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return data.saved; // Kaydedilmişse true, kaydedilmemişse false döner
  } catch (error) {
    console.error("Error fetching saved status:", error);
    return false;
  }
};

const fetchHasVoted = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/vote/hasvoted?targetId=${id}&targetType=question`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return data.success
      ? data.data
      : { hasUpvoted: false, hasDownvoted: false };
  } catch (error) {
    console.error("Error fetching vote status:", error);
    return { hasUpvoted: false, hasDownvoted: false };
  }
};

const incrementViews = async (id: string) => {
  try {
    const incRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/question/${id}`,
      {
        method: "PATCH",
        cache: "no-store",
      },
    );

    if (!incRes.ok) {
      console.warn("View increment failed");
    }
  } catch (e) {
    console.warn("View increment error:", e);
  }
};

const fetchQuestion = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/question/${id}`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Failed to fetch question");

    return await res.json();
  } catch (error) {
    return null;
  }
};

const fetchAnswers = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/answer/${id}?page=1&pageSize=10&filter=latest`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Failed to fetch answers");

    return await res.json();
  } catch (error) {
    return { answers: [], isNext: false, totalAnswers: 0 }; // Hata durumunda boş dizi döner
  }
};

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  // Verileri sunucudan al
  const [hasVoted, question, answersResult, hasSaved] = await Promise.all([
    fetchHasVoted(id),
    fetchQuestion(id),
    fetchAnswers(id),
    fetchHasSaved(id), // Yeni eklenen: Kaydedilen durumu al
  ]);

  if (!question) {
    // Soru bulunamazsa 404 sayfasına yönlendir
    return redirect("/404");
  }

  const {
    title,
    content,
    createdAt,
    views,
    answers: answersCount,
    tags,
    user,
  } = question;

  // Sayfa görüntülendiğinde view sayısını artır
  await incrementViews(id);

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between">
          {user ? (
            <p className="paragraph-semibold text-dark300_light700">
              By User: {user.username}
            </p>
          ) : (
            <p className="paragraph-semibold text-dark300_light700 text-red-500">
              Author not available
            </p>
          )}

          <div className="flex justify-end gap-4">
            <Votes
              upvotes={question.upvotes}
              downvotes={question.downvotes}
              targetType="question"
              targetId={id}
            />

            <SaveQuestion questionId={question.id} hasSaved={hasSaved} />
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full">
          {title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/stackoverflow/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimeStamp(new Date(createdAt))}`}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/stackoverflow/icons/message.svg"
          alt="message icon"
          value={answersCount}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/stackoverflow/icons/eye.svg"
          alt="View icon"
          value={formatNumbers(views)}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
      </div>

      <Preview content={content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagCard key={tag.id} id={tag.id} name={tag.name} compack />
        ))}
      </div>

      <section className="my-5">
        <AllAnswers
          data={answersResult.answers}
          success={true} // başarı durumu
          error={null} // hata durumu
          totalAnswers={answersResult.totalAnswers}
        />
      </section>

      {/* Cevap formu */}
      <section className="my-5">
        <AnswerForm questionId={question.id} />
      </section>
    </>
  );
};

export default QuestionDetails;
