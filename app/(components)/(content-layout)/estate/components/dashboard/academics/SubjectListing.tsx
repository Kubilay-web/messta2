// "use client";
// import { Card, CardContent } from "../../../components/ui/card";
// import React from "react";
// import SubjectsByClassListing from "../SubjectsByClassListing";
// import SubjectForm from "../forms/academics/subject-form";
// import { DepartmentBrief, Subject } from "../../../types/types";
// import { EmptyState } from "../../../components/empty-state";
// import { BookOpen } from "lucide-react";

// export default function SubjectListing({
//   departments,
//   subjects,
//   schoolId
// }: {
//   departments: DepartmentBrief[];
//   subjects: Subject[];
//   schoolId:string
// }) {
//   return (
//     <Card className="border-blue-100 border-t-4 border-t-blue-600">
//       <CardContent className="">
//         <div className="p-4">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg border-b border-blue-50 font-semibold">
//               {subjects.length} Subjects
//             </h3>
//             <SubjectForm
//               departments={departments.map((item) => {
//                 return {
//                   label: item.name,
//                   value: item.id,
//                 };
//               })}
//               schoolId={schoolId} 
//             />
//           </div>

//           {subjects && subjects.length > 0 ? (
//             <SubjectsByClassListing subjects={subjects} />
//           ) : (
//             <div className=" flex items-center justify-center">
//               <EmptyState
//                 icon={BookOpen}
//                 title="No subjects yet"
//                 description="Create your first subject to get started "
//                 className="min-h-[300px] h-full"
//               />
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }




"use client";

import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import SubjectsByClassListing from "../SubjectsByClassListing";
import SubjectForm from "../forms/academics/subject-form";
import { DepartmentBrief, Subject } from "../../../types/types";
import { EmptyState } from "../../../components/empty-state";
import { BookOpen } from "lucide-react";

export default function SubjectListing({
  departments,
  subjects,
  schoolId,
}: {
  departments: DepartmentBrief[];
  subjects: Subject[];
  schoolId: string;
}) {
  const safeSubjects = subjects ?? [];

  return (
    <Card className="w-full border-blue-100 border-t-4 border-t-blue-600">
      <CardContent>
        <div className="p-3 sm:p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base sm:text-lg md:text-xl border-b border-blue-50 font-semibold">
              {safeSubjects.length} Subjects
            </h3>

            <div className="w-full sm:w-auto">
              <SubjectForm
                departments={departments.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
                schoolId={schoolId}
              />
            </div>
          </div>

          {/* Content */}
          <div className="mt-4">
            {safeSubjects.length > 0 ? (
              <div className="overflow-x-auto">
                <SubjectsByClassListing subjects={safeSubjects} />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <EmptyState
                  icon={BookOpen}
                  title="No subjects yet"
                  description="Create your first subject to get started"
                  className="min-h-[200px] sm:min-h-[250px] md:min-h-[300px]"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}