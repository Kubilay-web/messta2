"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export type ExamType = "REGULAR" | "MOCK" | "PLACEMENT";
export type ExamCategory = "TERM_START" | "MID_TERM" | "END_TERM";
export type Option = {
  label: string;
  value: string;
};
export interface IExamFormData {
  title: string;
  examType: ExamType;
  termName: number;
  termId: string;
  academicYear: string;
  startDate: string;
  duration: number; // in minutes
  classes: Option[];
  subjects: Option[];
  passingMark: number;
  totalMarks: number;
  examCategory: ExamCategory;
  weightage: number;
  schoolId: string;
}
import TextInput from "../../../components/FormInputs/TextInput";
import FormSelectInput from "../../../components/FormInputs/FormSelectInput";
import { ClassBrief, Period, SubjectBrief } from "../../../types/types";
import FormMultipleSelectInput from "../../../components/FormInputs/FormMultipleSelectInput";
import SubmitButton from "../../../components/FormInputs/SubmitButton";
import useSchoolStore from "../../../store/school";
import { createExam } from "../../../actions/exams";
import toast from "react-hot-toast";

export default function ExamForm({
  terms,
  classes,
  subjects,
  schoolId
}: {
  terms: Period[];
  classes: ClassBrief[];
  subjects: SubjectBrief[];
  schoolId:string;
}) {
  const examTypeOptions = [
    { label: "REGULAR", value: "REGULAR" },
    { label: "MOCK", value: "MOCK" },
    { label: "PLACEMENT", value: "PLACEMENT" },
  ];
  const [selectedExamType, setSelectedExamType] = useState<any>(
    examTypeOptions[0]
  );
  const examCategoryOptions = [
    { label: "TERM_START", value: "TERM_START" },
    { label: "MID_TERM", value: "MID_TERM" },
    { label: "END_TERM", value: "END_TERM" },
  ];
  const [selectedExamCategory, setSelectedExamCategory] = useState<any>(
    examCategoryOptions[0]
  );

  const termOptions = terms.map((item) => {
    return {
      label: item.term.toString(),
      value: item.id,
    };
  });
  const [selectedTerm, setSelectedTerm] = useState<any>(termOptions[0]);
  const classOptions = classes.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  const [classErr, setClassErr] = useState("");
  const [subjErr, setSubjErr] = useState("");
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const subjectOptions = subjects.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const { school } = useSchoolStore();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IExamFormData>({
    defaultValues: {
      title: "",
      academicYear: new Date().getFullYear().toString(),
      duration: 120,
      passingMark: 50,
      totalMarks: 100,
      weightage: 100,
    },
  });

  async function handleSaveExam(data: IExamFormData) {
    setClassErr("");
    setSubjErr("");
    setLoading(true);
    data.classes = selectedClass;
    data.subjects = selectedSubject;
    data.termId = selectedTerm.value;
    data.termName = Number(selectedTerm.label);
    data.examCategory = selectedExamCategory.value;
    data.examType = selectedExamType.value;
    data.duration = Number(data.duration);
    data.passingMark = Number(data.passingMark);
    data.totalMarks = Number(data.totalMarks);
    data.schoolId = schoolId ?? "";
    if (!data.classes) {
      setClassErr("Please select atleast one class");
      return;
    }
    if (!data.subjects) {
      setSubjErr("Please select atleast one subject");
      return;
    }
    console.log(data);
    try {
      const res = await createExam(data);
      setLoading(false);
      toast.success("Exam Created Successfully");
      reset();
      console.log(res);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <Card className="border-t-4 border-blue-600 shadow">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Create New Exam</h2>
          <form className="space-y-6" onSubmit={handleSubmit(handleSaveExam)}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Exam title"
                placeholder="eg Beginning of term exam"
                name="title"
              />
              <FormSelectInput
                label="Exam Type"
                options={examTypeOptions}
                option={selectedExamType}
                setOption={setSelectedExamType}
              />
              <FormSelectInput
                label="Term (Current Academic Year)"
                options={termOptions}
                option={selectedTerm}
                setOption={setSelectedTerm}
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Start Date"
                name="startDate"
                type="date"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Exam duration(minutes)"
                name="duration"
                type="number"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Exam Pass mark"
                placeholder="eg 50"
                type="number"
                name="passingMark"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Exam total Marks"
                name="totalMarks"
                type="number"
                placeholder="eg 100"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Exam weight percentage"
                placeholder="eg 50"
                type="number"
                name="weightage"
              />
              <FormSelectInput
                label="Exam Category"
                options={examCategoryOptions}
                option={selectedExamCategory}
                setOption={setSelectedExamCategory}
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="">
                <FormMultipleSelectInput
                  label="Classes"
                  options={classOptions}
                  option={selectedClass}
                  setOption={setSelectedClass}
                />
                {classErr && <p className="text-red-500 text-xs">{classErr}</p>}
              </div>
              <div className="">
                <FormMultipleSelectInput
                  label="Subjects"
                  options={subjectOptions}
                  option={selectedSubject}
                  setOption={setSelectedSubject}
                />
                {subjErr && <p className="text-red-500 text-xs">{subjErr}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-4 py-2 border rounded hover:bg-gray-100"
                onClick={() => reset()}
              >
                Reset
              </button>
              <SubmitButton title="Create Exam" loading={loading} />
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
