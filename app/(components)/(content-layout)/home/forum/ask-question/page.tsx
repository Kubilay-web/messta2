import QuestionForm from "@/app/projects/components/stackoverflow/forms/QuestionForm";
import React from "react";

const AskAQuestion = () => {
  return (
    <div>
      <h1 className="h1-bold text-[#1E293B] dark:text-[#F1F5F9]">
        Ask a question
      </h1>
      <div className="mt-9">
        <QuestionForm />
      </div>
    </div>
  );
};

export default AskAQuestion;
