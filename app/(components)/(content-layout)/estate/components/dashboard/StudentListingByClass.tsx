"use client";

import { Class, Student } from "../../types/types";
import React, { useState } from "react";
import TableHeader from "./Tables/TableHeader";
import { Card, CardContent } from "../ui/card";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { Button } from "../ui/button";
import { getStudentsByClass } from "../../actions/students";
import { deleteStudent } from "../../actions/students";
import { Loader2, Eye, Pencil, Trash2, Grid2X2 } from "lucide-react";
import { UserRoleSchool } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../ui/alert-dialog";
import { StudentInfoModal } from "./modals/student-info-modal";

export type StudentByClassProps = {
  classId: string;
  streamId: string;
  schoolId: string;
};

function StudentActions({ student }: { student: Student }) {
  async function handleDelete() {
    try {
      await deleteStudent(student.id);
      toast.success("Student deleted");
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to delete");
    }
  }

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <StudentInfoModal student={student} />
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/management/dashboard/students/view/${student.id}`}>
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </Button>
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/management/dashboard/students/edit/${student.id}`}>
          <Pencil className="w-3.5 h-3.5" />
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" className="h-8 w-8">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {student.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the student and their user account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function StudentTable({ students }: { students: Student[] }) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Reg / Guardian</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Class</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((s) => {
              const age = new Date().getFullYear() - new Date(s.dob).getFullYear();
              return (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Image
                        src={s.imageUrl || "/management/images/student.png"}
                        alt={s.name} width={36} height={36}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium capitalize truncate max-w-[140px]">
                          {s.name.toLowerCase()}
                        </p>
                        <p className="text-xs text-gray-400">{s.gender} · Age {age}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{s.regNo}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[120px]">{s.parentName}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{s.classTitle}</p>
                    <p className="text-xs text-gray-400">{s.streamTitle}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StudentActions student={s} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {students.map((s) => {
          const age = new Date().getFullYear() - new Date(s.dob).getFullYear();
          return (
            <div key={s.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                <Image
                  src={s.imageUrl || "/management/images/student.png"}
                  alt={s.name} width={40} height={40}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-semibold capitalize truncate">{s.name.toLowerCase()}</p>
                  <p className="text-xs text-gray-400">{s.gender} · Age {age}</p>
                </div>
              </div>
              <div className="px-4 py-2 space-y-1 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-gray-400 text-xs">Reg No</span>
                  <span className="font-medium text-xs">{s.regNo}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-gray-400 text-xs">Guardian</span>
                  <span className="font-medium text-xs truncate max-w-[160px]">{s.parentName}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-gray-400 text-xs">Class</span>
                  <span className="font-medium text-xs">{s.classTitle} · {s.streamTitle}</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 px-4 py-2.5 bg-gray-50 border-t border-gray-100">
                <StudentActions student={s} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function StudentListingByClass({
  classes,
  role = "ADMIN",
  schoolId,
}: {
  classes: Class[];
  role?: UserRoleSchool;
  schoolId: string;
}) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const classOptions = classes.map((c) => ({ label: c.title, value: c.id }));
  const [selectedClass, setSelectedClass] = useState<any>(classOptions[0] ?? null);

  const streams = classes.find((c) => c.id === selectedClass?.value)?.streams ?? [];
  const streamsOptions = [
    { label: "All Streams", value: "all" },
    ...streams.map((s) => ({ label: s.title, value: s.id })),
  ];
  const [selectedStream, setSelectedStream] = useState<any>(streamsOptions[0]);

  async function getStudentList() {
    if (!selectedClass) return;
    setStudents([]);
    setLoading(true);
    setSearched(true);
    try {
      const result = await getStudentsByClass({
        classId: selectedClass.value,
        streamId: selectedStream?.value ?? "all",
        schoolId: schoolId ?? "",
      });
      setStudents(result as Student[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const addHref =
    role === "SECRETARY"
      ? "/management/portal/secretary/students/new"
      : "/management/dashboard/students/new";

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <Card className="border-t-4 border-blue-600 shadow-sm">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full min-w-0">
              <FormSelectInput
                label="Class"
                options={classOptions}
                option={selectedClass}
                setOption={(val: any) => {
                  setSelectedClass(val);
                  setSelectedStream({ label: "All Streams", value: "all" });
                  setStudents([]);
                  setSearched(false);
                }}
              />
            </div>
            <div className="w-full min-w-0">
              <FormSelectInput
                label="Stream / Section"
                options={streamsOptions}
                option={selectedStream}
                setOption={setSelectedStream}
              />
            </div>
          </div>
          <Button onClick={getStudentList} disabled={loading || !selectedClass} className="w-full sm:w-auto">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Fetching…</> : "Get Student List"}
          </Button>
        </CardContent>
      </Card>

      {searched && !loading && (
        students.length > 0 ? (
          <div className="w-full space-y-3">
            <TableHeader
              title={`${selectedClass?.label ?? ""} — ${selectedStream?.label ?? "All Streams"}`}
              linkTitle="Add Student"
              href={addHref}
              data={students}
              model="student"
            />
            <StudentTable students={students} />
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
            No students found for the selected class / stream.
          </div>
        )
      )}
    </div>
  );
}
