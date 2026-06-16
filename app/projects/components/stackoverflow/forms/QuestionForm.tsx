// "use client";

// import React, { useRef, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { ReloadIcon } from "@radix-ui/react-icons";
// import { Button } from "../ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Input } from "../ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { AskQuestionSchema } from "@/app/lib/validation";
// import dynamic from "next/dynamic";
// import { MDXEditorMethods } from "@mdxeditor/editor";
// import { z } from "zod";
// import TagCard from "../cards/TagCard";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import ROUTES from "@/app/constants/routes";

// const Editor = dynamic(
//   () => import("../../../components/stackoverflow/editor/index"),
//   {
//     ssr: false,
//   },
// );

// interface Params {
//   question?: Question;
//   isEdit?: boolean;
// }

// const QuestionForm = ({ question, isEdit = false }: Params) => {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const editorRef = useRef<MDXEditorMethods>(null);

//   const form = useForm<z.infer<typeof AskQuestionSchema>>({
//     resolver: zodResolver(AskQuestionSchema),
//     defaultValues: {
//       title: question?.title || "",
//       content: question?.content || "",
//       tags: question?.tags?.map((tag) => tag.name) || [],
//     },
//   });

//   const handleInputKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     field: { value: string[] },
//   ) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const tagInput = e.currentTarget.value.trim();

//       if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
//         form.setValue("tags", [...field.value, tagInput]);
//         e.currentTarget.value = "";
//         form.clearErrors("tags");
//       } else if (tagInput.length > 15) {
//         form.setError("tags", {
//           type: "manual",
//           message: "Tag should be less than 15 characters",
//         });
//       } else if (field.value.includes(tagInput)) {
//         form.setError("tags", {
//           type: "manual",
//           message: "Tag already exists",
//         });
//       }
//     }
//   };

//   const handleTagRemove = (tag: string, field: { value: string[] }) => {
//     const newTags = field.value.filter((t) => t !== tag);
//     form.setValue("tags", newTags);

//     if (newTags.length === 0) {
//       form.setError("tags", {
//         type: "manual",
//         message: "Tags are required",
//       });
//     }
//   };

//   const handleCreateOrUpdateQuestion = async (
//     data: z.infer<typeof AskQuestionSchema>,
//   ) => {
//     startTransition(async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/question`,
//           {
//             method: isEdit ? "PUT" : "POST", // PUT if edit, POST if new question
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               id: question?.id,
//               title: data.title,
//               content: data.content,
//               tagNames: data.tags,
//               UserId: question?.UserId || "",
//             }),
//           },
//         );

//         const result = await response.json();
//         console.log("result--->", result);

//         if (response.ok) {
//           toast.success(
//             isEdit
//               ? "Question updated successfully!"
//               : "Question created successfully!",
//           );

//           if (result.id) {
//             router.push(ROUTES.QUESTION(result.id));
//           }
//         } else {
//           toast.error(result.error?.message || "Something went wrong");
//         }
//       } catch (error) {
//         console.error("Error creating/updating question:", error);
//         toast.error("Something went wrong while processing your request.");
//       }
//     });
//   };

//   return (
//     <Form {...form}>
//       <form
//         className="flex w-full flex-col gap-10"
//         onSubmit={form.handleSubmit(handleCreateOrUpdateQuestion)}
//       >
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem className="flex w-full flex-col">
//               <FormLabel className="paragraph-semibold text-dark400_light800">
//                 Question Title <span className="text-primary-500">*</span>
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription className="body-regular text-light-500 mt-2.5">
//                 Be specific and imagine you are asking a question to another
//                 person.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="content"
//           render={({ field }) => (
//             <FormItem className="flex w-full flex-col">
//               <FormLabel className="paragraph-semibold text-dark400_light800">
//                 Detailed explanation of your problem{" "}
//                 <span className="text-primary-500">*</span>
//               </FormLabel>
//               <FormControl>
//                 <Editor
//                   value={field.value}
//                   editorRef={editorRef}
//                   fieldChange={field.onChange}
//                 />
//               </FormControl>
//               <FormDescription className="body-regular text-light-500 mt-2.5">
//                 Introduce the problem and expand on what you ve put in the
//                 title.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="tags"
//           render={({ field }) => (
//             <FormItem className="flex w-full flex-col gap-3">
//               <FormLabel className="paragraph-semibold text-dark400_light800">
//                 Tags <span className="text-primary-500">*</span>
//               </FormLabel>
//               <FormControl>
//                 <div>
//                   <Input
//                     className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
//                     placeholder="Add tags..."
//                     onKeyDown={(e) => handleInputKeyDown(e, field)}
//                   />

//                   {field.value.length > 0 && (
//                     <div className="flex-start mt-2.5 flex-wrap gap-3">
//                       {field?.value?.map((tag: string) => (
//                         <TagCard
//                           key={tag}
//                           id={tag}
//                           name={tag}
//                           compack
//                           remove
//                           isButton
//                           handleRemove={() => handleTagRemove(tag, field)}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </FormControl>
//               <FormDescription className="body-regular text-light-500 mt-2.5">
//                 Add up to 3 tags to describe what your question is about. You
//                 need to press enter to add a tag.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="mt-16 flex justify-end">
//           <Button
//             type="submit"
//             disabled={isPending}
//             className="primary-gradient !text-light-900 w-fit"
//           >
//             {isPending ? (
//               <>
//                 <ReloadIcon className="mr-2 size-4 animate-spin" />
//                 <span>Submitting</span>
//               </>
//             ) : (
//               <> {isEdit ? "Edit Question" : "Ask A Question"} </> // Change button text based on edit mode
//             )}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default QuestionForm;














"use client";

import React, { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AskQuestionSchema } from "@/app/lib/validation";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { z } from "zod";
import TagCard from "../cards/TagCard";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ROUTES from "@/app/constants/routes";

const Editor = dynamic(
  () => import("../../../components/stackoverflow/editor/index"),
  { ssr: false }
);

interface Params {
  question?: Question;
  isEdit?: boolean;
}

const QuestionForm = ({ question, isEdit = false }: Params) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags?.map((tag) => tag.name) || [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const tagInput = e.currentTarget.value.trim();

      if (
        tagInput &&
        tagInput.length < 15 &&
        !field.value.includes(tagInput)
      ) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Tags are required",
      });
    }
  };

  const handleCreateOrUpdateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>
  ) => {
    startTransition(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/question`,
          {
            method: isEdit ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: question?.id,
              title: data.title,
              content: data.content,
              tagNames: data.tags,
              UserId: question?.UserId || "",
            }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          toast.success(
            isEdit
              ? "Question updated successfully!"
              : "Question created successfully!"
          );

          if (result.id) {
            router.push(ROUTES.QUESTION(result.id));
          }
        } else {
          toast.error(result.error?.message || "Something went wrong");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while processing your request.");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-full min-w-0 flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateOrUpdateQuestion)}
      >
        {/* TITLE */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full min-w-0 flex-col">
              <FormLabel>
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  className="w-full min-w-0 max-w-full"
                />
              </FormControl>

              <FormDescription>
                Be specific and clear.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* CONTENT */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full min-w-0 flex-col">
              <FormLabel>
                Detailed Explanation <span className="text-primary-500">*</span>
              </FormLabel>

              <FormControl>
                <div className="w-full min-w-0">
                  <Editor
                    value={field.value}
                    editorRef={editorRef}
                    fieldChange={field.onChange}
                  />
                </div>
              </FormControl>

              <FormDescription>
                Describe your problem in detail.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* TAGS */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full min-w-0 flex-col gap-3">
              <FormLabel>
                Tags <span className="text-primary-500">*</span>
              </FormLabel>

              <FormControl>
                <div className="w-full min-w-0">
                  <Input
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    className="w-full min-w-0 max-w-full"
                  />

                  {field.value.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-2 w-full min-w-0">
                      {field.value.map((tag: string) => (
                        <TagCard
                          key={tag}
                          id={tag}
                          name={tag}
                          compack
                          remove
                          isButton
                          handleRemove={() =>
                            handleTagRemove(tag, field)
                          }
                          className="max-w-full break-words"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>

              <FormDescription>
                Press Enter to add tags (max 3 recommended).
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUBMIT */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="primary-gradient !text-light-900 w-fit"
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                Submitting
              </>
            ) : isEdit ? (
              "Edit Question"
            ) : (
              "Ask A Question"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;