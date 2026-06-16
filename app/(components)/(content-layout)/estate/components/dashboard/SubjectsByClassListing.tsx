// "use client";
// import React, { useState } from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "../../components/ui/sheet";
// import { Badge } from "../../components/ui/badge";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "../../components/ui/card";
// import { Users, Pencil, Trash2 } from "lucide-react";
// import { Subject } from "../../types/types";
// import { Button } from "../ui/button";
// import { deleteSubject } from "../../actions/subjects";
// import toast from "react-hot-toast";

// export type SubjectType = "THEORY" | "PRACTICAL" | "BOTH";
// export type SubjectCategory = "CORE" | "ELECTIVE";

// interface SubjectsByClassListingProps {
//   subjects: Subject[];
//   onSubjectClick?: (subject: Subject) => void;
// }

// const SubjectsByClassListing: React.FC<SubjectsByClassListingProps> = ({
//   subjects,
//   onSubjectClick,
// }) => {
//   const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
//   const [isSheetOpen, setIsSheetOpen] = useState(false);

//   const getSubjectTypeColor = (type: SubjectType): string => {
//     return {
//       THEORY: "bg-blue-100 text-blue-800",
//       PRACTICAL: "bg-green-100 text-green-800",
//       BOTH: "bg-purple-100 text-purple-800",
//     }[type];
//   };

//   const getCategoryColor = (category: SubjectCategory): string => {
//     return {
//       CORE: "bg-red-100 text-red-800",
//       ELECTIVE: "bg-yellow-100 text-yellow-800",
//     }[category];
//   };

//   const handleSubjectClick = (subject: Subject) => {
//     setSelectedSubject(subject);
//     setIsSheetOpen(true);
//     onSubjectClick?.(subject);
//   };

//   async function handleDelete(id: string) {
//     try {
//       await deleteSubject(id);
//       toast.success("Subject deleted");
//       window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="bg-white text-black">
//       {/* LIST */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
//         {subjects.map((subject) => (
//           <Card
//             key={subject.id}
//             className="bg-white text-black border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
//             onClick={() => handleSubjectClick(subject)}
//           >
//             <CardHeader>
//               <div className="flex justify-between items-start">
//                 <CardTitle className="text-lg font-semibold text-black">
//                   {subject.name}
//                 </CardTitle>
//                 <Badge variant="outline" className="text-black border-gray-300">
//                   {subject.code}
//                 </Badge>
//               </div>
//             </CardHeader>

//             <CardContent>
//               <div className="flex gap-2">
//                 <Badge className={getSubjectTypeColor(subject.type)}>
//                   {subject.type}
//                 </Badge>
//                 <Badge className={getCategoryColor(subject.category)}>
//                   {subject.category}
//                 </Badge>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* SHEET */}
//       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//         <SheetContent className="w-full sm:max-w-2xl overflow-y-auto bg-white text-black">
//           {selectedSubject && (
//             <>
//               <SheetHeader>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <SheetTitle className="text-xl font-bold text-black">
//                       {selectedSubject.name}
//                     </SheetTitle>
//                     <p className="text-sm text-gray-500 mt-1">
//                       {selectedSubject.shortName &&
//                         `${selectedSubject.shortName} • `}
//                       {selectedSubject.code}
//                     </p>
//                   </div>

//                   <div className="flex gap-2">
//                     <button className="p-2 text-black hover:text-gray-600">
//                       <Pencil className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(selectedSubject.id)}
//                       className="p-2 text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </SheetHeader>

//               <div className="mt-6 space-y-4">
//                 {/* Teacher Card */}
//                 <Card className="bg-white border border-gray-200">
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-base font-medium flex items-center gap-2 text-black">
//                       <Users className="w-4 h-4" />
//                       Subject Teacher
//                     </CardTitle>
//                   </CardHeader>
//                 </Card>

//                 {/* Details */}
//                 <Card className="bg-white border border-gray-200">
//                   <CardContent className="grid grid-cols-2 gap-4 pt-6">
//                     <div>
//                       <p className="text-sm font-medium">Department</p>
//                       <p className="text-sm text-gray-600">
//                         {selectedSubject.departmentName}
//                       </p>
//                     </div>

//                     <div>
//                       <p className="text-sm font-medium">Category</p>
//                       <Badge
//                         className={getCategoryColor(selectedSubject.category)}
//                       >
//                         {selectedSubject.category}
//                       </Badge>
//                     </div>

//                     <div>
//                       <p className="text-sm font-medium">Type</p>
//                       <Badge
//                         className={getSubjectTypeColor(selectedSubject.type)}
//                       >
//                         {selectedSubject.type}
//                       </Badge>
//                     </div>

//                     <div>
//                       <p className="text-sm font-medium">Marks</p>
//                       <p className="text-sm text-gray-600">
//                         {selectedSubject.passingMarks &&
//                         selectedSubject.totalMarks
//                           ? `${selectedSubject.passingMarks}/${selectedSubject.totalMarks}`
//                           : "Not specified"}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Settings */}
//                 <Card className="bg-white border border-gray-200">
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-base font-medium text-black">
//                       Settings
//                     </CardTitle>
//                   </CardHeader>

//                   <CardContent>
//                     <div className="grid grid-cols-2 gap-3 text-sm">
//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`w-2 h-2 rounded-full ${
//                             selectedSubject.isActive
//                               ? "bg-green-500"
//                               : "bg-red-500"
//                           }`}
//                         />
//                         <span>
//                           {selectedSubject.isActive ? "Active" : "Inactive"}
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`w-2 h-2 rounded-full ${
//                             selectedSubject.isOptional
//                               ? "bg-yellow-500"
//                               : "bg-blue-500"
//                           }`}
//                         />
//                         <span>
//                           {selectedSubject.isOptional
//                             ? "Optional"
//                             : "Compulsory"}
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`w-2 h-2 rounded-full ${
//                             selectedSubject.hasTheory
//                               ? "bg-blue-500"
//                               : "bg-gray-400"
//                           }`}
//                         />
//                         <span>
//                           Theory{" "}
//                           {selectedSubject.hasTheory
//                             ? "Included"
//                             : "Not Included"}
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`w-2 h-2 rounded-full ${
//                             selectedSubject.hasPractical
//                               ? "bg-purple-500"
//                               : "bg-gray-400"
//                           }`}
//                         />
//                         <span>
//                           Practical{" "}
//                           {selectedSubject.hasPractical
//                             ? "Included"
//                             : "Not Included"}
//                         </span>
//                       </div>

//                       {selectedSubject.hasPractical && (
//                         <div className="flex items-center gap-2">
//                           <div
//                             className={`w-2 h-2 rounded-full ${
//                               selectedSubject.labRequired
//                                 ? "bg-red-500"
//                                 : "bg-gray-400"
//                             }`}
//                           />
//                           <span>
//                             Lab{" "}
//                             {selectedSubject.labRequired
//                               ? "Required"
//                               : "Not Required"}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </>
//           )}
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default SubjectsByClassListing;














"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Users, Pencil, Trash2 } from "lucide-react";
import { Subject } from "../../types/types";
import { deleteSubject } from "../../actions/subjects";
import toast from "react-hot-toast";

export type SubjectType = "THEORY" | "PRACTICAL" | "BOTH";
export type SubjectCategory = "CORE" | "ELECTIVE";

interface SubjectsByClassListingProps {
  subjects: Subject[];
  onSubjectClick?: (subject: Subject) => void;
}

const SubjectsByClassListing: React.FC<SubjectsByClassListingProps> = ({
  subjects,
  onSubjectClick,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const getSubjectTypeColor = (type: SubjectType): string => {
    return {
      THEORY: "bg-blue-100 text-blue-800",
      PRACTICAL: "bg-green-100 text-green-800",
      BOTH: "bg-purple-100 text-purple-800",
    }[type];
  };

  const getCategoryColor = (category: SubjectCategory): string => {
    return {
      CORE: "bg-red-100 text-red-800",
      ELECTIVE: "bg-yellow-100 text-yellow-800",
    }[category];
  };

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsSheetOpen(true);
    onSubjectClick?.(subject);
  };

  async function handleDelete(id: string) {
    try {
      await deleteSubject(id);
      toast.success("Subject deleted");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white text-black w-full">
      {/* LIST */}
      <div className="flex flex-wrap gap-4 p-4 justify-center">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="flex-1 min-w-[280px] max-w-[400px] cursor-pointer"
          >
            <Card
              className="bg-white text-black border border-gray-200 hover:shadow-lg transition-shadow w-full"
              onClick={() => handleSubjectClick(subject)}
            >
              <CardHeader>
                <div className="flex justify-between items-start flex-wrap">
                  <CardTitle className="text-lg font-semibold text-black">
                    {subject.name}
                  </CardTitle>
                  <Badge variant="outline" className="text-black border-gray-300 mt-2 sm:mt-0">
                    {subject.code}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getSubjectTypeColor(subject.type)}>
                    {subject.type}
                  </Badge>
                  <Badge className={getCategoryColor(subject.category)}>
                    {subject.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* SHEET */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto bg-white text-black">
          {selectedSubject && (
            <>
              <SheetHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <SheetTitle className="text-xl font-bold text-black">
                      {selectedSubject.name}
                    </SheetTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedSubject.shortName &&
                        `${selectedSubject.shortName} • `}
                      {selectedSubject.code}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 text-black hover:text-gray-600">
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedSubject.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                {/* Teacher Card */}
                <Card className="bg-white border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex items-center gap-2 text-black">
                      <Users className="w-4 h-4" />
                      Subject Teacher
                    </CardTitle>
                  </CardHeader>
                </Card>

                {/* Details */}
                <Card className="bg-white border border-gray-200">
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                    <div>
                      <p className="text-sm font-medium">Department</p>
                      <p className="text-sm text-gray-600">
                        {selectedSubject.departmentName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <Badge
                        className={getCategoryColor(selectedSubject.category)}
                      >
                        {selectedSubject.category}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Type</p>
                      <Badge
                        className={getSubjectTypeColor(selectedSubject.type)}
                      >
                        {selectedSubject.type}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Marks</p>
                      <p className="text-sm text-gray-600">
                        {selectedSubject.passingMarks &&
                        selectedSubject.totalMarks
                          ? `${selectedSubject.passingMarks}/${selectedSubject.totalMarks}`
                          : "Not specified"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Settings */}
                <Card className="bg-white border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium text-black">
                      Settings
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            selectedSubject.isActive
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        />
                        <span>
                          {selectedSubject.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            selectedSubject.isOptional
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <span>
                          {selectedSubject.isOptional
                            ? "Optional"
                            : "Compulsory"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            selectedSubject.hasTheory
                              ? "bg-blue-500"
                              : "bg-gray-400"
                          }`}
                        />
                        <span>
                          Theory{" "}
                          {selectedSubject.hasTheory
                            ? "Included"
                            : "Not Included"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            selectedSubject.hasPractical
                              ? "bg-purple-500"
                              : "bg-gray-400"
                          }`}
                        />
                        <span>
                          Practical{" "}
                          {selectedSubject.hasPractical
                            ? "Included"
                            : "Not Included"}
                        </span>
                      </div>

                      {selectedSubject.hasPractical && (
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              selectedSubject.labRequired
                                ? "bg-red-500"
                                : "bg-gray-400"
                            }`}
                          />
                          <span>
                            Lab{" "}
                            {selectedSubject.labRequired
                              ? "Required"
                              : "Not Required"}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SubjectsByClassListing;