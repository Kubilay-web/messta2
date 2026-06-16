// "use server";

// import { revalidatePath } from "next/cache";
// import { SchoolFeeProps } from "../components/dashboard/forms/finance/schoo-fee-form";

// export type SchoolFeeDTO = {
//   id: string;
//   term: string;
//   title: string;
//   className: string;
//   fees: number;
//   year: string;
// };

// export type Fee = {
//   title: string;
//   amount: number;
//   schoolFeeId: string;
//   id: string;
//   feeStatus: "PAID" | "NOT_PAID";
//   paymentDate: string | null;
// };

// export type SchoolFeeData = {
//   id: string;
//   term: string;
//   title: string;
//   className: string;
//   fees: Fee[];
//   feeTotal: number;
//   year: string;
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

// export async function createSchoolFees(data: SchoolFeeProps) {
//   try {
//     const result = await fetcher(
//       `${BASE_URL}/api/schoolmanage/schoolfees`,
//       {
//         method: "POST",
//         body: JSON.stringify(data),
//       }
//     );

//     revalidatePath("/dashboard/finance/fees");

//     return result;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to create Fees");
//   }
// }

// export async function getFeesForCurrentYear(schoolId: string) {
//   try {
//     const result = await fetcher<{ data: SchoolFeeDTO[] }>(
//       `${BASE_URL}/api/schoolmanage/schoolfees`
//     );

//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getFeesByClass(
//   schoolId: string,
//   className: string,
//   term: string
// ) {
//   try {
//     const result = await fetcher<{ data: SchoolFeeData[] }>(
//       `${BASE_URL}/api/schoolmanage/schoolfees`
//     );

//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }





"use server";

import { revalidatePath } from "next/cache";
import { SchoolFeeProps } from "../components/dashboard/forms/finance/schoo-fee-form";

export type SchoolFeeDTO = {
  id: string;
  term: string;
  title: string;
  className: string;
  fees: number;
  year: string;
  totalFees: number;
};

export type Fee = {
  title: string;
  amount: number;
  schoolFeeId: string;
  id: string;
  feeStatus: "PAID" | "NOT_PAID";
  paymentDate: string | null;
};

export type SchoolFeeData = {
  id: string;
  term: string;
  title: string;
  className: string;
  fees: Fee[];
  feeTotal: number;
  year: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ortak fetch helper
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

export async function createSchoolFees(data: SchoolFeeProps) {
  try {
    const result = await fetcher<{ data: SchoolFeeProps; error: null }>(
      `${BASE_URL}/api/schoolmanage/schoolfees`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    revalidatePath("/dashboard/finance/fees");
    return result.data;
  } catch (error: any) {
    console.error("Create school fees error:", error);
    throw new Error(error.message || "Failed to create Fees");
  }
}

export async function getFeesForCurrentYear(schoolId: string) {
  try {
    // School ID kontrolü
    if (!schoolId) {
      console.error("School ID is required");
      return [];
    }

    console.log("Fetching fees for school:", schoolId);
    
    // schoolId'yi query parametresi olarak ekle
    const result = await fetcher<{ data: SchoolFeeDTO[]; error: null }>(
      `${BASE_URL}/api/schoolmanage/schoolfees?schoolId=${schoolId}`
    );

    console.log("getFeesForCurrentYear result:", result);

    return result.data || [];
  } catch (error) {
    console.error("Get fees for current year error:", error);
    return [];
  }
}

// export async function getFeesByClass(
//   schoolId: string,
//   className: string,
//   term: string
// ) {
//   try {
//     if (!schoolId || !className || !term) {
//       console.error("Missing required parameters");
//       return [];
//     }

//     const result = await fetcher<{ data: SchoolFeeData[]; error: null }>(
//       `${BASE_URL}/api/schoolmanage/schoolfees?schoolId=${schoolId}&className=${className}&term=${term}&type=by-class`
//     );

//     return result.data || [];
//   } catch (error) {
//     console.error("Get fees by class error:", error);
//     return [];
//   }
// }


export async function getFeesByClass(
  schoolId: string,
  className: string,
  term: string
) {
  try {
    if (!schoolId || !className || !term) {
      console.error("Missing required parameters:", { schoolId, className, term });
      return [];
    }

    console.log("Calling getFeesByClass with:", { schoolId, className, term });

    const url = `${BASE_URL}/api/schoolmanage/schoolfees?schoolId=${schoolId}&className=${encodeURIComponent(className)}&term=${encodeURIComponent(term)}&type=by-class`;
    
    console.log("Fetching URL:", url);

    const result = await fetcher<{ data: SchoolFeeData[]; error: null }>(url);

    console.log("getFeesByClass raw result:", JSON.stringify(result, null, 2));

    if (result.error) {
      console.error("Get fees by class error:", result.error);
      return [];
    }

    console.log("getFeesByClass data:", result.data);
    return result.data || [];
  } catch (error) {
    console.error("Get fees by class error:", error);
    return [];
  }
}

export async function getFeeById(id: string) {
  try {
    if (!id) {
      console.error("Fee ID is required");
      return null;
    }

    const result = await fetcher<{ data: SchoolFeeData; error: null }>(
      `${BASE_URL}/api/schoolmanage/schoolfees?id=${id}&type=detail`
    );

    return result.data || null;
  } catch (error) {
    console.error("Get fee by id error:", error);
    return null;
  }
}

export async function updateSchoolFee(id: string, data: Partial<SchoolFeeProps>) {
  try {
    if (!id) {
      throw new Error("Fee ID is required");
    }

    const result = await fetcher<{ data: SchoolFeeProps; error: null }>(
      `${BASE_URL}/api/schoolmanage/schoolfees?id=${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );

    revalidatePath("/dashboard/finance/fees");
    return result.data;
  } catch (error: any) {
    console.error("Update school fee error:", error);
    throw new Error(error.message || "Failed to update school fee");
  }
}

export async function deleteSchoolFee(id: string) {
  try {
    if (!id) {
      throw new Error("Fee ID is required");
    }

    const result = await fetcher<{ data: { message: string }; error: null }>(
      `${BASE_URL}/api/schoolmanage/schoolfees?id=${id}`,
      {
        method: "DELETE",
      }
    );

    revalidatePath("/dashboard/finance/fees");
    return result.data;
  } catch (error: any) {
    console.error("Delete school fee error:", error);
    throw new Error(error.message || "Failed to delete school fee");
  }
}