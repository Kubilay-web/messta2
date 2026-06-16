// types/studentAttendance.ts

// Enum for attendance status
export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  EXCUSED = "EXCUSED",
}

// Student information
export interface StudentInfo {
  id: string;
  name: string;
  regNo: string;
}

// Attendance record for a subject
export interface SubjectAttendance {
  status: AttendanceStatus | null;
  note: string | null;
  recordId: string | null;
  logId: string;
}

// Subject information with attendance
export interface SubjectWithAttendance {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  classId: string;
  className: string;
  streamId: string;
  streamName: string;
  attendance: SubjectAttendance;
}

// Complete student attendance data structure
export interface StudentAttendanceData {
  student: StudentInfo;
  date: string; // ISO format date string
  subjects: SubjectWithAttendance[];
}
