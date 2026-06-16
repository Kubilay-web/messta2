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
  UpdateMarkSheetProps,
} from "../../../types/types";
import FormSelectInput from "../../../components/FormInputs/FormSelectInput";
import { Checkbox } from "../../../components/ui/checkbox";
import { getBriefStudentsByClassId } from "../../../actions/students";
import { Card, CardContent } from "../../../components/ui/card";
import { updateMarkSheetWithMarks } from "../../../actions/marksheets";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Mock data for demonstration
const initialStudents: MarkSheetStudent[] = [
  // { id: "1", name: "John Doe" },
  // { id: "2", name: "Jane Smith" },
  // { id: "2", name: "Jane Smith" },
  // { id: "2", name: "Jane Smith" },
  // Add more mock students as needed
];
interface StudentMarks {
  [key: string]: string;
}

interface AbsentStudents {
  [key: string]: boolean;
}
interface Student {
  id: string;
  name: string;
}
export type MarkSheetCreateProps = {
  examId: string;
  termId: string;
  classId: string;
  subjectId: string;
  title: string;
  schoolId:string;
};
const generateComment = (marks: number): string => {
  if (marks >= 90) {
    return "Outstanding performance! Shows exceptional understanding of the subject matter. Keep up the excellent work!";
  } else if (marks >= 80) {
    return "Very good work! Demonstrates strong grasp of concepts with room for minor improvements.";
  } else if (marks >= 70) {
    return "Good effort! Shows solid understanding but could benefit from more detailed responses.";
  } else if (marks >= 60) {
    return "Satisfactory work. Consider reviewing key concepts to strengthen understanding.";
  } else if (marks >= 50) {
    return "Passed, but needs improvement. Please seek additional support to strengthen fundamentals.";
  } else {
    return "Below passing requirement. Urgent attention needed - please schedule a consultation to discuss improvement strategies.";
  }
};
export default function MarkSheetForm({
  terms,
  classes,
  subjects,
  exams,
  schoolId,
}: {
  terms: Period[];
  classes: ClassBrief[];
  subjects: SubjectBrief[];
  exams: Exam[];
  schoolId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const markSheetId = searchParams.get("mid") ?? "";
  console.log(markSheetId);
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
  const [students, setStudents] = useState<MarkSheetStudent[] | null>(
    initialStudents,
  );

  const [selectedClass, setSelectedClass] = useState<any>(classOptions[0]);
  const subjectOptions = subjects.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  const [selectedSubject, setSelectedSubject] = useState<any>(
    subjectOptions[0],
  );
  const [isAbsent, setIsAbsent] = useState(false);
  const [studentMarks, setStudentMarks] = useState<StudentMarks>({});
  const [absentStudents, setAbsentStudents] = useState<AbsentStudents>({});
  console.log(students, studentMarks);
  const handleMarkChange = (studentId: string, mark: string) => {
    setStudentMarks((prev) => ({
      ...prev,
      [studentId]: mark,
    }));
  };

  const handleAbsentChange = (studentId: string, checked: boolean) => {
    setAbsentStudents((prev) => ({
      ...prev,
      [studentId]: checked,
    }));

    // Clear marks if student is marked absent
    if (checked) {
      setStudentMarks((prev) => {
        const newMarks = { ...prev };
        delete newMarks[studentId];
        return newMarks;
      });
    }
  };
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  async function handleCreateMarkSheet() {
    setStudentMarks({});
    setStudents([]);
    setLoading(true);
    console.log("clicked");
    try {
      const data: MarkSheetCreateProps = {
        examId: selectedExam.value,
        termId: selectedTerm.value,
        classId: selectedClass.value,
        subjectId: selectedSubject.value,
        title: `${selectedClass.label} Term-${selectedTerm.label} ${selectedSubject.label} ${selectedExam.label} Mark Sheet`,
        schoolId: schoolId
      };
      const resData = await getBriefStudentsByClassId(data);
      const params = new URLSearchParams(searchParams.toString());

      console.log(resData);
      params.set("mid", resData?.markSheetId ?? "");

      router.push(`${pathname}?${params.toString()}`);

      setStudents(resData?.students ?? []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  async function handleSubmitAndFetch() {
    setFetching(true);
    const stMarks = Object.entries(studentMarks).map(([studentId, marks]) => ({
      studentId: studentId,
      marks: parseInt(marks),
      isAbsent: false,
      comments: generateComment(parseInt(marks)),
    }));
    const abStMarks = Object.entries(absentStudents).map(
      ([studentId, isAbsent]) => ({
        studentId: studentId,
        marks: null,
        isAbsent: isAbsent,
        comments: "NA",
      }),
    );
    const data: UpdateMarkSheetProps = {
      examId: selectedExam.value,
      markSheetId: markSheetId,
      classId: selectedClass.value,
      subjectId: selectedSubject.value,
      termId: selectedTerm.value,
      studentMarks: [...stMarks, ...abStMarks],
    };
    console.log(data);
    try {
      // setStudents([]);
      const nextBatchStudents = await updateMarkSheetWithMarks(data);
      setStudentMarks({});
      console.log(nextBatchStudents);
      setStudents(nextBatchStudents);
      toast.success(
        nextBatchStudents.length > 0
          ? "Next Batch Fetched"
          : `You have Completed all students for ${selectedSubject.label}`,
      );
      setFetching(false);
    } catch (error) {
      toast.error("something went wrong");
      setFetching(false);
      console.log(error);
    }
  }

  console.log(students);
  return (
    <div className="space-y-6 items-start grid grid-cols-12 gap-8">
      <div className="grid gap-4 col-span-full md:col-span-4">
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
          disabled={loading}
          onClick={() => handleCreateMarkSheet()}
          type="submit"
        >
          {loading ? "Creating and Fetching..." : "Create MarkSheet"}
        </Button>
      </div>

      <Card className="border-t-4 border-blue-600 shadow col-span-full md:col-span-8 ">
        <CardContent className="">
          <h2 className="py-4 text-xl font-bold">
            Enter {selectedSubject.label} Marks
          </h2>
          <div className="">
            {students && students.length > 0 ? (
              <div className="">
                <Table className="border">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Is Absent</TableHead>
                      <TableHead>Mark</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          {student.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Checkbox
                              id={`absent-${student.id}`}
                              checked={absentStudents[student.id] || false}
                              onCheckedChange={(checked) =>
                                handleAbsentChange(
                                  student.id,
                                  checked as boolean,
                                )
                              }
                            />
                            <label
                              htmlFor={`absent-${student.id}`}
                              className="ml-2 text-sm text-gray-600"
                            >
                              Absent
                            </label>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={studentMarks[student.id] || ""}
                            onChange={(e) =>
                              handleMarkChange(student.id, e.target.value)
                            }
                            placeholder="Enter mark"
                            disabled={absentStudents[student.id]}
                            className={
                              absentStudents[student.id] ? "bg-gray-100" : ""
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  {fetching ? (
                    <Button disabled>
                      <Loader2 className="animate-spin" />
                      Saving Please wait...
                    </Button>
                  ) : (
                    <Button onClick={handleSubmitAndFetch} type="submit">
                      Save Marks and Continue
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-48">
                <h2>
                  {fetching
                    ? "Please wait while we fecth the next students"
                    : "Please Fetch the students"}
                </h2>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
