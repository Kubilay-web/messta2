"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Check, Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { Button } from "../../../../components/ui/button";
import TextInput from "../../../../components/FormInputs/TextInput";
import SubmitButton from "../../../../components/FormInputs/SubmitButton";
import { DepartmentCreateProps } from "../../../../types/types";
import { createDepartment } from "../../../../actions/departments";
import useSchoolStore from "../../../../store/school";

export default function DepartmentForm({
  initialContent,
  editingId,
  schoolId,
}: {
  initialContent?: string;
  editingId?: string;
  schoolId: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentCreateProps>({
    defaultValues: {
      name: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { school } = useSchoolStore();

  async function saveDepartment(data: DepartmentCreateProps) {
    data.schoolId = schoolId ?? "";
    try {
      setLoading(true);
      if (editingId) {
        // Güncelleme işlemi burada
      } else {
        await createDepartment(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="bg-white text-black p-2 rounded-lg">
      <Dialog>
        <DialogTrigger asChild>
          {editingId ? (
            <button title="Edit Department" className="text-black hover:text-gray-600">
              <Pencil className="w-4 h-4" />
            </button>
          ) : (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-black">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add Department</span>
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="bg-white text-black rounded-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Department" : "Add New Department"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(saveDepartment)} className="space-y-4">
            <TextInput
              register={register}
              errors={errors}
              label=""
              name="name"
              icon={Check}
              className="bg-gray-100 text-black placeholder-gray-500 focus:ring-black focus:border-black"
            />

            <div className="pt-2">
              <SubmitButton
                title={editingId ? "Update" : "Add"}
                loading={loading}
                className="bg-black text-white hover:bg-gray-800"
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}