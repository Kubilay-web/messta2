"use server";

import {
  DepartmentBrief,
  Exam,
  Period,
} from "../types/types";
import { IExamFormData } from "../components/dashboard/exams/ExamForm";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Helper
async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    let message = "Request failed";
    try {
      const err = await res.json();
      message = err?.error || err?.message || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}

// Exam oluştur
export async function createExam(data: IExamFormData) {
  try {
    if (!data.schoolId) {
      throw new Error("School ID is required");
    }

    const result = await fetcher<{ data: Exam; error: null }>(
      `${BASE_URL}/api/schoolmanage/exams`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    revalidatePath("/dashboard/exams");
    return result.data;
  } catch (error: any) {
    console.error("Create exam error:", error);
    throw new Error(error.message || "Failed to create exam");
  }
}

// Exam güncelle
export async function updateExam(id: string, data: Partial<IExamFormData>) {
  try {
    const result = await fetcher<{ data: Exam; error: null }>(
      `${BASE_URL}/api/schoolmanage/exams?id=${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );

    revalidatePath("/dashboard/exams");
    return result.data;
  } catch (error: any) {
    console.error("Update exam error:", error);
    throw new Error(error.message || "Failed to update exam");
  }
}

// Exam sil
export async function deleteExam(id: string) {
  try {
    const result = await fetcher<{ data: { message: string }; error: null }>(
      `${BASE_URL}/api/schoolmanage/exams?id=${id}`,
      {
        method: "DELETE",
      }
    );

    revalidatePath("/dashboard/exams");
    return result.data;
  } catch (error: any) {
    console.error("Delete exam error:", error);
    throw new Error(error.message || "Failed to delete exam");
  }
}

// Akademik yıla göre exam'leri getir
export async function getExamsByAcademicYear(schoolId: string, academicYear: string) {
  try {
    console.log(`Fetching exams for school: ${schoolId}, year: ${academicYear}`);
    
    const result = await fetcher<{ data: Exam[]; error: null }>(
      `${BASE_URL}/api/schoolmanage/exams?schoolId=${schoolId}&year=${academicYear}`
    );

    console.log("Exams result:", result);
    
    // result.data direkt array olarak döner
    return result.data || [];
  } catch (error) {
    console.error("Get exams by academic year error:", error);
    return []; // Hata durumunda boş array dön
  }
}

// Tek exam getir (id ile)
export async function getExamById(id: string) {
  try {
    const result = await fetcher<{ data: Exam; error: null }>(
      `${BASE_URL}/api/schoolmanage/exams?id=${id}`
    );

    return result.data;
  } catch (error) {
    console.error("Get exam by id error:", error);
    return null;
  }
}

// Tüm exam'leri getir (schoolId ile)
export async function getAllExams(schoolId: string) {
  try {
    const result = await fetcher<{ data: Exam[]; error: null }>(
      `${BASE_URL}/api/schoolmanage/exams?schoolId=${schoolId}`
    );

    return result.data || [];
  } catch (error) {
    console.error("Get all exams error:", error);
    return [];
  }
}

// Periodları getir
export async function getAllPeriods(schoolId: string) {
  try {
    const result = await fetcher<{ data: Period[]; error: null }>(
      `${BASE_URL}/api/schoolmanage/periods?schoolId=${schoolId}`
    );

    return result.data || [];
  } catch (error) {
    console.error("Get all periods error:", error);
    return [];
  }
}

// Departmentları getir
export async function getBriefDepartments(schoolId: string) {
  try {
    const result = await fetcher<{ data: DepartmentBrief[]; error: null }>(
      `${BASE_URL}/api/schoolmanage/departments?schoolId=${schoolId}&brief=true`
    );

    return result.data || [];
  } catch (error) {
    console.error("Get brief departments error:", error);
    return [];
  }
}