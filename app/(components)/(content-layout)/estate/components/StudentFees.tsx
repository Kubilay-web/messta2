// "use client";
// // import { BriefStudent } from "../components/portal/parents/StudentList";
// // import { Button } from "../components/ui/button";
// import { Eye, Loader2 } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// // import { Progress } from "../components/ui/progress";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// // import { ScrollArea } from "../components/ui/scroll-area";
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetHeader,
// //   SheetTitle,
// // } from "../components/ui/sheet";
// // import { Book, Pencil, Plus, Trash2, Users } from "lucide-react";
// // import Image from "next/image";
// import React, { useState } from "react";
// import { Fee, getFeesByClass, SchoolFeeData } from "../actions/school-fees";
// // import { useStore } from "zustand";
// // import useSchoolStore from "../store/school";
// import { Period } from "../types/types";
// import Select from "react-tailwindcss-select";
// import { getNormalDate } from "../lib/getNormalDate";
// import { PaymentModal } from "./dashboard/forms/finance/payment-modal";
// // import { PaymentModal } from "./payment-modal";
// export type Data = {
//   studentProfileId: string;
//   studentUserId: string;
//   studentName: string;
//   parentProfileId: string;
//   parentUserId: string;
//   parentName: string;
// };
// export default function StudentFees({
//   terms,
//   classTitle,
//   data,
//   schoolId
// }: {
//   terms: Period[];
//   classTitle: string;
//   data: Data;
//   schoolId:string;
// }) {
//   const [fees, setFees] = useState<Fee[]>([]);
//   const [totalFees, setTotalFees] = useState<SchoolFeeData[]>([]);
//   const [schoolFeeData, setSchoolFeeData] = useState<SchoolFeeData | null>(
//     null
//   );
//   console.log("schoolFee Data=> ", schoolFeeData);



//   const termOptions = terms.map((term) => {
//     return {
//       label: `Term ${term.term}-${term.year}`,
//       value: term.id,
//     };
//   });
//   const [selectedTerm, setSelectedTerm] = useState<any>(termOptions[0]);
//   const [loadingFees, setLoadingFees] = useState(false);
//   async function handleTermChange(term: any) {
//     console.log("Fxn fired");
//     console.log(term);
//     setFees([]);
//     setLoadingFees(true);
//     setSelectedTerm(term);
//     const result =
//       (await getFeesByClass(schoolId ?? "", classTitle, term.label)) || [];
//     setTotalFees(result);
//     const schoolFee = result.find((item) => item.term === term.label);
//     if (!schoolFee) {
//       setLoadingFees(false);
//       setSchoolFeeData(null);
//       setFees([]);
//       return;
//     }
//     setSchoolFeeData(schoolFee);
//     setFees(schoolFee.fees);
//     setLoadingFees(false);
//   }
//   const totalAmount = fees.reduce((acc, item) => acc + item.amount, 0);
//   const paidAmount = fees.reduce(
//     (acc, item) => (item.feeStatus === "PAID" ? acc + item.amount : acc),
//     0
//   );
//   const balanceAmount = totalAmount - paidAmount;
//   const details = {
//     periodId: selectedTerm.value ?? ("" as string),
//     ...data,
//     schoolFeeTitle: schoolFeeData?.title ?? "",
//     term: selectedTerm.label ?? "",
//     year: Number(schoolFeeData?.year) ?? new Date().getFullYear(),
//     className: classTitle ?? "",
//   };
//   return (
//     <Card className="border-blue-100">
//       <CardHeader className="border-b border-blue-50">
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-semibold">
//             Student Payments {new Date().getFullYear()}
//           </h1>
//           <div className="flex items-center gap-6">
//             <Select
//               value={selectedTerm}
//               onChange={handleTermChange}
//               options={termOptions}
//               primaryColor={"blue"}
//               placeholder="Select Term"
//             />
//             {balanceAmount > 0 && (
//               <PaymentModal
//                 fees={fees.filter((item) => item.feeStatus !== "PAID")}
//                 selectedTerm={selectedTerm}
//                 details={details}
//               />
//             )}
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="px-6 py-2">
//         <div className="container mx-auto px-6 max-w-5xl">
//           <div className="py-2">
//             <Card className="w-full max-w-2xl">
//               <CardHeader>
//                 <CardTitle className="text-xl font-semibold text-gray-900">
//                   {fees.length > 0
//                     ? ` Fees for ${selectedTerm.label}`
//                     : "Select the Term to see the fees"}
//                 </CardTitle>
//               </CardHeader>
//               {loadingFees ? (
//                 <CardContent>
//                   <h2 className="flex items-center">
//                     <Loader2 className="w-4 h-4 animate-spin mr-2" />
//                     Loading Fees please wait...
//                   </h2>
//                 </CardContent>
//               ) : (
//                 <CardContent>
//                   {fees.length > 0 ? (
//                     <>
//                       <div className="overflow-hidden border border-gray-200 rounded-lg">
//                         <table className="min-w-full divide-y divide-gray-200">
//                           <thead className="bg-gray-50">
//                             <tr>
//                               <th
//                                 scope="col"
//                                 className="px-6 py-3 text-left text-sm font-medium text-gray-500"
//                               >
//                                 Fee Title
//                               </th>
//                               <th
//                                 scope="col"
//                                 className="px-6 py-3 text-right text-sm font-medium text-gray-500"
//                               >
//                                 Amount
//                               </th>
//                               <th
//                                 scope="col"
//                                 className="px-6 py-3 text-center text-sm font-medium text-gray-500"
//                               >
//                                 Payment Status
//                               </th>
//                               <th
//                                 scope="col"
//                                 className="px-6 py-3 text-center text-sm font-medium text-gray-500"
//                               >
//                                 Payment Date
//                               </th>
//                             </tr>
//                           </thead>

//                           <tbody className="bg-white divide-y divide-gray-200">
//                             {fees.map((fee, index) => (
//                               <tr key={index}>
//                                 <td className="px-6 py-4 text-sm text-gray-900">
//                                   {fee.title}
//                                 </td>
//                                 <td className="px-6 py-4 text-sm text-gray-900 text-right">
//                                   ${fee.amount.toFixed(2)}
//                                 </td>
//                                 <td className="px-6 py-4 text-sm text-center">
//                                   <span
//                                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                                       fee.feeStatus === "PAID"
//                                         ? "bg-green-100 text-green-800"
//                                         : "bg-red-100 text-red-800"
//                                     }`}
//                                   >
//                                     {fee.feeStatus}
//                                   </span>
//                                 </td>
//                                 <td className="px-6 py-4 text-sm text-gray-900 text-center">
//                                   {fee.feeStatus === "PAID" && fee.paymentDate
//                                     ? getNormalDate(fee.paymentDate)
//                                     : "-"}
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>

//                       <div className="mt-4 flex justify-end space-x-4">
//                         <div className="bg-gray-50 px-6 py-3 rounded-lg">
//                           <p className="text-sm font-medium text-gray-500">
//                             Total Amount
//                           </p>
//                           <p className="text-2xl font-semibold text-gray-900">
//                             ${totalAmount.toFixed(2)}
//                           </p>
//                         </div>
//                         <div className="bg-gray-50 px-6 py-3 rounded-lg">
//                           <p className="text-sm font-medium text-gray-500">
//                             Paid Amount
//                           </p>
//                           <p className="text-2xl font-semibold text-green-600">
//                             ${paidAmount.toFixed(2)}
//                           </p>
//                         </div>
//                         <div className="bg-gray-50 px-6 py-3 rounded-lg">
//                           <p className="text-sm font-medium text-gray-500">
//                             Balance Amount
//                           </p>
//                           <p className="text-2xl font-semibold text-red-600">
//                             ${balanceAmount.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="">
//                       <h2>No Fees Data </h2>
//                     </div>
//                   )}
//                 </CardContent>
//               )}
//             </Card>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }













"use client";
// import { BriefStudent } from "../components/portal/parents/StudentList";
// import { Button } from "../components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { Progress } from "../components/ui/progress";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// import { ScrollArea } from "../components/ui/scroll-area";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "../components/ui/sheet";
// import { Book, Pencil, Plus, Trash2, Users } from "lucide-react";
// import Image from "next/image";
import React, { useState } from "react";
import { Fee, getFeesByClass, SchoolFeeData } from "../actions/school-fees";
// import { useStore } from "zustand";
// import useSchoolStore from "../store/school";
import { Period } from "../types/types";
import Select from "react-tailwindcss-select";
import { getNormalDate } from "../lib/getNormalDate";
import { PaymentModal } from "./dashboard/forms/finance/payment-modal";
// import { PaymentModal } from "./payment-modal";
export type Data = {
  studentProfileId: string;
  studentUserId: string;
  studentName: string;
  parentProfileId: string;
  parentUserId: string;
  parentName: string;
};
export default function StudentFees({
  terms,
  classTitle,
  data,
  schoolId
}: {
  terms: Period[];
  classTitle: string;
  data: Data;
  schoolId:string;
}) {
  const [fees, setFees] = useState<Fee[]>([]);
  const [totalFees, setTotalFees] = useState<SchoolFeeData[]>([]);
  const [schoolFeeData, setSchoolFeeData] = useState<SchoolFeeData | null>(
    null
  );
  console.log("schoolFee Data=> ", schoolFeeData);



  const termOptions = terms.map((term) => {
    return {
      label: `Term ${term.term}-${term.year}`,
      value: term.id,
    };
  });
  const [selectedTerm, setSelectedTerm] = useState<any>(termOptions[0]);
  const [loadingFees, setLoadingFees] = useState(false);
  async function handleTermChange(term: any) {
    console.log("Fxn fired");
    console.log(term);
    setFees([]);
    setLoadingFees(true);
    setSelectedTerm(term);
    const result =
      (await getFeesByClass(schoolId ?? "", classTitle, term.label)) || [];
    setTotalFees(result);
    const schoolFee = result.find((item) => item.term === term.label);
    if (!schoolFee) {
      setLoadingFees(false);
      setSchoolFeeData(null);
      setFees([]);
      return;
    }
    setSchoolFeeData(schoolFee);
    setFees(schoolFee.fees);
    setLoadingFees(false);
  }
  const totalAmount = fees.reduce((acc, item) => acc + item.amount, 0);
  const paidAmount = fees.reduce(
    (acc, item) => (item.feeStatus === "PAID" ? acc + item.amount : acc),
    0
  );
  const balanceAmount = totalAmount - paidAmount;
  const details = {
    periodId: selectedTerm.value ?? ("" as string),
    ...data,
    schoolFeeTitle: schoolFeeData?.title ?? "",
    term: selectedTerm.label ?? "",
    year: Number(schoolFeeData?.year) ?? new Date().getFullYear(),
    className: classTitle ?? "",
  };
  return (
    <Card className="border-blue-100">
  <CardHeader className="border-b border-blue-50">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 className="text-xl md:text-2xl font-semibold">
        Student Payments {new Date().getFullYear()}
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="w-full sm:w-60">
          <Select
            value={selectedTerm}
            onChange={handleTermChange}
            options={termOptions}
            primaryColor={"blue"}
            placeholder="Select Term"
          />
        </div>

        {balanceAmount > 0 && (
          <PaymentModal
            fees={fees.filter((item) => item.feeStatus !== "PAID")}
            selectedTerm={selectedTerm}
            details={details}
          />
        )}
      </div>
    </div>
  </CardHeader>

  <CardContent className="px-3 md:px-6 py-2">
    <div className="container mx-auto max-w-5xl">
      <div className="py-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
              {fees.length > 0
                ? `Fees for ${selectedTerm.label}`
                : "Select the Term to see the fees"}
            </CardTitle>
          </CardHeader>

          {loadingFees ? (
            <CardContent>
              <h2 className="flex items-center text-sm md:text-base">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Loading Fees please wait...
              </h2>
            </CardContent>
          ) : (
            <CardContent>
              {fees.length > 0 ? (
                <>
                  {/* TABLE */}
                  <div className="w-full overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-[600px] w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500">
                            Fee Title
                          </th>
                          <th className="px-4 md:px-6 py-3 text-right text-xs md:text-sm font-medium text-gray-500">
                            Amount
                          </th>
                          <th className="px-4 md:px-6 py-3 text-center text-xs md:text-sm font-medium text-gray-500">
                            Status
                          </th>
                          <th className="px-4 md:px-6 py-3 text-center text-xs md:text-sm font-medium text-gray-500">
                            Date
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200">
                        {fees.map((fee, index) => (
                          <tr key={index}>
                            <td className="px-4 md:px-6 py-3 text-sm text-gray-900">
                              {fee.title}
                            </td>
                            <td className="px-4 md:px-6 py-3 text-sm text-gray-900 text-right">
                              ${fee.amount.toFixed(2)}
                            </td>
                            <td className="px-4 md:px-6 py-3 text-sm text-center">
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                  fee.feeStatus === "PAID"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {fee.feeStatus}
                              </span>
                            </td>
                            <td className="px-4 md:px-6 py-3 text-sm text-center">
                              {fee.feeStatus === "PAID" && fee.paymentDate
                                ? getNormalDate(fee.paymentDate)
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* SUMMARY */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-xl md:text-2xl font-semibold">
                        ${totalAmount.toFixed(2)}
                      </p>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <p className="text-sm text-gray-500">Paid</p>
                      <p className="text-xl md:text-2xl font-semibold text-green-600">
                        ${paidAmount.toFixed(2)}
                      </p>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <p className="text-sm text-gray-500">Balance</p>
                      <p className="text-xl md:text-2xl font-semibold text-red-600">
                        ${balanceAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No Fees Data
                </div>
              )}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  </CardContent>
</Card>
  );
}
