"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import {
  Download,
  Printer,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Define types
type Grade = "A+" | "A" | "B+" | "B" | "C+" | "C" | "D" | "F";

export type StudentWithMarks = {
  id: string;
  name: string;
  regNo: string;
  marks: number;
  position: number;
  grade: Grade;
};

type SortConfig = {
  key: keyof StudentWithMarks;
  direction: "asc" | "desc";
};

type Analytics = {
  average: string;
  highestMark: number;
  passRate: string;
};

export default function SubjectMarksheet({
  students,
  title,
}: {
  students: StudentWithMarks[];
  title: string;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "position",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 5;

  // Exam details - would be dynamic in a real application
  // const examName: string = "Mid-Term Examination";
  // const className: string = "Grade 10";
  // const subject: string = "Mathematics";

  // Calculate analytics
  const analytics: Analytics = useMemo(() => {
    const totalMarks = students.reduce(
      (sum, student) => sum + student.marks,
      0
    );
    const average = (totalMarks / students.length).toFixed(2);
    const highestMark = Math.max(...students.map((student) => student.marks));
    const passThreshold = 60;
    const passCount = students.filter(
      (student) => student.marks >= passThreshold
    ).length;
    const passRate = ((passCount / students.length) * 100).toFixed(2);

    return {
      average,
      highestMark,
      passRate,
    };
  }, []);

  // Filter students based on search term
  const filteredStudents: StudentWithMarks[] = useMemo(() => {
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.regNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Sort students
  const sortedStudents: StudentWithMarks[] = useMemo(() => {
    const sortableItems = [...filteredStudents];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredStudents, sortConfig]);

  // Paginate students
  const paginatedStudents: StudentWithMarks[] = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedStudents.slice(startIndex, startIndex + pageSize);
  }, [sortedStudents, currentPage]);

  // Handle sorting
  const requestSort = (key: keyof StudentWithMarks) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle print functionality
  const handlePrint = () => {
    window.print();
  };

  // Handle download as PDF functionality
  const handleDownload = () => {
    // In a real application, this would use a library like jsPDF
    alert("Downloading marksheet as PDF...");
  };

  // Get sort direction icon
  const getSortDirectionIcon = (key: keyof StudentWithMarks) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return <ArrowUpDown className="ml-1 h-4 w-4 text-primary" />;
  };

  // Check if student is in bottom 3
  const isBottomThree = (position: number): boolean => {
    return position > students.length - 3;
  };

  // Pagination controls
  const totalPages: number = Math.ceil(sortedStudents.length / pageSize);
  const canGoPrevious: boolean = currentPage > 1;
  const canGoNext: boolean = currentPage < totalPages;

  const goToPreviousPage = () =>
    setCurrentPage((page) => Math.max(1, page - 1));
  const goToNextPage = () =>
    setCurrentPage((page) => Math.min(totalPages, page + 1));

  return (
    <div className="container mx-auto py-6 max-w-5xl print:py-2">
      <Card className="print:shadow-none">
        <CardHeader className="pb-2">
          <div className="text-center mb-4">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          </div>

          <div className="flex justify-end print:hidden">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or reg no..."
                className="pl-8"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>
            <div className="flex gap-2 ml-2">
              <Button variant="outline" size="icon" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
                <span className="sr-only">Print marksheet</span>
              </Button>
              <Button variant="outline" size="icon" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                <span className="sr-only">Download marksheet</span>
              </Button>
            </div>
          </div>

          {/* Print-only header */}
          <div className="hidden print:block">
            <h1 className="text-center text-2xl font-bold">
              {title.split("-")[0]}
            </h1>
            <h2 className="text-center text-xl">
              {title.split("-")[1]} - {title.split("-")[2]} Marksheet
            </h2>
          </div>
        </CardHeader>

        <CardContent>
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 print:hidden">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h3 className="text-blue-600 font-medium text-lg">
                  Class Average
                </h3>
                <p className="text-blue-600 text-4xl font-bold">
                  {analytics.average}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <h3 className="text-green-600 font-medium text-lg">
                  Highest Mark
                </h3>
                <p className="text-green-600 text-4xl font-bold">
                  {analytics.highestMark}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-red-50">
              <CardContent className="p-4">
                <h3 className="text-red-600 font-medium text-lg">Pass Rate</h3>
                <p className="text-red-600 text-4xl font-bold">
                  {analytics.passRate}%
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] text-center">NO.</TableHead>
                  <TableHead
                    onClick={() => requestSort("name")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      STUDENT NAME
                      {getSortDirectionIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("regNo")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      REG NO
                      {getSortDirectionIcon("regNo")}
                    </div>
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("marks")}
                    className="cursor-pointer text-center"
                  >
                    <div className="flex items-center justify-center">
                      MARKS
                      {getSortDirectionIcon("marks")}
                    </div>
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("grade")}
                    className="cursor-pointer text-center"
                  >
                    <div className="flex items-center justify-center">
                      GRADE
                      {getSortDirectionIcon("grade")}
                    </div>
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("position")}
                    className="cursor-pointer text-center"
                  >
                    <div className="flex items-center justify-center">
                      RANK
                      {getSortDirectionIcon("position")}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(paginatedStudents.length > 0
                  ? paginatedStudents
                  : sortedStudents
                ).map((student) => (
                  <TableRow
                    key={student.id}
                    className={
                      isBottomThree(student.position) ? "bg-red-50" : ""
                    }
                  >
                    <TableCell className="text-center font-medium">
                      {student.position}
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell className="text-gray-500">
                      {student.regNo}
                    </TableCell>
                    <TableCell
                      className={`text-center ${student.marks < 60 ? "text-red-500 font-medium" : ""}`}
                    >
                      {student.marks}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          student.grade === "A+" || student.grade === "A"
                            ? "bg-green-100 text-green-800"
                            : student.grade === "B+" || student.grade === "B"
                              ? "bg-blue-100 text-blue-800"
                              : student.grade === "C+" || student.grade === "C"
                                ? "bg-yellow-100 text-yellow-800"
                                : student.grade === "D"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.grade}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {student.position === 1 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
                          1st
                        </span>
                      )}
                      {student.position === 2 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-gray-200 text-gray-700 font-medium">
                          2nd
                        </span>
                      )}
                      {student.position === 3 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
                          3rd
                        </span>
                      )}
                      {student.position > 3 && (
                        <span
                          className={`text-gray-500 ${isBottomThree(student.position) ? "text-gray-400" : ""}`}
                        >
                          {student.position}th
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4 print:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={!canGoPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={!canGoNext}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 text-sm text-muted-foreground print:mt-8 print:text-black">
            <div className="flex justify-between">
              <div>
                <p>Total Students: {sortedStudents.length}</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right print:block hidden">
                <p>Signature: _____________________</p>
                <p>Principal</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print-specific styles */}
      <style jsx global>{`
        ../../..media print {
          ../../..page {
            size: portrait;
            margin: 1cm;
          }
          body * {
            visibility: hidden;
          }
          .container,
          .container * {
            visibility: visible;
          }
          .container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
