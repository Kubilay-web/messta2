import ROUTES from "@/app/constants/routes";
import { getTimeStamps } from "@/app/lib/utils";
import Link from "next/link";
import React from "react";
import TagCard from "./TagCard";
import Metric from "../Metric";

interface Question {
  id: string;
  title: string;
  content: string;
  tags: Tag[];
  user: User | null;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}

interface Tag {
  id: string;
  name: string;
}

interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

interface Props {
  question: Question;
}

const QuestionCard = ({
  question: { id, title, tags, user, upvotes, answers, views, createdAt },
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamps(createdAt)}
          </span>
          <Link href={ROUTES.QUESTION(id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags?.map((tag: Tag) => (
          <TagCard key={tag.id} id={tag.id} name={tag.name} compack />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        {user && (
          <Metric
            imgUrl={user.avatarUrl}
            alt={user.username}
            value={user.username}
            title={`- asked ${getTimeStamps(createdAt)}`}
            href={ROUTES.PROFILE(user.id)}
            textStyles="body-medium text-dark400_light700"
            isAuthor
          />
        )}

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/stackoverflow/icons/like.svg"
            alt="like"
            value={upvotes}
            title="Upvotes"
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/assets/stackoverflow/icons/message.svg"
            alt="answers"
            value={answers}
            title="Answers"
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/assets/stackoverflow/icons/eye.svg"
            alt="views"
            value={views}
            title="Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
