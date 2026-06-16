// "use client";
// import * as React from "react";
// import {
//   ChevronLeft,
//   GraduationCap,
//   Users,
//   Search,
//   Plus,
//   Pencil,
//   Trash2,
//   Building,
//   BookCheck,
// } from "lucide-react";
// import { cn } from "../../lib/utils";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { ScrollArea } from "../../components/ui/scroll-area";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../../components/ui/card";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../../components/ui/tooltip";
// import ClassForm from "./forms/academics/class-form";
// import StreamForm from "./forms/academics/stream-form";
// import { BriefTeacher, Class, DepartmentBrief } from "../../types/types";
// import Image from "next/image";
// import AssignClassTeacherForm from "./forms/academics/assign-classteacher-form";
// import SubjectForm from "./forms/academics/subject-form";
// import SubjectsByClassListing from "./SubjectsByClassListing";
// import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";


// import { TabsContent } from "@radix-ui/react-tabs";

// interface ClassItem {
//   id: number;
//   name: string;
//   sections: number;
//   totalStudents: number;
// }

// interface Section {
//   name: string;
//   students: number;
//   classTeacher: string;
// }

// interface SectionsData {
//   [key: number]: Section[];
// }

// export default function ClassListing({
//   classes,
//   teachers,
//   departments,
// }: {
//   classes: Class[];
//   teachers: BriefTeacher[];
//   departments: DepartmentBrief[];
// }) {
//   const [selectedClass, setSelectedClass] = React.useState<string>("");
//   console.log(selectedClass);
//   const streams = classes.find((c) => c.id === selectedClass)?.streams || [];
//   const sClass = classes.find((c) => c.id === selectedClass);
//   console.log(sClass);
//   const teachersWithoutClasses = teachers.filter(
//     (t) => t.isClassTeacher === false
//   );
//   return (
//     <div className="grid lg:grid-cols-[280px_1fr] h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] gap-2 p-4 pt-2">
//       {/* Left Sidebar */}
//       <div className="flex flex-col gap-2">
//         <div className="flex items-center justify-between gap-2 px-4 py-2">
//           <div className="flex items-center gap-2">
//             <GraduationCap className="h-6 w-6" />
//             <h2 className="text-xl font-semibold">Classes</h2>
//           </div>
//           <ClassForm />
//         </div>

//         {classes.length > 0 ? (
//           <>
//             <div className="px-4 py-2">
//               <Input
//                 placeholder="Search classes..."
//                 className="h-9"
//                 type="search"
//               />
//             </div>
//             <ScrollArea className="flex-1">
//               <div className="px-2 space-y-3">
//                 {classes.map((classItem) => (
//                   <div
//                     key={classItem.id}
//                     className={cn(
//                       "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
//                       selectedClass === classItem.id
//                         ? "bg-accent text-accent-foreground"
//                         : "hover:bg-muted text-muted-foreground"
//                     )}
//                   >
//                     <button
//                       onClick={() => setSelectedClass(classItem.id)}
//                       className="flex flex-col items-start gap-1 text-left"
//                     >
//                       <div className="flex w-full items-center justify-between gap-2">
//                         <span className="font-medium">{classItem.title}</span>
//                         <span className="text-xs">
//                           {classItem.streams.length} streams
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                         <Users className="h-3 w-3" />
//                         {classItem._count.students} students
//                       </div>
//                     </button>
//                     <div className="flex items-center gap-1">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                             >
//                               <Pencil className="h-3 w-3" />
//                               <span className="sr-only">Edit Class</span>
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Edit Class</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                             >
//                               <Trash2 className="h-3 w-3" />
//                               <span className="sr-only">Delete Class</span>
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Delete Class</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           </>
//         ) : (
//           <div className="p-4">
//             <h2>No Classes</h2>
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       {selectedClass ? (
//         <div className="flex flex-col gap-2 rounded-lg border bg-card">
//           <div className="flex items-center justify-between gap-2 px-4 py-2 border-b">
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 <ChevronLeft className="h-4 w-4" />
//                 <span className="sr-only">Go back</span>
//               </Button>
//               <div>
//                 <h2 className="text-lg font-semibold">
//                   {classes.find((c) => c.id === selectedClass)?.title}
//                 </h2>
//                 <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                   <span>Classes</span>
//                   <span>/</span>
//                   <span>
//                     {classes.find((c) => c.id === selectedClass)?.title}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <StreamForm classId={selectedClass} />
//             </div>
//           </div>
//           <div className="p-4 space-y-4">
//             <Card className="w-full max-w-2xl mx-auto">
//               <CardContent className="p-4 sm:p-6">
//                 <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//                   <div className="text-center sm:text-left">
//                     <h2 className="text-xl sm:text-2xl font-bold">
//                       {sClass?.classTeacherName
//                         ? sClass.classTeacherName
//                         : "No Teacher Assigned"}
//                     </h2>
//                     <p className="text-sm text-muted-foreground">
//                       Current Class Teacher
//                     </p>
//                   </div>
//                   <AssignClassTeacherForm
//                     teachers={teachersWithoutClasses}
//                     classId={selectedClass}
//                     oldClassTeacherId={sClass?.classTeacherId}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//             <Tabs defaultValue="streams" className="w-full">
//               <TabsList className="w-full justify-start bg-blue-50/50 p-0 h-auto flex-wrap">
//                 {[
//                   { id: "streams", label: "Streams", icon: Building },
//                   { id: "subjects", label: "Subjects", icon: BookCheck },
//                 ].map((tab) => (
//                   <TabsTrigger
//                     key={tab.id}
//                     value={tab.id}
//                     className="data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 px-6 py-3"
//                   >
//                     <tab.icon className="h-4 w-4 mr-2" />
//                     {tab.label}
//                   </TabsTrigger>
//                 ))}
//               </TabsList>

//               <TabsContent value="streams" className="mt-6">
//                 <Card className="border-blue-100 border-t-4 border-t-blue-600 ">
//                   <CardContent className="grid gap-4 ">
//                     <div className="p-4">
//                       <h3 className="text-lg border-b border-blue-50 font-semibold">
//                         Streams
//                       </h3>
//                       {streams.length > 0 ? (
//                         <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                           {streams.map((section) => (
//                             <Card key={section.title}>
//                               <CardHeader className="pb-2">
//                                 <div className="flex items-center justify-between">
//                                   <CardTitle className="text-lg">
//                                     {section.title}
//                                   </CardTitle>
//                                   <div className="flex items-center gap-1">
//                                     <TooltipProvider>
//                                       <Tooltip>
//                                         <TooltipTrigger asChild>
//                                           <Button
//                                             variant="ghost"
//                                             size="icon"
//                                             className="h-7 w-7"
//                                           >
//                                             <Pencil className="h-3 w-3" />
//                                             <span className="sr-only">
//                                               Edit Section
//                                             </span>
//                                           </Button>
//                                         </TooltipTrigger>
//                                         <TooltipContent>
//                                           <p>Edit Section</p>
//                                         </TooltipContent>
//                                       </Tooltip>
//                                     </TooltipProvider>
//                                     <TooltipProvider>
//                                       <Tooltip>
//                                         <TooltipTrigger asChild>
//                                           <Button
//                                             variant="ghost"
//                                             size="icon"
//                                             className="h-7 w-7"
//                                           >
//                                             <Trash2 className="h-3 w-3" />
//                                             <span className="sr-only">
//                                               Delete Section
//                                             </span>
//                                           </Button>
//                                         </TooltipTrigger>
//                                         <TooltipContent>
//                                           <p>Delete Section</p>
//                                         </TooltipContent>
//                                       </Tooltip>
//                                     </TooltipProvider>
//                                   </div>
//                                 </div>
//                               </CardHeader>
//                               <CardContent>
//                                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                                   <Users className="h-4 w-4" />
//                                   {section._count.students} students
//                                 </div>
//                               </CardContent>
//                             </Card>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="flex items-center min-h-96 justify-center">
//                           <div className="flex flex-col items-center justify-center">
//                             <Image
//                               src={"/empty.png"}
//                               alt="empty"
//                               width={512}
//                               height={512}
//                               className="w-36"
//                             />
//                             <p>No Streams</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               {/* <TabsContent value="subjects" className="mt-6">
//                 <Card className="border-blue-100 border-t-4 border-t-blue-600">
//                   <CardContent className="">
//                     <div className="p-4">
//                       <h3 className="text-lg border-b border-blue-50 font-semibold">
//                         Subjects
//                       </h3>

//                       {sClass?.subjects && sClass.subjects.length > 0 ? (
//                         <SubjectsByClassListing subjects={sClass.subjects} />
//                       ) : (
//                         <div className="">
//                           <h2>No Subjects Added yet</h2>
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent> */}
//             </Tabs>
//           </div>
//         </div>
//       ) : (
//         <div className="min-h-96 flex items-center justify-center">
//           <p>Select the Class to see the Details</p>
//         </div>
//       )}
//     </div>
//   );
// }














"use client";

import * as React from "react";
import {
  ChevronLeft,
  GraduationCap,
  Users,
  Pencil,
  Trash2,
  Building,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

import ClassForm from "./forms/academics/class-form";
import StreamForm from "./forms/academics/stream-form";
import { BriefTeacher, Class, DepartmentBrief } from "../../types/types";
import Image from "next/image";
import AssignClassTeacherForm from "./forms/academics/assign-classteacher-form";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { deleteClass, deleteStream } from "../../actions/classes";

export default function ClassListing({
  classes,
  teachers,
  departments,
  schoolId,
}: {
  classes: Class[];
  teachers: BriefTeacher[];
  departments: DepartmentBrief[];
  schoolId: string;
}) {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = React.useState<string>("");
  const [deletingId, setDeletingId] = React.useState<string>("");

  const sClass = classes.find((c) => c.id === selectedClass);
  const streams = sClass?.streams || [];
  const teachersWithoutClasses = teachers?.filter((t) => t.isClassTeacher === false);

  async function handleDeleteClass(id: string) {
    setDeletingId(id);
    const res = await deleteClass(id);
    setDeletingId("");
    if (res.ok) {
      toast.success("Class deleted");
      if (selectedClass === id) setSelectedClass("");
      router.refresh();
    } else {
      toast.error("Could not delete class");
    }
  }

  async function handleDeleteStream(id: string) {
    setDeletingId(id);
    const res = await deleteStream(id);
    setDeletingId("");
    if (res.ok) {
      toast.success("Stream deleted");
      router.refresh();
    } else {
      toast.error("Could not delete stream");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-2 p-2 sm:p-4 pt-2 lg:h-[calc(100vh-2rem)]">
      {/* SIDEBAR */}

      <div className="flex flex-col gap-2 lg:border-r">

        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Classes</h2>
          </div>

          <ClassForm schoolId={schoolId} />
        </div>

        {classes.length > 0 ? (
          <>
            <div className="px-3 py-2">
              <Input
                placeholder="Search classes..."
                className="h-9 w-full"
                type="search"
              />
            </div>

            <ScrollArea className="flex-1 lg:max-h-[calc(100vh-180px)]">
              <div className="px-2 space-y-3">

                {classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    className={cn(
                      "flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                      selectedClass === classItem.id
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    <button
                      onClick={() => setSelectedClass(classItem.id)}
                      className="flex flex-col items-start gap-1 text-left w-full"
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <span className="font-medium">
                          {classItem.title}
                        </span>

                        <span className="text-xs">
                          {classItem.streams.length} streams
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {classItem._count.students} students
                      </div>
                    </button>

                    <div className="flex items-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ClassForm
                              schoolId={schoolId}
                              editingId={classItem.id}
                              initialContent={classItem.title}
                            />
                          </TooltipTrigger>
                          <TooltipContent>Edit Class</TooltipContent>
                        </Tooltip>

                        <AlertDialog>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-red-500 hover:text-red-600"
                                  disabled={deletingId === classItem.id}
                                >
                                  {deletingId === classItem.id
                                    ? <Loader2 className="h-3 w-3 animate-spin" />
                                    : <Trash2 className="h-3 w-3" />}
                                </Button>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Delete Class</TooltipContent>
                          </Tooltip>
                          <AlertDialogContent className="bg-white text-black">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete "{classItem.title}"?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the class and all its streams.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={() => handleDeleteClass(classItem.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TooltipProvider>
                    </div>
                  </div>
                ))}

              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="p-4">
            <h2>No Classes</h2>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}

      {selectedClass ? (
        <div className="flex flex-col gap-2 rounded-lg border bg-card w-full">

          {/* HEADER */}

          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b">

            <div className="flex items-center gap-2">

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hidden lg:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div>
                <h2 className="text-lg font-semibold">
                  {sClass?.title}
                </h2>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>Classes</span>
                  <span>/</span>
                  <span>{sClass?.title}</span>
                </div>
              </div>

            </div>

            <StreamForm classId={selectedClass} />

          </div>

          {/* CONTENT */}

          <div className="p-4 space-y-4">

            {/* CLASS TEACHER */}

            <Card className="w-full max-w-2xl mx-auto">
              <CardContent className="p-4 sm:p-6">

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold">
                      {sClass?.classTeacherName || "No Teacher Assigned"}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Current Class Teacher
                    </p>
                  </div>

                  <AssignClassTeacherForm
                    teachers={teachersWithoutClasses}
                    classId={selectedClass}
                    oldClassTeacherId={sClass?.classTeacherId}
                  />

                </div>

              </CardContent>
            </Card>

            {/* TABS */}

            <Tabs defaultValue="streams" className="w-full">

              <TabsList className="w-full justify-start bg-blue-50/50 p-0 h-auto flex-wrap">

                {[
                  { id: "streams", label: "Streams", icon: Building },
                  // { id: "subjects", label: "Subjects", icon: BookCheck },
                ].map((tab) => (

                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 px-6 py-3"
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </TabsTrigger>

                ))}

              </TabsList>

              {/* STREAMS */}

              <TabsContent value="streams" className="mt-6">

                <Card className="border-blue-100 border-t-4 border-t-blue-600">

                  <CardContent>

                    <div className="p-4">

                      <h3 className="text-lg border-b border-blue-50 font-semibold">
                        Streams
                      </h3>

                      {streams.length > 0 ? (

                        <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                          {streams.map((section) => (

                            <Card key={section.title}>

                              <CardHeader className="pb-2">

                                <div className="flex items-center justify-between">

                                  <CardTitle className="text-lg">
                                    {section.title}
                                  </CardTitle>

                                  <div className="flex gap-1">
                                    <StreamForm
                                      classId={selectedClass}
                                      editingId={section.id}
                                      initialContent={section.title}
                                    />

                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 text-red-500 hover:text-red-600"
                                          disabled={deletingId === section.id}
                                        >
                                          {deletingId === section.id
                                            ? <Loader2 className="h-3 w-3 animate-spin" />
                                            : <Trash2 className="h-3 w-3" />}
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent className="bg-white text-black">
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Delete stream "{section.title}"?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This will permanently delete this stream.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                            onClick={() => handleDeleteStream(section.id)}
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>

                                </div>

                              </CardHeader>

                              <CardContent>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  {section._count.students} students
                                </div>

                              </CardContent>

                            </Card>

                          ))}

                        </div>

                      ) : (

                        <div className="flex items-center min-h-[300px] justify-center">

                          <div className="flex flex-col items-center">

                            <Image
                              src="/management/empty.png"
                              alt="empty"
                              width={512}
                              height={512}
                              className="w-28 sm:w-36"
                            />

                            <p>No Streams</p>

                          </div>

                        </div>

                      )}

                    </div>

                  </CardContent>

                </Card>

              </TabsContent>

            </Tabs>

          </div>

        </div>
      ) : (

        <div className="min-h-[400px] flex items-center justify-center">
          <p>Select the Class to see the Details</p>
        </div>

      )}
    </div>
  );
}
