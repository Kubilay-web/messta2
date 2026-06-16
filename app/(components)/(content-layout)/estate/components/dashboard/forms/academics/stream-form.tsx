"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Check, FolderPlus, Pen, Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { Button } from "../../../../components/ui/button";
import TextInput from "../../../../components/FormInputs/TextInput";
import SubmitButton from "../../../../components/FormInputs/SubmitButton";
import { StreamCreateProps } from "../../../../types/types";
import { createStream, updateStream } from "../../../../actions/classes";
import useSchoolStore from "../../../../store/school";
import { useRouter } from "next/navigation";

export type ClassProps = {
  name: string;
};

export default function StreamForm({
  classId,
  initialContent,
  editingId,
}: {
  classId: string;
  initialContent?: string;
  editingId?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StreamCreateProps>({
    defaultValues: {
      title: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { school } = useSchoolStore();
  const router = useRouter();

  async function saveStream(data: StreamCreateProps) {
    data.classId = classId;
    data.schoolId = school?.id ?? "";
    try {
      setLoading(true);
      if (editingId) {
        await updateStream(editingId, data.title);
        toast.success("Stream updated!");
      } else {
        await createStream(data);
        toast.success("Stream created!");
      }
      reset();
      setLoading(false);
      router.refresh();
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <div className="text-black">
      <div className="py-1">
        <Dialog>
          <DialogTrigger asChild>
            {editingId ? (
              <button title="Edit Folder" className="text-blue-600">
                <Pencil className="w-4 h-4" />
              </button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="h-8 bg-white text-black border-gray-200 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Stream
              </Button>
            )}
          </DialogTrigger>

          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle className="text-black">
                {editingId ? "Edit Stream" : "Add New Stream"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(saveStream)}>
              <div className="space-y-3">
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label=""
                    name="title"
                    placeholder="Add Stream"
                  />
                </div>
              </div>

              <div className="py-3">
                <SubmitButton
                  title={editingId ? "Update" : "Add"}
                  loading={loading}
                />
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}