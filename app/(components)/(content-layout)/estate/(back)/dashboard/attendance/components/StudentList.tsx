"use client";

import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Check, X, Clock } from "lucide-react";

import { cn } from "../../../../lib/utils";
import { useMediaQuery } from "../../../../hooks/use-media-query";

import {
  AttendanceStatus,
  StudentWithAttendance,
} from "./StudentListingByStream";

interface StudentListProps {
  students: StudentWithAttendance[];
  updateStudentStatus: (studentId: string, status: AttendanceStatus) => void;
}

export default function StudentList({
  students,
  updateStudentStatus,
}: StudentListProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Get status badge
  const getStatusBadge = (status: AttendanceStatus | undefined) => {
    switch (status) {
      case "PRESENT":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Present</Badge>
        );
      case "ABSENT":
        return <Badge variant="destructive">Absent</Badge>;
      case "EXCUSED":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Excused
          </Badge>
        );
      default:
        return <Badge variant="outline">Not Marked</Badge>;
    }
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className={cn(
              "p-4 border rounded-lg",
              student.status === "PRESENT" && "border-l-4 border-l-green-500",
              student.status === "ABSENT" && "border-l-4 border-l-red-500",
              student.status === "EXCUSED" && "border-l-4 border-l-amber-500"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-medium">{student.name}</div>
                <div className="text-sm text-muted-foreground">
                  {student.regNo}
                </div>
              </div>
              {getStatusBadge(student.status as AttendanceStatus)}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={student.status === "PRESENT" ? "default" : "outline"}
                className={cn(
                  "flex-1",
                  student.status === "PRESENT" &&
                    "bg-green-500 hover:bg-green-600"
                )}
                onClick={() => updateStudentStatus(student.id, "PRESENT")}
              >
                <Check className="mr-1 h-4 w-4" />
                Present
              </Button>
              <Button
                size="sm"
                variant={
                  student.status === "ABSENT" ? "destructive" : "outline"
                }
                className="flex-1"
                onClick={() => updateStudentStatus(student.id, "ABSENT")}
              >
                <X className="mr-1 h-4 w-4" />
                Absent
              </Button>
              <Button
                size="sm"
                variant={student.status === "EXCUSED" ? "default" : "outline"}
                className={cn(
                  "flex-1",
                  student.status === "EXCUSED" &&
                    "bg-amber-500 hover:bg-amber-600"
                )}
                onClick={() => updateStudentStatus(student.id, "EXCUSED")}
              >
                <Clock className="mr-1 h-4 w-4" />
                Excused
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student, index) => (
          <TableRow
            key={student.id}
            className={index % 2 === 0 ? "bg-muted/50" : ""}
          >
            <TableCell>
              <div>
                <div className="font-medium">{student.name}</div>
                <div className="text-xs text-muted-foreground">
                  {student.regNo}
                </div>
              </div>
            </TableCell>
            <TableCell>
              {getStatusBadge(student.status as AttendanceStatus)}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={student.status === "PRESENT" ? "default" : "outline"}
                  className={cn(
                    student.status === "PRESENT" &&
                      "bg-green-500 hover:bg-green-600"
                  )}
                  onClick={() => updateStudentStatus(student.id, "PRESENT")}
                >
                  <Check className="mr-1 h-4 w-4" />
                  Present
                </Button>
                <Button
                  size="sm"
                  variant={
                    student.status === "ABSENT" ? "destructive" : "outline"
                  }
                  onClick={() => updateStudentStatus(student.id, "ABSENT")}
                >
                  <X className="mr-1 h-4 w-4" />
                  Absent
                </Button>
                <Button
                  size="sm"
                  variant={student.status === "EXCUSED" ? "default" : "outline"}
                  className={cn(
                    student.status === "EXCUSED" &&
                      "bg-amber-500 hover:bg-amber-600"
                  )}
                  onClick={() => updateStudentStatus(student.id, "EXCUSED")}
                >
                  <Clock className="mr-1 h-4 w-4" />
                  Excused
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
