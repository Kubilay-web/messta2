// types/attendance.ts

// Enum for attendance status
export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  EXCUSED = "EXCUSED",
}

// Subject/class header information
export interface AttendanceHeader {
  subjectId: string;
  subjectName: string;
  startTime: string;
  endTime: string;
  logId: string;
}

// Individual attendance record
export interface AttendanceRecord {
  status: AttendanceStatus | null;
  note: string | null;
  logId: string;
  recordId?: string; // Optional because new records won't have an ID yet
}

// Student attendance records - using index signature for dynamic subject IDs
export interface StudentAttendance {
  id: string;
  name: string;
  regNo: string;
  attendance: {
    [subjectId: string]: AttendanceRecord;
  };
}

// Class information
export interface ClassInfo {
  id: string;
  name: string;
}

// Stream information
export interface StreamInfo {
  id: string;
  name: string;
}

// Complete attendance data structure
export interface AttendanceData {
  date: string | Date;
  stream: StreamInfo;
  class: ClassInfo;
  headers: AttendanceHeader[];
  students: StudentAttendance[];
}
