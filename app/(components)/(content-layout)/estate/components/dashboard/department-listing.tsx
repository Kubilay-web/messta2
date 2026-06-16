// "use client";

// import { useState } from "react";
// import { format } from "date-fns";
// import {
//   Pencil,
//   Trash2,
//   Users,
//   BookOpen,
//   DollarSign,
//   Calendar,
//   User,
//   GraduationCap,
//   School,
// } from "lucide-react";

// import { Button } from "../../components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "../../components/ui/sheet";
// import { ScrollArea } from "../../components/ui/scroll-area";
// import { Separator } from "../../components/ui/separator";
// import ClassForm from "./forms/academics/class-form";
// import DepartmentForm from "./forms/academics/department-form";
// import { Department } from "../../types/types";
// import { deleteDepartment } from "../../actions/departments";
// import toast from "react-hot-toast";
// import { EmptyState } from "../empty-state";

// // Mock data for demonstration
// const departments = [
//   {
//     id: "1",
//     name: "Mathematics Department",
//     slug: "mathematics",
//     createdAt: new Date("2023-01-15"),
//     updatedAt: new Date("2023-12-20"),
//     hodId: "hod1",
//     hodName: "Dr. Alan Turing",
//     hodStartDate: new Date("2023-01-15"),
//     budget: 50000,
//     budgetYear: "2023-2024",
//     teachers: [
//       { id: "1", name: "John Doe", subject: "Advanced Mathematics" },
//       { id: "2", name: "Jane Smith", subject: "Statistics" },
//     ],
//     subjects: [
//       { id: "1", name: "Calculus", code: "MATH101" },
//       { id: "2", name: "Linear Algebra", code: "MATH102" },
//       { id: "3", name: "Statistics", code: "MATH103" },
//     ],
//   },
//   {
//     id: "2",
//     name: "Science Department",
//     slug: "science",
//     createdAt: new Date("2023-02-01"),
//     updatedAt: new Date("2023-12-15"),
//     hodId: "hod2",
//     hodName: "Dr. Marie Curie",
//     hodStartDate: new Date("2023-02-01"),
//     budget: 75000,
//     budgetYear: "2023-2024",
//     teachers: [
//       { id: "3", name: "Robert Wilson", subject: "Physics" },
//       { id: "4", name: "Mary Johnson", subject: "Chemistry" },
//     ],
//     subjects: [
//       { id: "4", name: "Physics", code: "SCI101" },
//       { id: "5", name: "Chemistry", code: "SCI102" },
//       { id: "6", name: "Biology", code: "SCI103" },
//     ],
//   },
// ];

// export default function DepartmentListing({
//   departments,
// }: {
//   departments: Department[];
// }) {
//   const [selectedDept, setSelectedDept] = useState(departments[0]);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   async function handleDelete(id: string) {
//     try {
//       await deleteDepartment(id);
//       toast.success("Department deleted");
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <div className="flex h-screen bg-background">
//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex w-80 flex-col border-r">
//         <div className=" border-b pb-1">
//           <div className="flex items-center justify-between gap-2 px-4 py-2">
//             <div className="flex items-center gap-2">
//               <School className="h-6 w-6" />
//               <h2 className="text-xl font-semibold">
//                 {departments.length} Departments
//               </h2>
//             </div>
//             <DepartmentForm />
//           </div>
//         </div>
//         {departments.length > 0 ? (
//           <ScrollArea className="flex-1">
//             {departments.map((dept) => (
//               <div
//                 key={dept.id}
//                 className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
//                   selectedDept.id === dept.id ? "bg-muted" : ""
//                 }`}
//                 onClick={() => setSelectedDept(dept)}
//               >
//                 <span className="font-medium">{dept.name}</span>
//                 <div className="flex gap-2">
//                   <Button variant="ghost" size="icon">
//                     <Pencil className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     onClick={() => handleDelete(dept.id)}
//                     variant="ghost"
//                     size="icon"
//                   >
//                     <Trash2 className="h-4 w-4 text-red-500" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </ScrollArea>
//         ) : (
//           <div className="p-4">
//             <EmptyState
//               icon={BookOpen}
//               title="No Departments yet"
//               description="Create your first department to get started "
//               className="min-h-[300px] h-full"
//             />
//           </div>
//         )}
//       </div>

//       {/* Mobile Sidebar */}
//       <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
//         <SheetContent side="left" className="w-80">
//           <SheetHeader>
//             <SheetTitle>Departments</SheetTitle>
//           </SheetHeader>
//           {departments.length > 0 ? (
//             <ScrollArea className="flex-1 mt-4">
//               {departments.map((dept) => (
//                 <div
//                   key={dept.id}
//                   className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
//                     selectedDept.id === dept.id ? "bg-muted" : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedDept(dept);
//                     setIsMobileOpen(false);
//                   }}
//                 >
//                   <span className="font-medium">{dept.name} Department</span>
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
//               <h2>No Departments</h2>
//             </div>
//           )}
//         </SheetContent>
//       </Sheet>

//       {/* Main Content */}
//       {selectedDept && (
//         <div className="flex-1 flex flex-col h-full overflow-hidden">
//           <div className="flex items-center justify-between p-4 border-b">
//             <div className="flex items-center gap-4">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden"
//                 onClick={() => setIsMobileOpen(true)}
//               >
//                 <Users className="h-4 w-4" />
//               </Button>
//               <h1 className="text-2xl font-bold">
//                 {selectedDept.name} Department
//               </h1>
//             </div>
//           </div>

//           <ScrollArea className="flex-1 p-4">
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">
//                     Teachers
//                   </CardTitle>
//                   <Users className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     {selectedDept.teachers.length}
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">
//                     Subjects
//                   </CardTitle>
//                   <BookOpen className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     {selectedDept.subjects.length}
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">
//                     Annual Budget
//                   </CardTitle>
//                   <DollarSign className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     {/* ${selectedDept.budget?.toLocaleString()} */}$ 75000
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     {/* FY {selectedDept.budgetYear} */}
//                     FY 2023-2024
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="grid gap-6 md:grid-cols-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">Department Details</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm text-muted-foreground">
//                       Created:
//                     </span>
//                     <span className="text-sm">
//                       {format(selectedDept.createdAt, "PPP")}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <User className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm text-muted-foreground">HOD:</span>
//                     <span className="text-sm font-medium">
//                       Dr. Marie Curie
//                       {/* {selectedDept.hodName} */}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm text-muted-foreground">
//                       HOD Since:
//                     </span>
//                     <span className="text-sm">
//                       {selectedDept.hodStartDate
//                         ? format(new Date("2023-02-01"), "PPP")
//                         : "Not assigned"}
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">Teachers</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {[
//                       { id: "3", name: "Robert Wilson", subject: "Physics" },
//                       { id: "4", name: "Mary Johnson", subject: "Chemistry" },
//                     ].map((teacher) => (
//                       <div
//                         key={teacher.id}
//                         className="flex items-center justify-between"
//                       >
//                         <div>
//                           <p className="font-medium">{teacher.name}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {teacher.subject}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="mt-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">Subjects</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid gap-4 md:grid-cols-2">
//                     {[
//                       { id: "4", name: "Physics", code: "SCI101" },
//                       { id: "5", name: "Chemistry", code: "SCI102" },
//                       { id: "6", name: "Biology", code: "SCI103" },
//                     ].map((subject) => (
//                       <div
//                         key={subject.id}
//                         className="flex items-center justify-between p-3 border rounded-lg"
//                       >
//                         <div>
//                           <p className="font-medium">{subject.name}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {subject.code}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </ScrollArea>
//         </div>
//       )}
//     </div>
//   );
// }










"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Pencil,
  Trash2,
  Users,
  BookOpen,
  DollarSign,
  Calendar,
  User,
  School,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Department } from "../../types/types";
import { deleteDepartment } from "../../actions/departments";
import toast from "react-hot-toast";
import { EmptyState } from "../empty-state";
import DepartmentForm from "./forms/academics/department-form";

export default function DepartmentListing({
  departments,
  schoolId,
}: {
  departments: Department[];
  schoolId: string;
}) {
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  async function handleDelete(id: string) {
    try {
      await deleteDepartment(id);
      toast.success("Department deleted");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex  w-full  bg-background flex-wrap">
      {/* DESKTOP SIDEBAR */}

      <div className=" md:flex w-80 flex-col border-r">
        <div className="border-b">
          <div className="flex items-center justify-between gap-2 px-4 py-3">
            <div className="flex items-center gap-2">
              <School className="h-6 w-6" />
              <h2 className="text-lg font-semibold">
                {departments.length} Departments
              </h2>
            </div>
            <DepartmentForm schoolId={schoolId} />
          </div>
        </div>

        {departments.length > 0 ? (
          <ScrollArea className="flex-1">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer transition ${
                  selectedDept?.id === dept.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedDept(dept)}
              >
                <span className="font-medium truncate">{dept.name}</span>

                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    onClick={() => handleDelete(dept.id)}
                    variant="ghost"
                    size="icon"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <div className="p-4">
            <EmptyState
              icon={BookOpen}
              title="No Departments yet"
              description="Create your first department to get started"
              className="min-h-[300px]"
            />
          </div>
        )}
      </div>

      {/* MOBILE SIDEBAR */}

      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Departments</SheetTitle>
          </SheetHeader>

          {departments.length > 0 ? (
            <ScrollArea className="mt-4">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
                    selectedDept?.id === dept.id ? "bg-muted" : ""
                  }`}
                  onClick={() => {
                    setSelectedDept(dept);
                    setIsMobileOpen(false);
                  }}
                >
                  <span className="font-medium">{dept.name}</span>

                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(dept.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <div className="p-4">No Departments</div>
          )}
        </SheetContent>
      </Sheet>

      {/* MAIN CONTENT */}

      {selectedDept && (
        <div className="flex-1 flex flex-col ">
          {/* HEADER */}

          <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileOpen(true)}
              >
                <Users className="h-5 w-5" />
              </Button>

              <h1 className="text-xl md:text-2xl font-bold">
                {selectedDept.name}
              </h1>
            </div>
          </div>

          {/* CONTENT */}

          <ScrollArea className="flex-1 p-4">
            {/* STATS */}

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm">Teachers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                  <div className="text-2xl font-bold">
                    {selectedDept.teachers?.length || 0}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm">Subjects</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                  <div className="text-2xl font-bold">
                    {selectedDept.subjects?.length || 0}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm">Annual Budget</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                  <div className="text-2xl font-bold">$75,000</div>
                  <p className="text-xs text-muted-foreground">FY 2023-2024</p>
                </CardContent>
              </Card>
            </div>

            {/* DETAILS + TEACHERS */}

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Department Details</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Created:
                    </span>
                    <span className="text-sm">
                      {format(selectedDept.createdAt, "PPP")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">HOD:</span>
                    <span className="text-sm font-medium">
                      {selectedDept.hodName || "Not Assigned"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      HOD Since:
                    </span>
                    <span className="text-sm">
                      {selectedDept.hodStartDate
                        ? format(selectedDept.hodStartDate, "PPP")
                        : "Not assigned"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Teachers</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* 
                  {selectedDept.teachers?.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{teacher.classId}</p>
                        <p className="text-sm text-muted-foreground">
                          {teacher.title}
                        </p>
                      </div>
                    </div>
                  ))} */}

                  {selectedDept.teachers?.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                    >
                      <div>
                        <p className="font-medium">
                          {teacher.firstName} {teacher.lastName}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {teacher.designation} • {teacher.mainSubject}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* SUBJECTS */}

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subjects</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {selectedDept.subjects?.map((subject) => (
                      <div
                        key={subject.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{subject.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {subject.code}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
