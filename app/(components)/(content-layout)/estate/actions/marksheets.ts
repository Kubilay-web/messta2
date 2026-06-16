// "use server";

// import {
//   MarkSheetStudent,
//   UpdateMarkSheetProps,
// } from "../types/types";
// import { revalidatePath } from "next/cache";
// import { StudentWithMarks } from "../components/dashboard/exams/StudentMarkSheet";

// export type SubjectMarkSheetDTO = {
//   examId: string;
//   classId: string;
//   subjectId: string;
//   termId: string;
// };

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// // ortak fetch helper
// async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(options?.headers || {}),
//     },
//     // gerekiyorsa:
//     // credentials: "include",
//   });

//   if (!res.ok) {
//     let message = "Request failed";
//     try {
//       const err = await res.json();
//       message = err?.message || message;
//     } catch {}
//     throw new Error(message);
//   }

//   return res.json();
// }

// export async function updateMarkSheetWithMarks(
//   data: UpdateMarkSheetProps
// ) {
//   try {
//     const result = await fetcher<MarkSheetStudent[]>(
//       `${BASE_URL}/api/schoolmanage/marksheets`,
//       {
//         method: "PUT",
//         body: JSON.stringify(data),
//       }
//     );

//     revalidatePath("/dashboard/academics/exams");

//     return result;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to update marks");
//   }
// }

// export async function getSubjectMarkSheet(data: SubjectMarkSheetDTO) {
//   try {
//     const result = await fetcher<{ data: StudentWithMarks[] }>(
//       `${BASE_URL}/api/schoolmanage/marksheets`
//     );

//     return result.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }



"use server";

import {
  MarkSheetStudent,
  UpdateMarkSheetProps,
} from "../types/types";
import { revalidatePath } from "next/cache";
import { StudentWithMarks } from "../components/dashboard/exams/StudentMarkSheet";

export type SubjectMarkSheetDTO = {
  examId: string;
  classId: string;
  subjectId: string;
  termId: string;
  schoolId?: string; // schoolId eklendi
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ortak fetch helper
async function fetcher<T>(
  url: string, 
  options?: RequestInit
): Promise<{ data: T; error: null } | { data: null; error: string }> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("API Error:", result);
      return { data: null, error: result?.error || result?.message || `Request failed with status ${res.status}` };
    }

    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: null, error: "Network error" };
  }
}

// ==================== MARKSHEET İŞLEMLERİ ====================

// 1. MARKSHEET GÜNCELLE (yeni notlar ekle)
export async function updateMarkSheetWithMarks(data: UpdateMarkSheetProps) {
  try {
    if (!data.markSheetId) {
      throw new Error("MarkSheet ID is required");
    }

    console.log("📝 Updating marksheet with data:", data);

    const result = await fetcher<MarkSheetStudent[]>(
      `${BASE_URL}/api/schoolmanage/marksheets?id=${data.markSheetId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/dashboard/exams");
    revalidatePath(`/dashboard/exams?mid=${data.markSheetId}`);

    return result.data;
  } catch (error: any) {
    console.error("❌ Update marksheet error:", error);
    throw new Error(error.message || "Failed to update marks");
  }
}

// 2. TEK BİR MARKSHEET GETİR (ID ile)
export async function getMarkSheetById(markSheetId: string) {
  try {
    if (!markSheetId) {
      console.error("MarkSheet ID is required");
      return null;
    }

    const result = await fetcher<any>(
      `${BASE_URL}/api/schoolmanage/marksheets?id=${markSheetId}`
    );

    if (result.error) {
      console.error("Get marksheet error:", result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Get marksheet error:", error);
    return null;
  }
}

// 3. DERS BAZINDA MARKSHEET GETİR
export async function getSubjectMarkSheet(data: SubjectMarkSheetDTO) {
  try {
    if (!data.examId || !data.classId || !data.subjectId || !data.termId) {
      console.error("Missing required parameters for subject marksheet");
      return [];
    }

    // Query parametrelerini oluştur
    const params = new URLSearchParams();
    params.append('examId', data.examId);
    params.append('classId', data.classId);
    params.append('subjectId', data.subjectId);
    params.append('termId', data.termId);
    if (data.schoolId) params.append('schoolId', data.schoolId);

    const url = `${BASE_URL}/api/schoolmanage/marksheets?${params.toString()}`;
    console.log("🔗 Fetching subject marksheet:", url);

    const result = await fetcher<StudentWithMarks[]>(url);

    if (result.error) {
      console.error("Get subject marksheet error:", result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Get subject marksheet error:", error);
    return [];
  }
}

// 4. TÜM MARKSHEET'LERİ LİSTELE (filtreli)
export async function getAllMarksheets(filters?: {
  examId?: string;
  classId?: string;
  subjectId?: string;
  termId?: string;
  schoolId?: string;
}) {
  try {
    const params = new URLSearchParams();
    if (filters?.examId) params.append('examId', filters.examId);
    if (filters?.classId) params.append('classId', filters.classId);
    if (filters?.subjectId) params.append('subjectId', filters.subjectId);
    if (filters?.termId) params.append('termId', filters.termId);
    if (filters?.schoolId) params.append('schoolId', filters.schoolId);

    const url = `${BASE_URL}/api/schoolmanage/marksheets?${params.toString()}`;
    
    const result = await fetcher<any[]>(url);

    if (result.error) {
      console.error("Get all marksheets error:", result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Get all marksheets error:", error);
    return [];
  }
}

// 5. MARKSHEET SİL
export async function deleteMarkSheet(markSheetId: string) {
  try {
    if (!markSheetId) {
      throw new Error("MarkSheet ID is required");
    }

    const result = await fetcher<{ message: string }>(
      `${BASE_URL}/api/schoolmanage/marksheets?id=${markSheetId}`,
      {
        method: "DELETE",
      }
    );

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/dashboard/exams");
    return result.data;
  } catch (error: any) {
    console.error("Delete marksheet error:", error);
    throw new Error(error.message || "Failed to delete marksheet");
  }
}

// 6. TEK BİR ÖĞRENCİ NOTUNU GÜNCELLE
export async function updateStudentMark(markId: string, data: {
  marks?: number;
  isAbsent?: boolean;
  comments?: string;
}) {
  try {
    if (!markId) {
      throw new Error("Mark ID is required");
    }

    const result = await fetcher<any>(
      `${BASE_URL}/api/schoolmanage/marksheets?markId=${markId}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/dashboard/exams");
    return result.data;
  } catch (error: any) {
    console.error("Update student mark error:", error);
    throw new Error(error.message || "Failed to update student mark");
  }
}