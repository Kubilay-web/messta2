import QuestionCard from "@/app/projects/components/stackoverflow/cards/QuestionCard";
import DataRenderer from "@/app/projects/components/stackoverflow/DataRenderer";
import HomeFilter from "@/app/projects/components/stackoverflow/filters/HomeFilter";
import LocalSearch from "@/app/projects/components/stackoverflow/search/LocalSearch";
import CommonFilter from "@/app/projects/components/stackoverflow/filters/CommonFilter";
import { HomePageFilters } from "@/app/constants/filter";
import { Button } from "@/app/projects/components/ui/button";
import ROUTES from "@/app/constants/routes";
import Pagination from "@/app/projects/components/stackoverflow/Pagination";
import { EMPTY_QUESTION } from "@/app/constants/states";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

interface Question {
  id: string;
  title: string;
  content: string;
  tags: { id: string; name: string }[];
  user: { id: string; username: string; avatarUrl: string };
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const resolvedSearch = await searchParams;
  const page = Number(resolvedSearch.page) || 1;
  const pageSize = Number(resolvedSearch.pageSize) || 10;
  const query = resolvedSearch.query || "";
  const filter = resolvedSearch.filter || "";

  const queryParams = new URLSearchParams();

  if (query) queryParams.set("query", query);
  if (filter) queryParams.set("filter", filter);
  queryParams.set("page", page.toString());
  queryParams.set("pageSize", pageSize.toString());

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/question?${queryParams.toString()}`,
    { cache: "no-store" },
  );

  const result = await res.json();
  const { success, data, error } = result;
  const { questions, isNext } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient !text-light-900 min-h-[46px] px-4 py-3"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>

      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/forum"
          imgSrc="/assets/stackoverflow/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />

        <CommonFilter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </section>

      <HomeFilter />

      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(questions: Question[]) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        )}
      />

      <Pagination page={page} isNext={isNext} />
    </>
  );
};

export default Home;
