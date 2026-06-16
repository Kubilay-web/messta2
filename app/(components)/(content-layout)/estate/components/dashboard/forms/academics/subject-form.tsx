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
import { SubjectCreateProps } from "../../../../types/types";
import FormSelectInput from "../../../../components/FormInputs/FormSelectInput";

import { createSubject } from "../../../../actions/subjects";
export type DepartmentOption = {
  label: string;
  value: string;
};
export type DepartmentProps = {
  name: string;
};
export default function SubjectForm({
  initialContent,
  editingId,
  departments,
  schoolId,
}: {
  initialContent?: string;
  editingId?: string;
  departments: DepartmentOption[];
  schoolId: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubjectCreateProps>({
    defaultValues: {
      name: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const types = [
    {
      label: "THEORY",
      value: "THEORY",
    },
    {
      label: "PRACTICAL",
      value: "PRACTICAL",
    },
    {
      label: "BOTH",
      value: "BOTH",
    },
  ];
  const categories = [
    {
      label: "CORE",
      value: "CORE",
    },
    {
      label: "ELECTIVE",
      value: "ELECTIVE",
    },
    {
      label: "ADDITIONAL",
      value: "ADDITIONAL",
    },
    {
      label: "VOCATIONAL",
      value: "VOCATIONAL",
    },
    {
      label: "LANGUAGE",
      value: "LANGUAGE",
    },
    {
      label: "EXTRA_CURRICULAR",
      value: "EXTRA_CURRICULAR",
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState<any>(categories[0]);

  const [selectedType, setSelectedType] = useState<any>(types[0]);

  async function saveSubject(data: SubjectCreateProps) {
    data.schoolId = schoolId;
    data.departmentId = selectedDepartment.value;
    data.departmentName = selectedDepartment.label;
    data.category = selectedCategory.value;
    data.type = selectedType.value;

    try {
      setLoading(true);
      if (editingId) {
        // await updateFolderById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
      } else {
        const res = await createSubject(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div>
      <div className="py-1">
        <Dialog>
          <DialogTrigger asChild>
            {editingId ? (
              <button title="Edit Folder" className="text-blue-600">
                <Pencil className="w-4 h-4 " />
              </button>
            ) : (
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4" />
                <span className="">Add Subject</span>
              </Button>
            )}
          </DialogTrigger>

          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Subject" : "Add New Subject"}
              </DialogTitle>
              {/* <DialogDescription>
                Please Write your Comment here, with respect
              </DialogDescription> */}
            </DialogHeader>
            <form className="" onSubmit={handleSubmit(saveSubject)}>
              <div className="">
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Name"
                      name="name"
                      icon={Check}
                    />
                    <FormSelectInput
                      label="Department"
                      options={departments}
                      option={selectedDepartment}
                      setOption={setSelectedDepartment}
                      toolTipText="Add Department"
                      href="/dashboard/academics/departments"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Subject code"
                      name="code"
                      placeholder="MATH101"
                    />
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Short Name"
                      name="shortName"
                      placeholder="Math"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <FormSelectInput
                      label="Category"
                      options={categories}
                      option={selectedCategory}
                      setOption={setSelectedCategory}
                    />
                    <FormSelectInput
                      label="Type"
                      options={types}
                      option={selectedType}
                      setOption={setSelectedType}
                    />
                  </div>
                </div>
                <div className="py-3">
                  <SubmitButton
                    title={editingId ? "Update" : "Add New Subject"}
                    loading={loading}
                  />
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
