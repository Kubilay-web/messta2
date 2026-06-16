import React, { Suspense } from "react";
import UserAvatar from "../UserAvatar";
import { getTimeStamp, getTimeStamps } from "@/app/lib/utils";
import Link from "next/link";
import ROUTES from "@/app/constants/routes";
import Preview from "../editor/Preview";
import Votes from "../votes/Votes";

const AnswerCard = ({
  id,
  user,
  content,
  createdAt,
  upvotes,
  downvotes,
}: Answer & { upvotes: number; downvotes: number }) => {
  return (
    <article className="light-border border-b py-10">
      <span id={JSON.stringify(id)} className="hash-span" />

      <div className="mb-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex flex-1 items-start gap-1 sm:items-center">
          <UserAvatar
            id={user.id}
            name={user.username}
            imageUrl={user.avatarUrl}
            className="size-5 rounded-full object-cover max-sm:mt-2"
          />
          <Link
            href={ROUTES.PROFILE(user.id)}
            className="flex flex-col max-sm:ml-1 sm:flex-row sm:items-center"
          >
            <p className="body-semibold text-dark300_light700">
              {user.username ?? "Unknone"}{" "}
            </p>

            <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
              <span className="max-sm:hidden"> - </span>
              answered {getTimeStamps(createdAt)}
            </p>
          </Link>
        </div>

        <div className="flex justify-end">
          <Suspense>
            <Votes
              targetType="answer"
              upvotes={upvotes}
              downvotes={downvotes}
              targetId={id}
            />
          </Suspense>
        </div>
      </div>

      <Preview content={content} />

      {/* {showReadMore && (
        <Link
          href={`/forum/questions/${question}#answer-${id}`}
          className="body-semibold text-primary-500 relative z-10 font-space-grotesk"
        >
          <p className="mt-1">Read more</p>
        </Link>
      )} */}
    </article>
  );
};

export default AnswerCard;
