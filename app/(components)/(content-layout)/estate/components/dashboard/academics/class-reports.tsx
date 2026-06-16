"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, FileDown, Printer } from "lucide-react";
import useSchoolStore from "../../../store/school";
import { generateClassTeacherComment } from "../../../lib/generateClassTeacherComment";

type Subject = {
  name: string;
  beginningTerm: number;
  midTerm: number;
  endTerm: number;
  grade: string;
  comment: string;
};

type Student = {
  name: string;
  admissionNumber: string;
  class: string;
  stream: string;
  subjects: Subject[];
  teacherComment: string;
};

export type ClassData = {
  className: string;
  term: string;
  year: string;
  teacher: string;
  students: Student[];
};

export default function ClassReports({ classData }: { classData: ClassData }) {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);

  const currentStudent = classData.students[currentStudentIndex];

  const goToNextStudent = () => {
    if (currentStudentIndex < classData.students.length - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPreviousStudent = () => {
    if (currentStudentIndex > 0) {
      setCurrentStudentIndex(currentStudentIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
            Class Report Cards
          </h1>
          <p className="text-gray-500">
            {classData.className} - {classData.term} {classData.year}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 border px-3 py-2 rounded-md"
          >
            <Printer size={16} /> Print
          </button>

          <button className="flex items-center gap-2 bg-blue-800 text-white px-3 py-2 rounded-md">
            <FileDown size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* NAV */}
      <div className="flex justify-between items-center">
        <button
          onClick={goToPreviousStudent}
          disabled={currentStudentIndex === 0}
          className="flex items-center gap-1 disabled:opacity-50"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <span className="text-sm text-gray-500">
          {currentStudentIndex + 1} / {classData.students.length}
        </span>

        <button
          onClick={goToNextStudent}
          disabled={currentStudentIndex === classData.students.length - 1}
          className="flex items-center gap-1 disabled:opacity-50"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>

      <StudentReportCard
        student={currentStudent}
        term={classData.term}
        year={classData.year}
      />
    </div>
  );
}

export function StudentReportCard({ student, term, year }: any) {
  const { school } = useSchoolStore();

  const total = student.subjects.reduce(
    (sum: number, s: any) =>
      sum + s.beginningTerm + s.midTerm + s.endTerm,
    0
  );

  const average = Math.round(total / (student.subjects.length * 3));

  return (
    <div className="w-full border rounded-xl shadow bg-white flex flex-col">

      {/* HEADER */}
      <div className="border-b p-4 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="font-bold text-blue-800 text-lg md:text-xl">
            {school?.name}
          </h1>
          <p className="text-sm text-gray-500">School Address</p>
        </div>

        <div className="text-left md:text-right">
          <h2 className="font-semibold text-blue-800">
            REPORT CARD
          </h2>
          <p className="text-sm">{term} - {year}</p>
        </div>
      </div>

      {/* STUDENT INFO */}
      <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span><b>Name:</b> {student.name}</span>
          <span><b>Admission No:</b> {student.admissionNumber}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span><b>Class:</b> {student.class}</span>
          <span><b>Stream:</b> {student.stream}</span>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-t">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-2 text-left">Subject</th>
              <th className="p-2">Beginning</th>
              <th className="p-2">Mid</th>
              <th className="p-2">End</th>
              <th className="p-2">Average</th>
              <th className="p-2">Grade</th>
            </tr>
          </thead>
          <tbody>
            {student.subjects.map((s: any, i: number) => {
              const avg = Math.round(
                (s.beginningTerm + s.midTerm + s.endTerm) / 3
              );

              return (
                <tr key={i} className="border-b text-center">
                  <td className="text-left p-2">{s.name}</td>
                  <td>{s.beginningTerm}</td>
                  <td>{s.midTerm}</td>
                  <td>{s.endTerm}</td>
                  <td>{avg}</td>
                  <td className="font-bold">{s.grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* SUMMARY */}
      <div className="p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 border p-3 rounded">
          <p className="text-sm">Total Marks</p>
          <p className="font-bold">{total}</p>
        </div>

        <div className="flex-1 border p-3 rounded">
          <p className="text-sm">Average</p>
          <p className="font-bold">{average}%</p>
        </div>
      </div>

      {/* COMMENT */}
      <div className="p-4 border-t flex flex-col gap-3">
        <h3 className="font-semibold text-blue-800">
          Teacher's Comment
        </h3>

        <div className="border p-3 rounded min-h-[60px]">
          {generateClassTeacherComment(average, student.name)}
        </div>
      </div>
    </div>
  );
}