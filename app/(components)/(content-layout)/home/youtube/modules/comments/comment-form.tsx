"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const commentInsertSchema = z.object({
  value: z.string(),
  videoId: z.string(),
  parentId: z.string().optional(),
});

interface CommentFormProps {
  videoId: string;
  parentId?: string;
  onSuccess?: (comment: any) => void;   // <-- DÜZELTİLDİ
  onCancel?: () => void;
  variant?: "comment" | "reply";
}

export const CommentForm = ({
  videoId,
  parentId,
  onCancel,
  onSuccess,
  variant = "comment",
}: CommentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof commentInsertSchema>>({
    resolver: zodResolver(commentInsertSchema),
    defaultValues: {
      parentId: parentId,
      videoId: videoId,
      value: "",
    },
  });

  const handleSubmit = (values: any) => {
    setIsSubmitting(true);

    const body = {
      ...values,
      parentId: values.parentId || null,
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/studio/videos/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
         console.log("POST RESPONSE:", data); 
        toast.success("Comment added");
        form.reset();
        onSuccess?.(data);   // <-- YENİ EKLENEN COMMENT BURADA GELİYOR
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-4 group"
      >
        <div className="flex-1">
          <FormField
            name="value"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={
                      variant === "reply"
                        ? "Reply to this comment..."
                        : "Add a comment..."
                    }
                    className="resize-none bg-transparent overflow-hidden min-h-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="justify-end gap-2 mt-2 flex">
            {onCancel && (
              <Button variant="ghost" type="button" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button disabled={isSubmitting} type="submit" size="sm" className="bg-slate-500 text-white">
              {variant === "reply" ? "Reply" : "Comment"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
