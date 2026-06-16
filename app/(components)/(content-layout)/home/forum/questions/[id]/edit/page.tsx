import { validateRequest } from "@/app/auth";
import QuestionForm from "@/app/projects/components/stackoverflow/forms/QuestionForm";
import ROUTES from "@/app/constants/routes";
import { notFound, redirect } from "next/navigation";
import React from "react";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

const EditQuestion = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) return notFound();

  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  let question;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/question/${id}`,
    );
    if (response.ok) {
      const result = await response.json();
      question = result;
    }
  } catch (error) {
    console.error("Error fetching question:", error);
    return notFound();
  }

  if (!question) return notFound();

  if (question.UserId !== user.id) {
    redirect(ROUTES.QUESTION(id));
  }

  return (
    <main>
      <QuestionForm question={question} isEdit />
    </main>
  );
};

export default EditQuestion;
