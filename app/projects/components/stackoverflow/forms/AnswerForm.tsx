"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnswerSchema } from "@/app/lib/validation";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("../editor/index"), { ssr: false });

interface AnswerFormProps {
  questionId: string;
}

const AnswerForm = ({ questionId }: AnswerFormProps) => {
  console.log("Form'a gelen questionId:", questionId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef<MDXEditorMethods>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);

    console.log("Form Values:", values);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/answer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: values.content,
            questionId,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok || data?.error) {
        throw new Error(data?.error || "Something went wrong");
      }

      if (res.ok) {
        toast.success("Answer submitted succesfully");
        form.reset();
        router.refresh(); // sayfayı yenile
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Answer not submitted.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h3 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h3>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Editor
                    value={field.value}
                    editorRef={editorRef}
                    fieldChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <ReloadIcon className="mr-2 size-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Answer"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
