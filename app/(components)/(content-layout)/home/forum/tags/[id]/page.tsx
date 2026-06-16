import QuestionCard from "@/app/projects/components/stackoverflow/cards/QuestionCard";
import DataRenderer from "@/app/projects/components/stackoverflow/DataRenderer";
import LocalSearch from "@/app/projects/components/stackoverflow/search/LocalSearch";
import ROUTES from "@/app/constants/routes";
import { EMPTY_QUESTION } from "@/app/constants/states";
import React from "react";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    query?: string;
  }>;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface Question {
  _id: string;
  title: string;
  // diğer alanlar isteğe bağlı
}

interface Tag {
  id: string;
  name: string;
  // diğer alanlar isteğe bağlı
}

interface Data {
  tag: Tag;
  questions: Question[];
  isNext: boolean;
}

const page = async ({ params, searchParams }: RouteParams) => {
  const { id: tagId } = await params;
  const resolvedSearch = await searchParams;
  const pageNum = Number(resolvedSearch.page) || 1;
  const pageSizeNum = Number(resolvedSearch.pageSize) || 10;
  const query = resolvedSearch.query || "";

  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/tagquestions/${tagId}`,
    );
    url.searchParams.set("page", String(pageNum));
    url.searchParams.set("pageSize", String(pageSizeNum));
    if (query) {
      url.searchParams.set("query", query);
    }

    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json: ApiResponse<Data> = await res.json();

    if (!json.success || !json.data) {
      throw new Error(json.error || "Failed to load data");
    }

    const { tag, questions } = json.data;

    return (
      <>
        <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="h1-bold text-dark100_light900">{tag?.name}</h1>
        </section>

        <section className="mt-11">
          <LocalSearch
            route={ROUTES.TAG(tagId)}
            imgSrc="/assets/stackoverflow/icons/search.svg"
            placeholder="Search questions..."
            otherClasses="flex-1"
          />
        </section>

        <DataRenderer
          success={true}
          error={null}
          data={questions}
          empty={EMPTY_QUESTION}
          render={(questions) => (
            <div className="mt-10 flex w-full flex-col gap-6">
              {questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          )}
        />
      </>
    );
  } catch (error: any) {
    return (
      <DataRenderer
        success={false}
        error={error.message || "Unknown error"}
        data={null}
        empty={EMPTY_QUESTION}
        render={() => null}
      />
    );
  }
};

export default page;
