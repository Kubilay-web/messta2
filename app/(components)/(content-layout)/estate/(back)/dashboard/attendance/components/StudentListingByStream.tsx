"use client";
import useSchoolStore from "../../../../store/school";
import { Class, Student, Subject, UserRole } from "../../../../types/types";
import React, { useState } from "react";

import { Card, CardContent } from "../../../../components/ui/card";

import { Button } from "../../../../components/ui/button";
import { getStudentsByClass } from "../../../../actions/students";
import { Calendar, Check, Clock, Loader2 } from "lucide-react";
import FormSelectInput from "../../../../components/FormInputs/FormSelectInput";
import { format } from "date-fns";
import StudentList from "./StudentList";
import { toast } from "sonner";

import { Label } from "../../../../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { Calendar as CalendarComponent } from "../../../../components/ui/calendar";
import { Input } from "../../../../components/ui/input";
import { createAttendance } from "../../../../actions/attendance";

export type StudentByClassProps = {
  classId: string;
  streamId: string;
  schoolId: string;
};

export type AttendanceData = {
  log: {
    date: string;
    startTime: string;
    endTime: string;
    classId: string;
    streamId: string;
    subjectId: string;
    subjectName: string;
    className: string;
    streamName: string;
    schoolId: string;
  };
  records: {
    status: AttendanceStatus;
    studentId: string;
    studentName: string;
    studentRegNo: string;
  }[];
};

export type AttendanceStatus = "PRESENT" | "ABSENT" | "EXCUSED" | "not_marked";

export interface StudentWithAttendance {
  id: string;
  name: string;
  regNo: string;
  status: AttendanceStatus;
}
export default function StudentListingByStream({
  classes,
  subjects,
  role = "ADMIN",
  schoolId,
}: {
  classes: Class[];
  role?: UserRole;
  subjects: Subject[];
  schoolId: string;
}) {
  const { school } = useSchoolStore();
  const [students, setStudents] = useState<StudentWithAttendance[]>([]);
  // Class
  const classOptions = classes.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  const subjectOptions = subjects.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  const [selectedClass, setSelectedClass] = useState<any>(classOptions[0]);
  const [selectedSubject, setSelectedSubject] = useState<any>(
    subjectOptions[0],
  );
  const classId = selectedClass?.value ?? "";
  const streams = classes.find((item) => item.id === classId)?.streams || [];
  // sections/Streams
  const streamsOptions = streams.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

  streamsOptions.unshift({
    label: "All Streams",
    value: "all",
  });

  const [selectedStream, setSelectedStream] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  // const [students, setStudents] = useState<StudentWithAttendance[]>(
  //   mockStudents.map((student) => ({
  //     ...student,
  //     status: "not_marked",
  //   }))
  // );

  const [isSaving, setIsSaving] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>(
    format(new Date(), "HH:mm"),
  );
  const [endTime, setEndTime] = useState<string>(
    format(new Date(new Date().getTime() + 60 * 60 * 1000), "HH:mm"),
  );
  const formattedDate = format(date, "MMMM d, yyyy");

  // Mark all students as present
  const markAllPresent = () => {
    setStudents(
      students.map((student) => ({
        ...student,
        status: "PRESENT",
      })),
    );
  };

  // Update a single student's attendance status
  const updateStudentStatus = (studentId: string, status: AttendanceStatus) => {
    setStudents(
      students.map((student) =>
        student.id === studentId ? { ...student, status } : student,
      ),
    );
  };

  // Handle time change
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  // Save attendance data
  const saveAttendance = async () => {
    setIsSaving(true);
    const allMarked = students.every(
      (student) => student.status !== "not_marked",
    );

    if (!allMarked) {
      toast.error("Warning", {
        description: "Some students haven't been marked yet.",
      });
      return;
    }
    const data: AttendanceData = {
      log: {
        date: date.toISOString(),
        startTime,
        endTime,
        classId: selectedClass.value as string,
        streamId: selectedStream.value as string,
        subjectId: selectedSubject.value as string,
        subjectName: selectedSubject.label as string,
        className: selectedClass.label as string,
        streamName: selectedStream.label as string,
        schoolId: schoolId ?? "",
      },
      records: students.map((student) => {
        return {
          status: student.status,
          studentId: student.id,
          studentName: student.name,
          studentRegNo: student.regNo,
        };
      }),
    };
    try {
      await createAttendance(data);
      // Check if all students have been marked
      setIsSaving(false);
      toast.success("Success", {
        description: "Attendance Created Successfully.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function getStudentList() {
    setStudents([]);
    setLoading(true);
    try {
      // Fetch logic
      const classId = selectedClass.value as string;
      const streamId = selectedStream.value as string;
      const data: StudentByClassProps = {
        classId,
        streamId,
        schoolId: school?.id ?? "",
      };
      const students = await getStudentsByClass(data);
      const formattedStudents: StudentWithAttendance[] = students.map((s) => {
        return {
          id: s.id,
          name: s.name,
          regNo: s.regNo,
          status: "not_marked",
        };
      });
      setStudents(formattedStudents);
      setLoading(false);
      console.log(students);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="p-2 space-y-6 w-full">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 space-y-6">
          <div className="grid md:grid-cols-3 gap-3">
            <FormSelectInput
              label="Class"
              options={classOptions}
              option={selectedClass}
              setOption={setSelectedClass}
            />
            <FormSelectInput
              label="Stream/Section"
              options={streamsOptions}
              option={selectedStream}
              setOption={setSelectedStream}
            />
            <FormSelectInput
              label="Subject/Section"
              options={subjectOptions}
              option={selectedSubject}
              setOption={setSelectedSubject}
            />
          </div>
          {loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Fetching Please wait...
            </Button>
          ) : (
            <Button onClick={getStudentList}>Get Student List</Button>
          )}
        </CardContent>
      </Card>
      {/* {students && students.length > 0 && (
        <>
          <Card className="p-6">
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl text-center font-semibold mb-2">
                Attendance for {selectedClass?.label} {selectedStream?.label} -{" "}
                {selectedSubject.label}
              </h3>
              <div className="grid  gap-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-sm font-medium">
                      Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="date"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formattedDate}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={(date) => date && setDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="startTime" className="text-sm font-medium">
                      Start Time
                    </Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <Input
                        type="time"
                        id="startTime"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="endTime" className="text-sm font-medium">
                      End Time
                    </Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <Input
                        type="time"
                        id="endTime"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-4">
                <div className="bg-muted p-2 rounded-md text-sm inline-block">
                  <span className="font-medium">Session:</span>{" "}
                  {selectedSubject?.name} class for {selectedClass?.name}{" "}
                  {selectedStream?.stream} on {formattedDate}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={markAllPresent}
                    className="whitespace-nowrap"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Mark All Present
                  </Button>
                  <Button
                    onClick={saveAttendance}
                    disabled={isSaving}
                    className="whitespace-nowrap"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </div>

              <StudentList
                students={students}
                updateStudentStatus={updateStudentStatus}
              />
            </div>
          </Card>
        </>
      )} */}

      {students && students.length > 0 && (
        <Card className="p-4 sm:p-6 w-full max-w-full">
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl sm:text-2xl text-center font-semibold mb-2">
              Attendance for {selectedClass?.label} {selectedStream?.label} -{" "}
              {selectedSubject.label}
            </h3>

            <div className="grid gap-4 sm:gap-6">
              {/* Date and Time Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date Picker */}
                <div>
                  <Label htmlFor="date" className="text-sm font-medium">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        id="date"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {formattedDate}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={(date) => date && setDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Start Time */}
                <div>
                  <Label htmlFor="startTime" className="text-sm font-medium">
                    Start Time
                  </Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <Input
                      type="time"
                      id="startTime"
                      value={startTime}
                      onChange={handleStartTimeChange}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* End Time */}
                <div>
                  <Label htmlFor="endTime" className="text-sm font-medium">
                    End Time
                  </Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <Input
                      type="time"
                      id="endTime"
                      value={endTime}
                      onChange={handleEndTimeChange}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Session Info & Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-4">
              <div className="bg-muted p-2 rounded-md text-sm w-full sm:w-auto text-center sm:text-left">
                <span className="font-medium">Session:</span>{" "}
                {selectedSubject?.name} class for {selectedClass?.name}{" "}
                {selectedStream?.stream} on {formattedDate}
              </div>

              <div className="flex flex-wrap gap-2 justify-start sm:justify-end w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={markAllPresent}
                  className="whitespace-nowrap"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Mark All Present
                </Button>
                <Button
                  onClick={saveAttendance}
                  disabled={isSaving}
                  className="whitespace-nowrap"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>

            {/* Student List */}
            <StudentList
              students={students}
              updateStudentStatus={updateStudentStatus}
            />
          </div>
        </Card>
      )}
    </div>
  );
}
