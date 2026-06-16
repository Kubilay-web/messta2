"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  ClassBrief,
  CreateMarkSheetProps,
  Exam,
  MarkSheetStudent,
  Period,
  SubjectBrief,
} from "../../../types/types";
import FormSelectInput from "../../../components/FormInputs/FormSelectInput";
import { Checkbox } from "../../../components/ui/checkbox";
import { getBriefStudentsByClassId } from "../../../actions/students";
import { Card, CardContent } from "../../../components/ui/card";
import {
  getSubjectMarkSheet,
  SubjectMarkSheetDTO,
  updateMarkSheetWithMarks,
} from "../../../actions/marksheets";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SubjectMarksheet, { StudentWithMarks } from "./StudentMarkSheet";

// Mock data for demonstration
const initialStudents: StudentWithMarks[] = [];
export type MarkSheetCreateProps = {
  examId: string;
  termId: string;
  classId: string;
  subjectId: string;
};

export default function MarkSheetListing({
  terms,
  classes,
  subjects,
  exams,
}: {
  terms: Period[];
  classes: ClassBrief[];
  subjects: SubjectBrief[];
  exams: Exam[];
}) {
  const termOptions = terms.map((item) => {
    return {
      label: item.term.toString(),
      value: item.id,
    };
  });
  const examOptions = exams.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  const [selectedExam, setSelectedExam] = useState<any>(examOptions[0]);
  const [selectedTerm, setSelectedTerm] = useState<any>(termOptions[0]);
  const classOptions = classes.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  const [students, setStudents] = useState<StudentWithMarks[] | null>(
    initialStudents
  );

  const [selectedClass, setSelectedClass] = useState<any>(classOptions[0]);
  const subjectOptions = subjects.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  const [selectedSubject, setSelectedSubject] = useState<any>(
    subjectOptions[0]
  );
  const [title, setTitle] = useState("");

  const [fetching, setFetching] = useState(false);
  async function handleSubmitAndFetch() {
    setFetching(true);
    const data: SubjectMarkSheetDTO = {
      examId: selectedExam.value,
      classId: selectedClass.value,
      subjectId: selectedSubject.value,
      termId: selectedTerm.value,
    };
    try {
      setStudents([]);
      const studentsMarks = await getSubjectMarkSheet(data);
      setStudents(studentsMarks);
      setTitle(
        `${selectedExam.label} - ${selectedClass.label} - ${selectedSubject.label}`
      );
      toast.success(
        studentsMarks.length > 0
          ? "Fetched Successful"
          : `No student MarkSheet found for this ${selectedSubject.label}`
      );
      setFetching(false);
    } catch (error) {
      toast.error("something went wrong");
      setFetching(false);
      console.log(error);
    }
  }

  return (
    <div className=" items-start grid grid-cols-12 gap-8">
      <div className="grid gap-4 col-span-full md:col-span-3">
        <div className="space-y-2">
          <FormSelectInput
            label="Exams"
            options={examOptions}
            option={selectedExam}
            setOption={setSelectedExam}
          />
        </div>
        <div className="space-y-2">
          <FormSelectInput
            label="Terms"
            options={termOptions}
            option={selectedTerm}
            setOption={setSelectedTerm}
          />
        </div>
        <div className="space-y-2">
          <FormSelectInput
            label="Classes"
            options={classOptions}
            option={selectedClass}
            setOption={setSelectedClass}
          />
        </div>
        <div className="space-y-2">
          <FormSelectInput
            label="Subjects"
            options={subjectOptions}
            option={selectedSubject}
            setOption={setSelectedSubject}
          />
        </div>
        <Button
          className="disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={fetching}
          onClick={() => handleSubmitAndFetch()}
          type="submit"
        >
          {fetching ? "Fetching..." : "Fetch MarkSheet"}
        </Button>
      </div>

      <div className="col-span-full md:col-span-9 ">
        {students && students.length > 0 ? (
          <SubjectMarksheet title={title} students={students} />
        ) : (
          <div className="flex items-center justify-center min-h-96">
            {fetching ? (
              <h2>Fetching please wait...</h2>
            ) : (
              <h2>Please Fetch the Marksheet</h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
