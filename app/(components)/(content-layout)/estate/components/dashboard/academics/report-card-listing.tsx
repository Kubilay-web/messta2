// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Button } from "../../../components/ui/button";
// import { Input } from "../../../components/ui/input";
// import { Label } from "../../../components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../../components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../../components/ui/table";
// import {
//   ClassBrief,
//   CreateMarkSheetProps,
//   Exam,
//   MarkSheetStudent,
//   Period,
//   SubjectBrief,
// } from "../../../types/types";
// import FormSelectInput from "../../../components/FormInputs/FormSelectInput";

// import ClassReports, { ClassData } from "./class-reports";
// import FormMultipleSelectInput from "../../../components/FormInputs/FormMultipleSelectInput";
// import { getClassReportsData } from "../../../actions/report-cards";
// export interface FetchReportData {
//   termId: string;
//   classId: string;
//   examIds: string;
// }
// export type MarkSheetCreateProps = {
//   examId: string;
//   termId: string;
//   classId: string;
//   subjectId: string;
// };

// export default function ReportCardsListing({
//   terms,
//   classes,
//   exams,
// }: {
//   terms: Period[];
//   classes: ClassBrief[];
//   exams: Exam[];
// }) {
//   const examOptions = exams.map((item) => {
//     return {
//       label: item.title,
//       value: item.id,
//     };
//   });
//   const termOptions = terms.map((item) => {
//     return {
//       label: item.term.toString(),
//       value: item.id,
//     };
//   });

//   const [selectedTerm, setSelectedTerm] = useState<any>(termOptions[0]);
//   const classOptions = classes.map((item) => {
//     return {
//       label: item.title,
//       value: item.id,
//     };
//   });
//   const [selectedExam, setSelectedExam] = useState<any>(null);
//   const [selectedClass, setSelectedClass] = useState<any>(classOptions[0]);

//   const [title, setTitle] = useState("");
//   const [examErr, setExamErr] = useState("");
//   const [fetching, setFetching] = useState(false);
//   const [classData, setClassData] = useState<ClassData | null>(null);
//   async function handleFetchReports() {
//     setFetching(true);
//     try {
//       const data: FetchReportData = {
//         termId: selectedTerm.value,
//         classId: selectedClass.value,
//         examIds: selectedExam.map((item: any) => item.value).join(","),
//       };
//       const res = await getClassReportsData(data);
//       console.log(res);
//       setFetching(false);
//       setClassData(res);
//     } catch (error) {
//       setFetching(false);
//       console.log(error);
//     }
//   }

//   return (
//     <div className="px-6">
//       <div className="grid grid-cols-3  gap-6 w-full items-end">
//         <div className="">
//           <FormMultipleSelectInput
//             label="Exams"
//             options={examOptions}
//             option={selectedExam}
//             setOption={setSelectedExam}
//           />
//           {examErr && <p className="text-red-500 text-xs">{examErr}</p>}
//         </div>
//         <FormSelectInput
//           label="Terms"
//           options={termOptions}
//           option={selectedTerm}
//           setOption={setSelectedTerm}
//         />
//         <FormSelectInput
//           label="Classes"
//           options={classOptions}
//           option={selectedClass}
//           setOption={setSelectedClass}
//         />
//         <Button
//           className="disabled:opacity-60 disabled:cursor-not-allowed"
//           disabled={fetching}
//           onClick={() => handleFetchReports()}
//           type="submit"
//         >
//           {fetching ? "Generating..." : "Generate"}
//         </Button>
//       </div>
//       <div className="py-4">
//         {classData && classData.term && <ClassReports classData={classData} />}
//       </div>
//     </div>
//   );
// }





"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";

import {
  ClassBrief,
  Exam,
  Period,
} from "../../../types/types";

import FormSelectInput from "../../../components/FormInputs/FormSelectInput";
import FormMultipleSelectInput from "../../../components/FormInputs/FormMultipleSelectInput";

import ClassReports, { ClassData } from "./class-reports";
import { getClassReportsData } from "../../../actions/report-cards";

export interface FetchReportData {
  termId: string;
  classId: string;
  examIds: string;
}

export default function ReportCardsListing({
  terms,
  classes,
  exams,
}: {
  terms: Period[];
  classes: ClassBrief[];
  exams: Exam[];
}) {
  const examOptions = exams.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  const termOptions = terms.map((item) => ({
    label: item.term.toString(),
    value: item.id,
  }));

  const classOptions = classes.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  const [selectedTerm, setSelectedTerm] = useState<any>(termOptions[0]);
  const [selectedClass, setSelectedClass] = useState<any>(classOptions[0]);
  const [selectedExam, setSelectedExam] = useState<any>([]);

  const [fetching, setFetching] = useState(false);
  const [classData, setClassData] = useState<ClassData | null>(null);

  async function handleFetchReports() {
    if (!selectedExam || selectedExam.length === 0) {
      alert("Please select exams");
      return;
    }

    setFetching(true);

    try {
      const payload: FetchReportData = {
        termId: selectedTerm.value,
        classId: selectedClass.value,
        examIds: selectedExam.map((i: any) => i.value).join(","),
      };

      const res = await getClassReportsData(payload);

      // 🔥 IMPORTANT: sadece data’yı al
      setClassData(res?.data ?? null);

      console.log("REPORT RESPONSE:", res);
    } catch (error) {
      console.log(error);
      setClassData(null);
    } finally {
      setFetching(false);
    }
  }

  return (
    <div className="px-6 space-y-4">
      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <FormMultipleSelectInput
          label="Exams"
          options={examOptions}
          option={selectedExam}
          setOption={setSelectedExam}
        />

        <FormSelectInput
          label="Terms"
          options={termOptions}
          option={selectedTerm}
          setOption={setSelectedTerm}
        />

        <FormSelectInput
          label="Classes"
          options={classOptions}
          option={selectedClass}
          setOption={setSelectedClass}
        />

        <Button
          disabled={fetching}
          onClick={handleFetchReports}
          className="md:col-span-3"
        >
          {fetching ? "Generating..." : "Generate Report"}
        </Button>
      </div>

      {/* RESULT */}
      <div className="py-4">
        {classData?.students?.length > 0 ? (
          <ClassReports classData={classData} />
        ) : (
          <p className="text-sm text-gray-500">
            No report data yet. Select filters and generate.
          </p>
        )}
      </div>
    </div>
  );
}