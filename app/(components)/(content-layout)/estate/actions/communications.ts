"use server";

import {
  DepartmentBrief,
  GroupedPeriods,
  Period,
} from "../types/types";



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

export type MessageGroups = {
  parents: number;
  students: number;
  teachers: number;
};

export async function sendSingleEmailReminder(data: SingleEmailReminderProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schoolproject/reminders/specific-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Failed to send email reminder");
  }

  return response.json();
}

export async function sendSinglePhoneReminder(data: SinglePhoneReminderProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schoolproject/reminders/specific-phone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Failed to send phone reminder");
  }

  return response.json();
}

export async function sendBulkEmail(data: BatchEmailReminderProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schoolproject/reminders/batch-emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Failed to send bulk emails");
  }

  return response.json();
}

export async function getAllGroupedPeriods(schoolId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schoolproject/periods/${schoolId}`);

    if (!response.ok) throw new Error("Failed to fetch periods");

    const periods = await response.json();
    return periods as GroupedPeriods;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPeriods(schoolId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schoolproject/periods/${schoolId}`);

    if (!response.ok) throw new Error("Failed to fetch periods");

    const data = await response.json();
    return data.data as Period[];
  } catch (error) {
    console.log(error);
  }
}

export async function getBriefDepartments(schoolId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schoolproject/departments/brief/${schoolId}`);

    if (!response.ok) throw new Error("Failed to fetch departments");

    const departments = await response.json();
    return departments as DepartmentBrief[];
  } catch (error) {
    console.log(error);
  }
}

export async function getMessageGroups(schoolId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schoolproject/groups/${schoolId}`);

    if (!response.ok) throw new Error("Failed to fetch groups");

    const groups = await response.json();
    return groups as MessageGroups;
  } catch (error) {
    return {
      parents: 0,
      students: 0,
      teachers: 0,
    };
  }
}

export type Reminder = {
  name: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  schoolId: string;
  email: string | null;
  message: string;
  subject: string;
  recipient: "Parents" | "Students" | "Teachers" | "All";
  from: "Administration" | "Parent" | "Student" | "Teacher";
};

export async function getRemindersByKey(schoolId: string, key: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/schoolproject/reminders/${schoolId}?key=${key}`
    );

    if (!response.ok) throw new Error("Failed to fetch reminders");

    const messages = await response.json();
    return messages as Reminder[];
  } catch (error) {
    return [];
  }
}

export type GroupMessagePayload = {
  key: string;
  subject: string;
  message: string;
  schoolId: string;
};

export async function sendGroupMessages(data: GroupMessagePayload) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schoolproject/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to send group messages");

    const groups = await response.json();
    return groups as MessageGroups;
  } catch (error) {
    return {
      parents: 0,
      students: 0,
      teachers: 0,
    };
  }
}