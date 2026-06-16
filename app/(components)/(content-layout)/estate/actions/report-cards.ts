"use server";

import { ClassData } from "../components/dashboard/academics/class-reports";
import { FetchReportData } from "../components/dashboard/academics/report-card-listing";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export async function getClassReportsData(data: FetchReportData) {
//   try {
//     const res = await fetch(
//       `${BASE_URL}/api/schoolmanage/reportcards`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         // gerekiyorsa:
//         // credentials: "include",
//       }
//     );

//     if (!res.ok) {
//       throw new Error(`Failed: ${res.status}`);
//     }

//     const resData = await res.json();

//     return resData as ClassData;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }



export async function getClassReportsData(data: FetchReportData) {
  try {
    const { classId, termId, examIds } = data;

    const params = new URLSearchParams({
      classId,
      termId,
      examIds: Array.isArray(examIds)
        ? examIds.join(",")
        : examIds || "",
    });

    const res = await fetch(
      `${BASE_URL}/api/schoolmanage/reportcards?${params.toString()}`
    );

    if (!res.ok) {
      throw new Error(`Failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
