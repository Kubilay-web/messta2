import { notFound } from "next/navigation";
import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { Button } from "@/app/projects/components/ui/button";
import Stats from "@/app/projects/components/stackoverflow/user/Stats";
import UserAvatar from "@/app/projects/components/stackoverflow/UserAvatar";
import ProfileLink from "@/app/projects/components/stackoverflow/user/ProfileLink";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/projects/components/ui/tabform";
import Pagination from "@/app/projects/components/stackoverflow/Pagination";
import QuestionCard from "@/app/projects/components/stackoverflow/cards/QuestionCard";
import AnswerCard from "@/app/projects/components/stackoverflow/cards/AnswerCard";
import DataRenderer from "@/app/projects/components/stackoverflow/DataRenderer";
import { EMPTY_ANSWERS } from "@/app/constants/states";
import "../../../style.css"

const getUserQuestions = async (
  userId: string,
  page: number,
  pageSize: number,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/user/questions/${userId}?page=${page}&pageSize=${pageSize}`,
    { cache: "no-store" },
  );
  return res.json();
};

const getUserAnswers = async (
  userId: string,
  page: number,
  pageSize: number,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/answer/user/${userId}?page=${page}&pageSize=${pageSize}`,
    { cache: "no-store" },
  );
  return res.json();
};

type RouteParams = { params: Promise<{ id: string }> };

const Profile = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) notFound();

  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/user/${id}`,
    { cache: "no-store" },
  );
  const userJson = await userRes.json();
  if (!userJson.success) throw new Error(userJson.message);

  const { user, totalQuestions } = userJson.data;

  const pageQuestions = 1;
  const pageSizeQuestions = 10;
  const qJson = await getUserQuestions(id, pageQuestions, pageSizeQuestions);
  if (!qJson.success) throw new Error(qJson.message);
  const questions = qJson.data.questions;
  const hasMoreQuestions = qJson.data.isNext;

  const pageAnswers = 1;
  const pageSizeAnswers = 10;
  const aJson = await getUserAnswers(id, pageAnswers, pageSizeAnswers);

  const userAnswersSuccess = aJson.success;
  const userAnswersError = aJson.success ? null : aJson.message;
  const answers = aJson.success ? aJson.data.answers : [];
  const hasMoreAnswers = aJson.success ? aJson.data.isNext : false;

  /* --- Kullanıcı alanları --- */
  const {
    id: userId,
    displayName,
    avatarUrl,
    username,
    bio,
    portfolio,
    location,
    createdAt,
  } = user;

  return (
    <>
      {/* -------- Profil üst bölümü -------- */}
      <section className="flex flex-col-reverse general-forum-container items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <UserAvatar
            id={userId}
            username={username || "Unknown User"}
            avatarUrl={avatarUrl || "/path/to/placeholder.png"}
            className="size-[140px] rounded-full object-cover"
            fallbackClassName="text-6xl font-bold"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-[#1E293B] dark:text-[#F1F5F9]">
              {displayName}
            </h2>
            <p className="paragraph-regular text-[#334155] dark:text-[#CBD5E1]">
              @{username || "unknown"}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {portfolio && (
                <ProfileLink
                  imgUrl="/icons/link.svg"
                  href={portfolio}
                  title="Portfolio"
                />
              )}
              {location && (
                <ProfileLink
                  imgUrl="/assets/stackoverflow/icons/location.svg"
                  title="Location"
                />
              )}
              <ProfileLink
                imgUrl="/assets/stackoverflow/icons/calendar.svg"
                title={dayjs(createdAt).format("MMMM YYYY")}
              />
            </div>

            {bio && (
              <p className="paragraph-regular text-[#475569] dark:text-[#94A3B8] mt-3">
                {bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <Link href={`/home/forum/profile/edit`}>
            <Button className="paragraph-medium btn-secondary text-[#1E293B] dark:text-[#F8FAFC] min-h-12 min-w-44 px-4 py-3">
              Edit Profile
            </Button>
          </Link>
        </div>
      </section>

      <Stats
        totalQuestions={totalQuestions}
        totalAnswers={
          aJson.success ? aJson.data.totalAnswers ?? answers.length : 0
        }
        badges={{ GOLD: 0, SILVER: 0, BRONZE: 0 }}
      />

      <section className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="w-[400px]">
          <TabsList className="bckground-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="top-posts"
            className="mt-5 flex w-full flex-col gap-6"
          >
            {questions.length === 0 ? (
              <p>No questions found.</p>
            ) : (
              questions.map((q: any) => (
                <QuestionCard key={q.id} question={q} />
              ))
            )}
            <Pagination page={pageQuestions} isNext={hasMoreQuestions} />
          </TabsContent>

          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <DataRenderer
              success={userAnswersSuccess}
              error={userAnswersError}
              data={answers}
              empty={EMPTY_ANSWERS}
              render={(answers) => (
                <div className="flex w-full flex-col gap-6">
                  {answers.map((answer: any) => (
                    <AnswerCard
                      key={answer.id}
                      {...answer}
                      upvotes={answer.upvotes}
                      downvotes={answer.downvotes}
                      question={answer.question}
                      content={answer.content.slice(0, 100)}
                      containerClasses="card-wrapper rounded-[10px] px-7 py-9 sm:px-11"
                      showReadMore
                    />
                  ))}
                </div>
              )}
            />
            <Pagination page={pageAnswers} isNext={hasMoreAnswers} />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default Profile;
