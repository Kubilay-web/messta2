// "use server";

// import { api } from "./schools";
// import axios from "axios";
// import {
//   BriefTeacher,
//   Parent,
//   Teacher,
//   TeacherCreateProps,
// } from "../types/types";

// import { revalidatePath } from "next/cache";

// export async function createTeacher(data: TeacherCreateProps) {
//   try {
//        const url = process.env.NEXT_PUBLIC_BASE_URL;
//     const response = await api.post(`${url}/api/schoolmanage/teachers`, data);
//     revalidatePath("/dashboard/users/teachers");
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function deleteParent(id: string) {
//   // console.log("deleted", id);
//   return {
//     ok: true,
//   };
// }

// export async function getAllTeachers(schoolId: string) {
//      const url = process.env.NEXT_PUBLIC_BASE_URL;
//   try {
//     const response = await api.get(`${url}/api/schoolmanage/teachers`);
//     const teachers = response.data;
//     return teachers as Teacher[];
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }
// export async function getTeachersWithBriefInfo(schoolId: string) {
//      const url = process.env.NEXT_PUBLIC_BASE_URL;
//   try {
//     const response = await api.get(`${url}/api/schoolmanage/teachers`);
//     const teachers = response.data;
//     return teachers as BriefTeacher[];
//   } catch (error) {
//     console.log(error);
//   }
// }




"use server";

import { BriefTeacher, Parent, Teacher, TeacherCreateProps } from "../types/types";
import { revalidatePath } from "next/cache";

type ApiResponse<T> = {
  data: T;
  error: string | null;
};

export async function createTeacher(data: TeacherCreateProps) {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${url}/api/schoolmanage/teachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const json: ApiResponse<Teacher> = await response.json();

    if (!response.ok) {
      throw new Error(json?.error || "Failed to create teacher");
    }

    revalidatePath("/dashboard/users/teachers");

    return json.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteParent(id: string) {
  return { ok: true };
}

export async function getAllTeachers(schoolId: string): Promise<Teacher[]> {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${url}/api/schoolmanage/teachers`, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch teachers");

    const json: ApiResponse<Teacher[]> = await response.json();

    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getTeachersWithBriefInfo(schoolId: string): Promise<BriefTeacher[]> {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${url}/api/schoolmanage/teachers`, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch teachers");

    const json: ApiResponse<BriefTeacher[]> = await response.json();

    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}