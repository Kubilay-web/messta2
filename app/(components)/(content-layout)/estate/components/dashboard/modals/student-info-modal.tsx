// import { useState } from "react";
// import { format } from "date-fns";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../../../components/ui/dialog";
// import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
// import { Button } from "../../../components/ui/button";
// import { ScrollArea } from "../../../components/ui/scroll-area";
// import {
//   User,
//   Mail,
//   Phone,
//   Flag,
//   MapPin,
//   School,
//   Calendar,
//   Clock,
//   Edit,
//   Trash2,
//   Book,
//   Hash,
//   Grid2X2,
// } from "lucide-react";
// import { Student } from "../../../types/types";
// import Image from "next/image";
// import { Table, TableBody, TableCell, TableRow } from "../../../components/ui/table";
// import { getNormalDate } from "../../../lib/getNormalDate";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../../../components/ui/tooltip";
// interface StudentInfoModalProps {
//   student: Student;
// }

// export function StudentInfoModal({ student }: StudentInfoModalProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleEdit = () => {
//     // onEdit(student)
//     setIsOpen(false);
//   };

//   const handleDelete = () => {
//     // onDelete(student)
//     setIsOpen(false);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <DialogTrigger asChild>
//               <Button size={"icon"} variant="outline">
//                 <Grid2X2 />
//               </Button>
//             </DialogTrigger>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Quick View</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       <DialogContent className="sm:max-w-[800px]">
//         <DialogHeader>
//           <DialogTitle className="text-center">Student Quick View</DialogTitle>
//         </DialogHeader>
//         <div className="flex flex-col items-center space-y-4">
//           <div className="relative w-32 h-32">
//             <div className="absolute inset-0 rounded-full border-4 border-orange-400" />
//             <Image
//               src={student.imageUrl}
//               alt={student.name}
//               width={128}
//               height={128}
//               className="rounded-2xl object-cover"
//             />
//           </div>
//           <div className="text-center">
//             <h2 className="text-2xl font-semibold">Danielle Solomon</h2>
//             <p className="text-muted-foreground capitalize">
//               {student.gender.toLowerCase()} / Student
//             </p>
//           </div>
//           <Table className="border">
//             <TableBody>
//               <TableRow>
//                 <TableCell className="font-medium">Register No</TableCell>
//                 <TableCell>{student.regNo}</TableCell>
//                 <TableCell className="font-medium">Roll</TableCell>
//                 <TableCell>{student.rollNo}</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell className="font-medium">Admission Date</TableCell>
//                 <TableCell>{getNormalDate(student.createdAt)}</TableCell>
//                 <TableCell className="font-medium">Date Of Birth</TableCell>
//                 <TableCell>{getNormalDate(student.dob)}</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell className="font-medium">Email</TableCell>
//                 <TableCell>{student.email}</TableCell>
//                 <TableCell className="font-medium">Religion</TableCell>
//                 <TableCell>{student.religion}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell className="font-medium">Mobile No</TableCell>
//                 <TableCell>{student.phone}</TableCell>
//                 <TableCell className="font-medium">State</TableCell>
//                 <TableCell>{student.state}</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell className="font-medium">Address</TableCell>
//                 <TableCell colSpan={3}>{student.address}</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }










"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import {
  Grid2X2,
} from "lucide-react";
import { Student } from "../../../types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../../components/ui/table";
import { getNormalDate } from "../../../lib/getNormalDate";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

interface StudentInfoModalProps {
  student: Student;
}

export function StudentInfoModal({ student }: StudentInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="bg-white text-black border-gray-300 hover:bg-gray-100"
              >
                <Grid2X2 />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-black border border-gray-200">
            <p>Quick View</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="w-[95vw] max-w-2xl bg-white text-black overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-black">
            Student Quick View
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          {/* Avatar */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            <div />
            <Image
              src={student.imageUrl}
              alt={student.name}
              width={128}
              height={128}
              className="rounded-full object-cover"
            />
          </div>

          {/* Name */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-black">
              {student.name}
            </h2>
            <p className="text-gray-500 capitalize">
              {student.gender.toLowerCase()} / Student
            </p>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <Table className="border border-gray-200 bg-white text-black text-xs sm:text-sm">
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Register No</TableCell>
                  <TableCell>{student.regNo}</TableCell>
                  <TableCell className="font-medium">Roll</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Admission Date</TableCell>
                  <TableCell>{getNormalDate(student.createdAt)}</TableCell>
                  <TableCell className="font-medium">Date Of Birth</TableCell>
                  <TableCell>{getNormalDate(student.dob)}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell className="break-all">{student.email}</TableCell>
                  <TableCell className="font-medium">Religion</TableCell>
                  <TableCell>{student.religion}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Mobile No</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell className="font-medium">State</TableCell>
                  <TableCell>{student.state}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Address</TableCell>
                  <TableCell colSpan={3} className="break-words">
                    {student.address}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}