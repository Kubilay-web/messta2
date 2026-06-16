// "use server";

// import {
//   CreateSchoolFeePaymentInput,
//   Payment,
//   DepartmentBrief,
// } from "../types/types";
// import { revalidatePath } from "next/cache";

// export type PaymentResponse = {
//   data: string;
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

// export async function createPayment(data: CreateSchoolFeePaymentInput) {
//   try {
//     const result = await fetcher<PaymentResponse>(
//       `${BASE_URL}/api/schoolmanage/payments`,
//       {
//         method: "POST",
//         body: JSON.stringify(data),
//       }
//     );

//     revalidatePath("/dashboard/finance/payments");

//     return result;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to create Payment");
//   }
// }

// export async function getAllPayments(schoolId: string) {
//   try {
//     const result = await fetcher<{ data: Payment[] }>(
//       `${BASE_URL}/api/schoolmanage/payments`
//     );

//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getBriefDepartments(schoolId: string) {
//   try {
//     const result = await fetcher<DepartmentBrief[]>(
//       `${BASE_URL}/api/schoolmanage/payments`
//     );

//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// }






"use server";

import {
  CreateSchoolFeePaymentInput,
  Payment,
  DepartmentBrief,
} from "../types/types";
import { revalidatePath } from "next/cache";

export type PaymentResponse = {
  prn: string;
  id: string;
  status: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ortak fetch helper
async function fetcher<T>(url: string, options?: RequestInit): Promise<{ data: T; error: null } | { data: null; error: string }> {
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
      console.error("API Error Response:", { status: res.status, result });
      return { data: null, error: result?.error || result?.message || `Request failed with status ${res.status}` };
    }

    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: null, error: "Network error" };
  }
}

export async function createPayment(data: CreateSchoolFeePaymentInput) {
  try {
    // Gerekli alanları kontrol et
    if (!data.schoolId || !data.studentProfileId || !data.parentProfileId) {
      throw new Error("Missing required fields: schoolId, studentProfileId, parentProfileId");
    }

    const result = await fetcher<PaymentResponse>(
      `${BASE_URL}/api/schoolmanage/payments`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/dashboard/finance/payments");
    return result.data;
  } catch (error: any) {
    console.error("Create payment error:", error);
    throw new Error(error.message || "Failed to create Payment");
  }
}

export async function getAllPayments(schoolId: string) {
  try {
    // School ID kontrolü
    if (!schoolId) {
      console.error("School ID is required");
      return [];
    }

    console.log("Fetching payments for school:", schoolId);
    
    // schoolId'yi query parametresi olarak ekle
    const result = await fetcher<Payment[]>(
      `${BASE_URL}/api/schoolmanage/payments?schoolId=${schoolId}`
    );

    console.log("getAllPayments result:", result);

    if (result.error) {
      console.error("Get payments error:", result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Get all payments error:", error);
    return [];
  }
}

export async function getPaymentsByYear(
  schoolId: string, 
  year: number, 
  term?: string,
  status?: string
) {
  try {
    if (!schoolId) {
      console.error("School ID is required");
      return [];
    }

    let url = `${BASE_URL}/api/schoolmanage/payments?schoolId=${schoolId}&year=${year}`;
    
    if (term) {
      url += `&term=${term}`;
    }
    
    if (status) {
      url += `&status=${status}`;
    }

    const result = await fetcher<Payment[]>(url);

    if (result.error) {
      console.error("Get payments by year error:", result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Get payments by year error:", error);
    return [];
  }
}

export async function getPaymentsByStudent(studentUserId: string) {
  try {
    if (!studentUserId) {
      console.error("Student user ID is required");
      return [];
    }

    const result = await fetcher<Payment[]>(
      `${BASE_URL}/api/schoolmanage/payments?studentId=${studentUserId}`
    );

    if (result.error) {
      console.error("Get payments by student error:", result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Get payments by student error:", error);
    return [];
  }
}

export async function getPaymentById(id: string) {
  try {
    if (!id) {
      console.error("Payment ID is required");
      return null;
    }

    const result = await fetcher<Payment>(
      `${BASE_URL}/api/schoolmanage/payments?id=${id}&type=detail`
    );

    if (result.error) {
      console.error("Get payment by id error:", result.error);
      return null;
    }

    return result.data || null;
  } catch (error) {
    console.error("Get payment by id error:", error);
    return null;
  }
}

export async function updatePaymentStatus(id: string, status: "PENDING" | "APPROVED" | "FAILED") {
  try {
    if (!id) {
      throw new Error("Payment ID is required");
    }

    const result = await fetcher<Payment>(
      `${BASE_URL}/api/schoolmanage/payments?id=${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ paymentStatus: status }),
      }
    );

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/dashboard/finance/payments");
    return result.data;
  } catch (error: any) {
    console.error("Update payment status error:", error);
    throw new Error(error.message || "Failed to update payment status");
  }
}

export async function deletePayment(id: string) {
  try {
    if (!id) {
      throw new Error("Payment ID is required");
    }

    const result = await fetcher<{ message: string }>(
      `${BASE_URL}/api/schoolmanage/payments?id=${id}`,
      {
        method: "DELETE",
      }
    );

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/dashboard/finance/payments");
    return result.data;
  } catch (error: any) {
    console.error("Delete payment error:", error);
    throw new Error(error.message || "Failed to delete payment");
  }
}

// getBriefDepartments - Bu fonksiyon yanlış endpoint kullanıyor, düzeltildi
export async function getBriefDepartments(schoolId: string) {
  try {
    if (!schoolId) {
      console.error("School ID is required");
      return [];
    }

    const result = await fetcher<DepartmentBrief[]>(
      `${BASE_URL}/api/schoolmanage/departments?schoolId=${schoolId}&brief=true`
    );

    if (result.error) {
      console.error("Get brief departments error:", result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Get brief departments error:", error);
    return [];
  }
}