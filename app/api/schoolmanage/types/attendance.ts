// Define the enum for student attendance status
// enum StudentAttendanceStatus {
//   PRESENT = "PRESENT",
//   ABSENT = "ABSENT",
//   EXCUSED = "EXCUSED",
// }

import { StudentAttendanceStatus } from "@prisma/client";

// Type for the headers in the response
interface AttendanceHeader {
  subjectId: string;
  subjectName: string;
  startTime: string;
  endTime: string;
  logId: string;
}

// Type for individual attendance record
interface AttendanceRecord {
  status: StudentAttendanceStatus;
  note: string | null;
  logId: string;
  recordId?: string; // Optional since it might not exist for initialized records
}

// Type for student with attendance records
interface StudentWithAttendance {
  id: string;
  name: string;
  regNo: string;
  attendance: Record<string, AttendanceRecord>; // This is a key-value object where keys are subjectIds
}

// Type for the student map used during processing
interface StudentMapEntry {
  id: string;
  name: string;
  regNo: string;
  attendanceBySubject: Record<string, any>; // We don't actually use this property in your code
}

// Type for the complete response data
interface AttendanceResponseData {
  date: Date;
  stream: {
    id: string;
    name: string;
  };
  class: {
    id: string;
    name: string;
  };
  headers: AttendanceHeader[];
  students: StudentWithAttendance[];
}

// Types for your Prisma models (simplified for this context)
interface AttendanceLog {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
  classId: string;
  className: string;
  streamName: string;
  streamId: string;
  subjectId: string;
  subjectName: string;
  schoolId: string;
  records: Attendance[];
}

interface Attendance {
  id: string;
  status: StudentAttendanceStatus;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
  studentId: string;
  studentName: string;
  studentRegNo: string;
  attendanceLogId: string;
  student: Student;
}

interface Student {
  id: string;
  userId: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  parentId: string;
  classId: string;
  studentType: string | null;
  streamId: string;
  password: string;
  imageUrl: string | null;
  phone: string | null;
  parentName: string | null;
  classTitle: string | null;
  streamTitle: string | null;
  state: string;
  BCN: string;
  nationality: string;
  religion: string;
  gender: string;
  dob: Date;
  rollNo: string;
  regNo: string;
  admissionDate: Date;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  schoolId: string;
  schoolName: string;
  // Relationships omitted for brevity
}

// Export all the types
export { StudentAttendanceStatus };
export type {
  AttendanceHeader,
  AttendanceRecord,
  StudentWithAttendance,
  StudentMapEntry,
  AttendanceResponseData,
  AttendanceLog,
  Attendance,
  Student,
};
