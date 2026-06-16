// "use client";

// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../../components/ui/table";
// import { Button } from "../../../components/ui/button";
// import { Eye, Pencil, Trash2 } from "lucide-react";
// import { Exam } from "../../../types/types";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../../../components/ui/tooltip";

// // Mock data for demonstration
// const mockExams = [
//   {
//     id: 1,
//     title: "End of Term 1 Examination 2024",
//     type: "Regular",
//     term: "1",
//     startDate: "2024-04-15",
//   },
//   {
//     id: 2,
//     title: "Mid-Term Mathematics Test",
//     type: "Mock",
//     term: "2",
//     startDate: "2024-05-20",
//   },
//   // Add more mock exams as needed
// ];
// const formatExamType = (type: string) => {
//   return type.charAt(0) + type.slice(1).toLowerCase();
// };

// const formatExamCategory = (category: string) => {
//   return category
//     .split("_")
//     .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
//     .join(" ");
// };
// export default function ExamListing({ exams }: { exams: Exam[] }) {
//   const handleEdit = (id: string) => {
//     // Implement edit functionality
//     console.log("Edit exam with id:", id);
//   };

//   const handleDelete = (id: string) => {
//     // Implement delete functionality
//     // setExams(exams.filter((exam) => exam.id !== id));
//   };
//   const handleView = (id: string) => {
//     // Implement delete functionality
//     // setExams(exams.filter((exam) => exam.id !== id));
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold">Exam Listing</h2>
//       <Table className="border">
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[250px]">Exam Title</TableHead>
//             <TableHead>Type</TableHead>
//             <TableHead>Category</TableHead>
//             <TableHead>Term</TableHead>
//             <TableHead>Academic Year</TableHead>
//             <TableHead>Start Date</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {exams.map((exam) => (
//             <TableRow key={exam.id}>
//               <TableCell className="font-medium">{exam.title}</TableCell>
//               <TableCell>{formatExamType(exam.examType)}</TableCell>
//               <TableCell>{formatExamCategory(exam.examCategory)}</TableCell>
//               <TableCell>Term {exam.termName}</TableCell>
//               <TableCell>{exam.academicYear}</TableCell>
//               <TableCell>
//                 {new Date(exam.startDate).toLocaleDateString()}
//               </TableCell>
//               <TableCell className="text-right">
//                 <TooltipProvider>
//                   <div className="flex justify-end gap-2">
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleView(exam.id)}
//                           className="hover:bg-gray-100"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>View Details</p>
//                       </TooltipContent>
//                     </Tooltip>

//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleEdit(exam.id)}
//                           className="hover:bg-gray-100"
//                         >
//                           <Pencil className="h-4 w-4" />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Edit Exam</p>
//                       </TooltipContent>
//                     </Tooltip>

//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleDelete(exam.id)}
//                           className="hover:bg-gray-100 hover:text-red-600"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Delete Exam</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </div>
//                 </TooltipProvider>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }









"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

export default function ExamListing({ exams }) {
  const handleEdit = (id) => {
    console.log("Edit exam with id:", id);
  };

  const handleDelete = (id) => {};

  const handleView = (id) => {};

  const formatExamType = (type) => {
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  const formatExamCategory = (category) => {
    return category
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl font-bold">Exam Listing</h2>

      {/* HEADER (Desktop only) */}
      <div className="hidden md:flex bg-gray-100 border rounded-lg px-4 py-3 font-semibold text-sm">
        <div className="flex-1">Exam Title</div>
        <div className="w-[120px]">Type</div>
        <div className="w-[160px]">Category</div>
        <div className="w-[100px]">Term</div>
        <div className="w-[140px]">Academic Year</div>
        <div className="w-[140px]">Start Date</div>
        <div className="w-[120px] text-right">Actions</div>
      </div>

      {/* BODY */}
      <div className="flex flex-col gap-3">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="flex flex-col md:flex-row md:items-center border rounded-lg p-4 gap-3 md:gap-0"
          >
            {/* Title */}
            <div className="flex-1 font-medium">
              {exam.title}
            </div>

            {/* Info Grid (Mobile) */}
            <div className="grid grid-cols-2 gap-2 text-sm md:hidden">
              <div>
                <span className="font-semibold">Type: </span>
                {formatExamType(exam.examType)}
              </div>
              <div>
                <span className="font-semibold">Category: </span>
                {formatExamCategory(exam.examCategory)}
              </div>
              <div>
                <span className="font-semibold">Term: </span>
                Term {exam.termName}
              </div>
              <div>
                <span className="font-semibold">Year: </span>
                {exam.academicYear}
              </div>
              <div>
                <span className="font-semibold">Date: </span>
                {new Date(exam.startDate).toLocaleDateString()}
              </div>
            </div>

            {/* Desktop Columns */}
            <div className="hidden md:block w-[120px]">
              {formatExamType(exam.examType)}
            </div>

            <div className="hidden md:block w-[160px]">
              {formatExamCategory(exam.examCategory)}
            </div>

            <div className="hidden md:block w-[100px]">
              Term {exam.termName}
            </div>

            <div className="hidden md:block w-[140px]">
              {exam.academicYear}
            </div>

            <div className="hidden md:block w-[140px]">
              {new Date(exam.startDate).toLocaleDateString()}
            </div>

            {/* Actions */}
            <div className="flex md:w-[120px] justify-end gap-2">
              <button
                onClick={() => handleView(exam.id)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleEdit(exam.id)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(exam.id)}
                className="p-2 hover:bg-gray-100 hover:text-red-600 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
