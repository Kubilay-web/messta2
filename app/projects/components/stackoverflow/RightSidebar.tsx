// RightSidebar.tsx

import ROUTES from "@/app/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TagCard from "./cards/TagCard";
import DataRenderer from "./DataRenderer";

interface Tag {
  id: string;
  name: string;
  questions: number;
}

const RightSidebar = async () => {
  let hotQuestions: any[] = [];
  let success = false;
  let error = null;

  try {
    // API'den veri çekme işlemi
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/question/topquestion`,
    );
    const result = await response.json();

    if (result.success) {
      hotQuestions = result.data;
      success = true;
    } else {
      error = result.message || "Failed to fetch questions";
      success = false;
    }
  } catch (err: any) {
    error = err.message || "Internal server error";
    success = false;
  }

  // Fetch popular tags
  const fetchTopTags = async (): Promise<Tag[]> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/tags/popular`,
      );
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (err) {
      console.error("Failed to fetch tags", err);
      return [];
    }
  };

  const topTags = await fetchTopTags();

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border border-1 sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light_900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          <DataRenderer
            data={hotQuestions}
            empty={{
              title: "No Question Found",
              message: "No question has been asked yet",
            }}
            success={success}
            error={error}
            render={(hotQuestions) => (
              <div className="mt-7 flex w-full flex-col gap-[30px]">
                {hotQuestions.map(({ id, title }) => (
                  <Link
                    key={id}
                    href={ROUTES.QUESTION(id)}
                    className="flex cursor-pointer items-center justify-between gap-7"
                  >
                    <p className="body-medium text-dark500_light700">{title}</p>
                    <Image
                      src="/assets/stackoverflow/icons/chevron-right.svg"
                      alt="Chevron"
                      width={20}
                      height={20}
                      className="invert-colors"
                    />
                  </Link>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {topTags.map(({ id, name, questions }) => (
            <TagCard
              key={id}
              id={id}
              name={name}
              questions={questions}
              showCount
              compack
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
