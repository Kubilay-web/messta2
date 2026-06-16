import {
  AttendanceStatus,
  ExamCategory,
  ExamType,
  Gender,
  PaymentStatus,
  Section,
  StudentAttendanceStatus,
  SubjectCategory,
  SubjectType,
  UserRoleSchool,
} from "@prisma/client";
import { Request, Response } from "express";
export interface TypedRequestBody<T> extends Request {
  body: T;
}

export type ContactProps = {
  fullName: string;
  email: string;
  phone: string;
  school: string;
  country: string;
  schoolPage: string;
  students: number;
  role: string;
  media: string;
  message: string;
};
export type UserCreateProps = {
  email: string;
  username:string;
  password: string;
  role: UserRoleSchool;
  name: string;
  phone?: string;
  image?: string;
  schoolId?: string;
  schoolName?: string;
};
export type UserLoginProps = {
  email: string;
  password: string;
};
export type AssignClassTeacherProps = {
  classTeacherId: string;
  classId: string;
  classTeacherName: string;
  oldClassTeacherId: string | null | undefined;
};
export type ClassCreateProps = {
  title: string;
  slug: string;
  schoolId: string;
};



export type DepartmentCreateProps = {
  name: string;
  slug: string;
  schoolId: string;
};
export type UserLogCreateProps = {
  name: string;
  activity: string;
  time: string;
  ipAddress?: string;
  device?: string;
  schoolId: string;
};
export type MarkSheetCreateProps = {
  examId: string;
  termId: string;
  classId: string;
  subjectId: string;
  title: string;
};
export interface GuardianCreateProps {
  studentId: string;
  // Father's Details
  fatherFullName: string;
  fatherOccupation: string;
  fatherPhoneNumber: string;
  fatherEmail: string;
  fatherOfficeAddress: string;
  isPrimaryGuardian: boolean;

  // Mother's Details
  motherFullName: string;
  motherOccupation: string;
  motherPhoneNumber: string;
  motherEmail: string;
  motherOfficeAddress: string;
  isSecondaryGuardian: boolean;

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactNumber: string;
  isLocalGuardian: boolean;
}
export type PeriodCreateProps = {
  year: number;
  term: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  schoolId: string;
};
export type Option = {
  label: string;
  value: string;
};
export type CreateMarkSheetProps = {
  examId: string;
  classId: string;
  markSheetId: string;
  subjectId: string;
  termId: string;
  studentMarks: {
    studentId: string;
    marks: number;
    isAbsent: boolean;
    comments: string;
  }[];
};
export interface ExamCreateProps {
  title: string;
  examType: ExamType;
  termName: number;
  termId: string;
  academicYear: string;
  startDate: string;
  duration: number; // in minutes
  classes: Option[];
  subjects: Option[];
  passingMark: number;
  totalMarks: number;
  examCategory: ExamCategory;
  weightage: number;
  schoolId: string;
}
export interface SiteCreateProps {
  schoolId: string;
  siteEnabled: boolean;
  sections: CreateSectionInput[];
}
export interface ActivityCreateDTO {
  activity: string;
  description: string;
  time: string;
  schoolId: string;
}
export interface NewsCreateDTO {
  schoolId: string;
  title: string;
  slug: string;
  content: string;
  image: string;
}
export interface EventCreateDTO {
  schoolId: string;
  title: string;
  description: string;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}
export interface GalleryCategoryCreateDTO {
  schoolId: string;
  name: string;
}
export interface GalleryImageCreateDTO {
  schoolId: string;
  title: string;
  description?: string;
  image: string;
  date?: string;
  categoryId: string;
}
export interface WebsiteContactCreateDTO {
  schoolId: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
}

export type CreateSectionInput = Omit<
  Section,
  "id" | "createdAt" | "updatedAt" | "isComplete"
>;
export type SingleEmailReminderProps = {
  parentName: string;
  email: string;
  message: string;
  subject: string;
};
export type SinglePhoneReminderProps = {
  parentName: string;
  phone: string;
  message: string;
};
export type BatchEmailReminderProps = {
  parents: {
    name: string;
    email: string;
    phone: string;
  }[];
  message: string;
  subject: string;
};
export type DocumentCreateProps = {
  name: string;
  type: string;
  url: string;
  size: number;
  studentId: string;
};
interface FeeEntry {
  title: string;
  amount: number;
}
export type SchoolFeeProps = {
  term: string;
  title: string;
  year: number;
  fees: FeeEntry[];
  schoolId: string;
  classId: string;
  periodId: string;
  schoolName: string;
  className: string;
};
export type AttendanceData = {
  log: {
    date: string;
    startTime: string;
    endTime: string;
    classId: string;
    streamId: string;
    subjectId: string;
    className: string;
    streamName: string;
    subjectName: string;
    schoolId: string;
  };
  records: {
    status: StudentAttendanceStatus;
    studentId: string;
    studentName: string;
    studentRegNo: string;
  }[];
};
export type SubjectCreateProps = {
  schoolId: any;
  name: string;
  slug: string;
  code: string; // e.g., "MATH101", "PHY201"
  shortName: string; // e.g., "Math", "Phy"
  category: SubjectCategory; // Core, Elective, etc.
  type: SubjectType; // Theory, Practical, Both
  departmentId: string;
  departmentName: string;
};

export type StreamCreateProps = {
  title: string;
  slug: string;
  classId: string;
  schoolId: string;
};
export type ParentCreateProps = {
  title: string;
  firstName: string;
  lastName: string;
  relationship: string;
  email: string;
  NIN: string;
  gender: string;
  dob: string;
  phone: string;
  nationality: string;
  whatsapNo: string;
  imageUrl: string;
  contactMethod: string;
  occupation: string;
  address: string;
  password: string;
  schoolId: string;
  schoolName: string;
  userId: string;
};

export type StudentCreateProps = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  parentId: string;
  classId: string;
  streamId: string;
  parentName?: string;
  classTitle?: string;
  streamTitle?: string;
  password: string;
  imageUrl: string;
  phone: string;
  state: string;
  BCN: string;
  nationality: string;
  religion: string;
  gender: string;
  dob: string;
  rollNo: string;
  regNo: string;
  admissionDate: string;
  address: string;
  schoolId: string;
  schoolName: string;
  userId: string;
};
export type TeacherCreateProps = {
  title: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsappNo: string;
  nationality: string;
  NIN: string;
  gender: Gender;
  dateOfBirth: string;

  contactMethod: string;
  password: string;
  dateOfJoining: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  qualification: string;
  mainSubject: string;
  mainSubjectId: string;
  classIds: string[];
  classes: string[];
  experience: number;
  address: string;
  imageUrl: string;
  schoolId: string;
  schoolName: string;
  userId: string;
  subjectsSummary: string[];
};

export interface CreateSchoolFeePaymentInput {
  schoolName: string;
  schoolId: string;
  periodId: string;
  schoolFeeId: string;
  studentProfileId: string;
  studentUserId: string;
  studentName: string;
  parentProfileId: string;
  parentUserId: string;
  parentName: string;
  schoolFeeTitle: string;
  paidFeeAmount: number;
  paidFees: string[];
  PRN: string;
  term: string;
  year: number;
  className: string;
  paymentStatus: PaymentStatus;
}
export type GroupMessagePayload = {
  key: string;
  subject: string;
  message: string;
  schoolId: string;
};