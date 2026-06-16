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
import {
  Check,
  FolderPlus,
  Pen,
  Pencil,
  Plus,
  User,
  UserPlus,
} from "lucide-react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { Button } from "../../../../components/ui/button";
import TextInput from "../../../../components/FormInputs/TextInput";
import SubmitButton from "../../../../components/FormInputs/SubmitButton";
import {
  AssignClassTeacherProps,
  BriefTeacher,
  StreamCreateProps,
} from "../../../../types/types";
import { assignClassTeacher, createStream } from "../../../../actions/classes";
import useSchoolStore from "../../../../store/school";
import FormSelectInput from "../../../../components/FormInputs/FormSelectInput";

export type ClassProps = {
  name: string;
};

export default function AssignClassTeacherForm({
  classId,
  initialContent,
  editingId,
  teachers,
  oldClassTeacherId,
}: {
  classId: string;
  oldClassTeacherId: string | null | undefined;
  initialContent?: string;
  editingId?: string;
  teachers: BriefTeacher[];
}) {
  const teacherOptions = teachers.map((teacher) => {
    return {
      label: `${teacher.firstName} ${teacher.lastName}`,
      value: teacher.id,
    };
  });

  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignClassTeacherProps>();

  const [loading, setLoading] = useState(false);

  async function addClassTeacher(data: AssignClassTeacherProps) {
    data.classId = classId;
    data.classTeacherId = selectedTeacher.value;
    data.classTeacherName = selectedTeacher.label;
    data.oldClassTeacherId = oldClassTeacherId;

    console.log(data);

    try {
      setLoading(true);
      const res = await assignClassTeacher(data);
      setLoading(false);
      toast.success("Teacher Successfully Assigned to this class!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      reset();
    } catch (error) {
      setLoading(false);
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
                <Pencil className="w-4 h-4 " />
              </button>
            ) : (
              <Button className="bg-white text-black border border-gray-200 hover:bg-gray-100">
                <UserPlus className="h-4 w-4 mr-2" />
                Assign Class Teacher
              </Button>
            )}
          </DialogTrigger>

          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle className="text-black">
                {editingId ? "Edit Stream" : "Assign Class Teacher"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(addClassTeacher)}>
              <div className="space-y-3">
                <div className="grid gap-3">
                  <FormSelectInput
                    label="Class teacher"
                    options={teacherOptions}
                    option={selectedTeacher}
                    setOption={setSelectedTeacher}
                    href="/management/dashboard/users/teachers/new"
                    toolTipText="Add new Teacher"
                  />
                </div>
              </div>

              <div className="py-3">
                <SubmitButton
                  title={editingId ? "Update" : "Assign teacher"}
                  buttonIcon={Check}
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