// "use client";
// import { BriefStudent } from "../../../../components/portal/parents/StudentList";
// import { Button } from "../../../../components/ui/button";
// import { Eye, Loader2 } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../../../../components/ui/card";
// import { Progress } from "../../../../components/ui/progress";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../../../../components/ui/tabs";
// import { ScrollArea } from "../../../../components/ui/scroll-area";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "../../../../components/ui/sheet";
// import { Book, Pencil, Plus, Trash2, Users } from "lucide-react";
// import Image from "next/image";
// import React, { useState } from "react";
// import {
//   Fee,
//   getFeesByClass,
//   SchoolFeeData,
// } from "../../../../actions/school-fees";
// import { useStore } from "zustand";
// import useSchoolStore from "../../../../store/school";
// import { Period } from "../../../../types/types";
// import Select from "react-tailwindcss-select";
// import { PaymentModal } from "./payment-modal";

// export default function PaymentListing({
//   students,
//   terms,
//   parentData,
//   schoolId,
//   schoolName
// }: {
//   students: BriefStudent[];
//   terms: Period[];
//   parentData: {
//     parentProfileId: string;
//     parentUserId: string;
//     parentName: string;
//   };
//   schoolId: string;
// }) {
//   // console.log(terms);
//   const [selectedStudent, setSelectedStudent] = useState<BriefStudent | null>(
//     null,
//   );

//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [fees, setFees] = useState<Fee[]>([]);
//   const [totalFees, setTotalFees] = useState<SchoolFeeData[]>([]);
//   const termOptions = terms.map((term) => {
//     return {
//       label: `Term ${term.term}-${term.year}`,
//       value: term.id,
//     };
//   });
//   const [selectedTerm, setSelectedTerm] = useState<any>(termOptions[0]);
//   const [schoolFeeData, setSchoolFeeData] = useState<SchoolFeeData | null>(
//     null,
//   );
//   const [loadingFees, setLoadingFees] = useState(false);
//   const details = {
//     periodId: selectedTerm.value ?? ("" as string),
//     studentProfileId: selectedStudent?.id ?? "",
//     studentUserId: selectedStudent?.regNo ?? "",
//     studentName: selectedStudent?.name ?? "",
//     ...parentData,
//     schoolFeeTitle: schoolFeeData?.title ?? "",
//     term: selectedTerm.label ?? "",
//     year: Number(schoolFeeData?.year) ?? new Date().getFullYear(),
//     className: selectedStudent?.classTitle ?? "",
//     schoolId: schoolId,
//   };
//   async function handleSelectStudent(student: BriefStudent) {
//     setSelectedStudent(student);
//     setLoadingFees(true);
//     // console.log(student.classTitle);
//     try {
//       const result =
//         (await getFeesByClass(
//           schoolId ?? "",
//           student.classTitle,
//           selectedTerm.label,
//         )) || [];
//       setTotalFees(result);
//       const schoolFee = result.find((item) => item.term === selectedTerm.label);
//       if (!schoolFee) return;
//       setSchoolFeeData(schoolFee);
//       if (!schoolFee) return;
//       setFees(schoolFee.fees);
//       setLoadingFees(false);
//     } catch (error) {
//       setLoadingFees(false);
//       console.log(error);
//     }
//   }

//   function handleTermChange(term: any) {
//     setLoadingFees(true);
//     setSelectedTerm(term);
//     const schoolFee = totalFees.find((item) => item.term === term.label);
//     if (!schoolFee) return;
//     setFees(schoolFee.fees);
//     setLoadingFees(false);
//   }
//   console.log(fees);
//   return (
//     <div className="flex h-screen bg-background">
//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex w-80 flex-col border-r">
//         <div className="pb-1 border-b flex justify-between items-center px-3 py-2">
//           <div className="flex items-center gap-2 ">
//             <Users className="h-6 w-6" />
//             <h2 className="text-xl font-semibold">My Children</h2>
//           </div>
//           {/* <SubjectForm departments={departments} /> */}
//         </div>
//         {students.length > 0 ? (
//           <ScrollArea className="flex-1">
//             {students.map((student) => (
//               <div
//                 key={student.id}
//                 className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
//                   student.id === student.id ? "bg-muted" : ""
//                 }`}
//                 onClick={() => handleSelectStudent(student)}
//               >
//                 <div className="flex items-center gap-1">
//                   <Image
//                     src={student.imageUrl}
//                     alt={student.name}
//                     width={512}
//                     height={512}
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div className="">
//                     <h2 className="font-medium capitalize">{student.name}</h2>
//                     <p className="text-xs text-muted-foreground">
//                       {student.classTitle}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </ScrollArea>
//         ) : (
//           <div className="p-4">
//             <h2>No subjects</h2>
//           </div>
//         )}
//       </div>

//       {/* Mobile Sidebar */}
//       <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
//         <SheetContent side="left" className="w-80">
//           <SheetHeader className="flex justify-between items-center">
//             <SheetTitle>Subjects</SheetTitle>
//             <Button variant="ghost" size="icon" title="Add Subject">
//               <Plus className="h-4 w-4" />
//             </Button>
//           </SheetHeader>
//           {students.length > 0 ? (
//             <ScrollArea className="flex-1 mt-4">
//               {students.map((student, i) => (
//                 <div
//                   key={i}
//                   className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
//                     student?.id === student?.id ? "bg-muted" : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedStudent(student);
//                     setIsMobileOpen(false);
//                   }}
//                 >
//                   <span className="font-medium">{student?.name}</span>
//                   <div className="flex gap-2">
//                     <Button variant="ghost" size="icon">
//                       <Pencil className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="icon">
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </ScrollArea>
//           ) : (
//             <div className="p-4">
//               <h2>No subjects</h2>
//             </div>
//           )}
//         </SheetContent>
//       </Sheet>

//       {/* Main Content */}
//       {students.length > 0 && selectedStudent ? (
//         <div className="flex-1 flex flex-col h-full overflow-hidden p-8">
//           <h2>{selectedStudent.name}</h2>
//           <div className="py-8">
//             <div className="container mx-auto p-6 max-w-5xl">
//               <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-semibold">
//                   Payments {new Date().getFullYear()}
//                 </h1>
//                 <div className="">
//                   <Select
//                     value={selectedTerm}
//                     onChange={handleTermChange}
//                     options={termOptions}
//                     primaryColor={"blue"}
//                   />
//                 </div>

//                 <PaymentModal
//                   fees={fees}
//                   selectedTerm={selectedTerm}
//                   details={details}
//                   schoolId={schoolId}
//                   schoolName={schoolName}
//                 />
//               </div>

//               <Tabs defaultValue="pending" className="w-full">
//                 <TabsList className="w-full bg-gray-50 p-0 h-12">
//                   <TabsTrigger
//                     value="pending"
//                     className="w-1/2 data-[state=active]:bg-white rounded-none"
//                   >
//                     Pending Payments
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="payments"
//                     className="w-1/2 data-[state=active]:bg-white rounded-none"
//                   >
//                     Payments
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="pending" className="mt-6">
//                   <Card className="w-full max-w-2xl">
//                     <CardHeader>
//                       <CardTitle className="text-xl font-semibold text-gray-900">
//                         Pending Fees for {selectedTerm.label}
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
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
//                             </tr>
//                           </thead>

//                           {fees && fees.length > 0 ? (
//                             <tbody className="bg-white divide-y divide-gray-200">
//                               {fees.map((fee, index) => (
//                                 <tr key={index}>
//                                   <td className="px-6 py-4 text-sm text-gray-900">
//                                     {fee.title}
//                                   </td>
//                                   <td className="px-6 py-4 text-sm text-gray-900 text-right">
//                                     ${fee.amount.toFixed(2)}
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           ) : (
//                             <div className="p-8">
//                               {loadingFees && (
//                                 <div className="p-8">
//                                   <h2 className="flex items-center">
//                                     <Loader2 className="w-4 h-4 animate-spin mr-2" />
//                                     Loading Fees please wait...
//                                   </h2>
//                                 </div>
//                               )}
//                               {!loadingFees && <h2>No Pending Payments</h2>}
//                             </div>
//                           )}
//                         </table>
//                       </div>

//                       <div className="mt-4 flex justify-end">
//                         <div className="bg-gray-50 px-6 py-3 rounded-lg">
//                           <p className="text-sm font-medium text-gray-500">
//                             Total Amount
//                           </p>
//                           {fees && fees.length > 0 && (
//                             <p className="text-2xl font-semibold text-gray-900">
//                               $
//                               {fees
//                                 .reduce((acc, item) => acc + item.amount, 0)
//                                 .toFixed(2)}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//                 <TabsContent value="payments" className="mt-6">
//                   <Card>
//                     <CardContent className="p-6">
//                       <div className="flex justify-between items-start mb-6">
//                         <div className="space-y-1">
//                           <h2 className="text-lg font-semibold">#7125087</h2>
//                           <p className="text-sm text-muted-foreground">
//                             Due: 1/12/2025
//                           </p>
//                         </div>
//                         <h3 className="text-xl mb-4">First Installment</h3>
//                         <div className="flex items-center gap-4">
//                           <span className="text-lg font-medium">UGX290.0k</span>
//                           <Button variant="outline" size="sm">
//                             <Eye className="h-4 w-4 mr-2" />
//                             View
//                           </Button>
//                         </div>
//                       </div>

//                       <div className="space-y-4">
//                         <div className="flex justify-between items-center text-sm">
//                           <span>Payment Progress(19%)</span>
//                           <span>UGX290.0k / UGX1.5M</span>
//                         </div>
//                         <Progress value={19} className="h-2" />
//                         <div className="flex justify-between items-center text-sm">
//                           <span>Paid: UGX290.0k</span>
//                           <span>Remaining: UGX1.2M</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="p-8">
//           <h2>Select the Student to see Payments</h2>
//         </div>
//       )}
//     </div>
//   );
// }








"use client";
import { BriefStudent } from "../../../../components/portal/parents/StudentList";
import { Button } from "../../../../components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../../components/ui/sheet";
import { Book, Pencil, Plus, Trash2, Users } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Fee,
  getFeesByClass,
  SchoolFeeData,
} from "../../../../actions/school-fees";
import { useStore } from "zustand";
import useSchoolStore from "../../../../store/school";
import { Period } from "../../../../types/types";
import Select from "react-tailwindcss-select";
import { PaymentModal } from "./payment-modal";

export default function PaymentListing({
  students,
  terms,
  parentData,
  schoolId,
  schoolName
}: {
  students: BriefStudent[];
  terms: Period[];
  parentData: {
    parentProfileId: string;
    parentUserId: string;
    parentName: string;
  };
  schoolId: string;
  schoolName?: string;
}) {
  const [selectedStudent, setSelectedStudent] = useState<BriefStudent | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [fees, setFees] = useState<Fee[]>([]);
  const [pendingFees, setPendingFees] = useState<Fee[]>([]); // 🔴 Sadece ödenmemiş fee'ler
  const [paidFees, setPaidFees] = useState<Fee[]>([]); // 🔴 Ödenmiş fee'ler
  const [totalFees, setTotalFees] = useState<SchoolFeeData[]>([]);

  const termOptions = terms.map((term) => ({
    label: `Term ${term.term}-${term.year}`,
    value: term.id,
  }));

  const [selectedTerm, setSelectedTerm] = useState<any>(termOptions[0]);
  const [schoolFeeData, setSchoolFeeData] = useState<SchoolFeeData | null>(null);
  const [loadingFees, setLoadingFees] = useState(false);

  // 🔴 Fee'leri filtrele
  useEffect(() => {
    if (fees.length > 0) {
      const pending = fees.filter(fee => fee.feeStatus !== "PAID");
      const paid = fees.filter(fee => fee.feeStatus === "PAID");
      setPendingFees(pending);
      setPaidFees(paid);
    } else {
      setPendingFees([]);
      setPaidFees([]);
    }
  }, [fees]);

  const details = {
    periodId: selectedTerm?.value ?? "",
    studentProfileId: selectedStudent?.id ?? "",
    studentUserId: selectedStudent?.regNo ?? "",
    studentName: selectedStudent?.name ?? "",
    ...parentData,
    schoolFeeTitle: schoolFeeData?.title ?? "",
    term: selectedTerm?.label ?? "",
    year: Number(schoolFeeData?.year) ?? new Date().getFullYear(),
    className: selectedStudent?.classTitle ?? "",
    schoolId: schoolId,
  };

  async function handleSelectStudent(student: BriefStudent) {
    setSelectedStudent(student);
    setLoadingFees(true);
    
    try {
      const result = (await getFeesByClass(
        schoolId ?? "",
        student.classTitle,
        selectedTerm.label,
      )) || [];
      
      setTotalFees(result);
      const schoolFee = result.find((item) => item.term === selectedTerm.label);
      
      if (schoolFee) {
        setSchoolFeeData(schoolFee);
        setFees(schoolFee.fees);
      } else {
        setSchoolFeeData(null);
        setFees([]);
      }
      setLoadingFees(false);
    } catch (error) {
      setLoadingFees(false);
      console.log(error);
    }
  }

  function handleTermChange(term: any) {
    setLoadingFees(true);
    setSelectedTerm(term);
    
    const schoolFee = totalFees.find((item) => item.term === term.label);
    if (schoolFee) {
      setFees(schoolFee.fees);
    } else {
      setFees([]);
    }
    setLoadingFees(false);
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar (aynı) */}
      <div className="hidden md:flex w-80 flex-col border-r">
        <div className="pb-1 border-b flex justify-between items-center px-3 py-2">
          <div className="flex items-center gap-2 ">
            <Users className="h-6 w-6" />
            <h2 className="text-xl font-semibold">My Children</h2>
          </div>
        </div>
        {students.length > 0 ? (
          <ScrollArea className="flex-1">
            {students.map((student) => (
              <div
                key={student.id}
                className={`p-4 flex items-center hover:bg-muted/50 cursor-pointer ${
                  selectedStudent?.id === student.id ? "bg-muted" : ""
                }`}
                onClick={() => handleSelectStudent(student)}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={student.imageUrl || "/management/placeholder-avatar.png"}
                    alt={student.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {student.classTitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <div className="p-4 text-center text-gray-500">No children found</div>
        )}
      </div>

      {/* Mobile Sidebar (kısaltıldı) */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>My Children</SheetTitle>
          </SheetHeader>
          {students.length > 0 ? (
            <ScrollArea className="flex-1 mt-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="p-4 flex items-center gap-3 hover:bg-muted/50 cursor-pointer"
                  onClick={() => {
                    setSelectedStudent(student);
                    setIsMobileOpen(false);
                    handleSelectStudent(student);
                  }}
                >
                  <Image
                    src={student.imageUrl || "/management/placeholder-avatar.png"}
                    alt={student.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-medium">{student.name}</span>
                    <p className="text-xs text-muted-foreground">{student.classTitle}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <div className="p-4 text-center text-gray-500">No children found</div>
          )}
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      {selectedStudent ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
            <p className="text-gray-600">Class: {selectedStudent.classTitle}</p>
          </div>

          <div className="py-8">
            <div className="container mx-auto p-6 max-w-5xl">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                  Payments {new Date().getFullYear()}
                </h1>
                <div className="w-64">
                  <Select
                    value={selectedTerm}
                    onChange={handleTermChange}
                    options={termOptions}
                    primaryColor={"blue"}
                    placeholder="Select Term"
                  />
                </div>

                {pendingFees.length > 0 && (
                  <PaymentModal
                    fees={pendingFees} // 🔴 Sadece ödenmemiş fee'ler
                    selectedTerm={selectedTerm}
                    details={details}
                    schoolId={schoolId}
                    schoolName={schoolName}
                  />
                )}
              </div>

              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="w-full bg-gray-50 p-0 h-12">
                  <TabsTrigger
                    value="pending"
                    className="w-1/2 data-[state=active]:bg-white rounded-none"
                  >
                    Pending Payments ({pendingFees.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="payments"
                    className="w-1/2 data-[state=active]:bg-white rounded-none"
                  >
                    Payment History ({paidFees.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-6">
                  <Card className="w-full max-w-2xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        Pending Fees for {selectedTerm?.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingFees ? (
                        <div className="flex justify-center items-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin mr-2" />
                          <span>Loading fees...</span>
                        </div>
                      ) : pendingFees.length > 0 ? (
                        <>
                          <div className="overflow-hidden border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Fee Title
                                  </th>
                                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                                    Amount
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {pendingFees.map((fee, index) => (
                                  <tr key={fee.id || index}>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                      {fee.title}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                                      ${fee.amount?.toFixed(2) || "0.00"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="mt-4 flex justify-end">
                            <div className="bg-gray-50 px-6 py-3 rounded-lg">
                              <p className="text-sm font-medium text-gray-500">
                                Total Pending
                              </p>
                              <p className="text-2xl font-semibold text-gray-900">
                                $
                                {pendingFees
                                  .reduce((acc, item) => acc + (item.amount || 0), 0)
                                  .toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No pending fees found
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payments" className="mt-6">
                  <Card className="w-full max-w-2xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        Payment History for {selectedTerm?.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingFees ? (
                        <div className="flex justify-center items-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin mr-2" />
                          <span>Loading...</span>
                        </div>
                      ) : paidFees.length > 0 ? (
                        <>
                          <div className="overflow-hidden border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Fee Title
                                  </th>
                                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                                    Amount
                                  </th>
                                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {paidFees.map((fee, index) => (
                                  <tr key={fee.id || index}>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                      {fee.title}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                                      ${fee.amount?.toFixed(2) || "0.00"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center">
                                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                        PAID
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="mt-4 flex justify-end">
                            <div className="bg-gray-50 px-6 py-3 rounded-lg">
                              <p className="text-sm font-medium text-gray-500">
                                Total Paid
                              </p>
                              <p className="text-2xl font-semibold text-green-600">
                                $
                                {paidFees
                                  .reduce((acc, item) => acc + (item.amount || 0), 0)
                                  .toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No payment history found
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Select a Student</h2>
            <p>Choose a student from the sidebar to view their payments</p>
          </div>
        </div>
      )}
    </div>
  );
}