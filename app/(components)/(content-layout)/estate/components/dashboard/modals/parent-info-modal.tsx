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
//   Briefcase,
//   Calendar,
//   Clock,
//   Edit,
//   Trash2,
// } from "lucide-react";
// import { Parent } from "../../../types/types";

// interface ParentInfoModalProps {
//   parent: Parent;
// }

// export function ParentInfoModal({ parent }: ParentInfoModalProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline">View Parent Info</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[800px]">
//         <DialogHeader>
//           <DialogTitle>Parent Information</DialogTitle>
//         </DialogHeader>
//         <div className="flex justify-end space-x-2 mb-4">
//           <Button variant="outline" size="sm" className="flex items-center">
//             <Edit className="w-4 h-4 mr-2" />
//             Edit
//           </Button>
//           <Button variant="destructive" size="sm" className="flex items-center">
//             <Trash2 className="w-4 h-4 mr-2" />
//             Delete
//           </Button>
//         </div>
//         <ScrollArea className="max-h-[80vh] pr-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-4">
//                 <Avatar className="w-16 h-16">
//                   <AvatarImage
//                     src={parent.imageUrl}
//                     alt={`${parent.firstName} ${parent.lastName}`}
//                   />
//                   <AvatarFallback>
//                     {parent.firstName[0]}
//                     {parent.lastName[0]}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <h2 className="text-2xl font-bold">
//                     {parent.title} {parent.firstName} {parent.lastName}
//                   </h2>
//                   <p className="text-muted-foreground">{parent.relationship}</p>
//                 </div>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InfoItem
//                   icon={<Mail className="w-4 h-4" />}
//                   label="Email"
//                   value={parent.email}
//                 />
//                 <InfoItem
//                   icon={<Phone className="w-4 h-4" />}
//                   label="Phone"
//                   value={parent.phone}
//                 />
//                 <InfoItem
//                   icon={<Phone className="w-4 h-4" />}
//                   label="WhatsApp"
//                   value={parent.whatsapNo}
//                 />
//                 <InfoItem
//                   icon={<User className="w-4 h-4" />}
//                   label="Gender"
//                   value={parent.gender}
//                 />
//                 <InfoItem
//                   icon={<Calendar className="w-4 h-4" />}
//                   label="Date of Birth"
//                   value={format(new Date(parent.dob), "PPP")}
//                 />
//                 <InfoItem
//                   icon={<Flag className="w-4 h-4" />}
//                   label="Nationality"
//                   value={parent.nationality}
//                 />
//                 <InfoItem
//                   icon={<User className="w-4 h-4" />}
//                   label="National ID/Passport"
//                   value={parent.NIN}
//                 />
//                 <InfoItem
//                   icon={<Mail className="w-4 h-4" />}
//                   label="Preferred Contact"
//                   value={parent.contactMethod}
//                 />
//                 <InfoItem
//                   icon={<Briefcase className="w-4 h-4" />}
//                   label="Occupation"
//                   value={parent.occupation}
//                 />
//               </div>
//               <InfoItem
//                 icon={<MapPin className="w-4 h-4" />}
//                 label="Address"
//                 value={parent.address}
//               />
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
//                 <InfoItem
//                   icon={<Clock className="w-4 h-4" />}
//                   label="Created At"
//                   value={format(new Date(parent.createdAt), "PPP")}
//                 />
//                 <InfoItem
//                   icon={<Clock className="w-4 h-4" />}
//                   label="Updated At"
//                   value={format(new Date(parent.updatedAt), "PPP")}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }

// function InfoItem({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex items-center gap-2">
//       {icon}
//       <span className="font-medium">{label}:</span>
//       <span>{value}</span>
//     </div>
//   );
// }













import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { ScrollArea } from "../../../components/ui/scroll-area";
import {
  User,
  Mail,
  Phone,
  Flag,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Edit,
  Trash2,
} from "lucide-react";
import { Parent } from "../../../types/types";

interface ParentInfoModalProps {
  parent: Parent;
}

export function ParentInfoModal({ parent }: ParentInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white text-gray-900 hover:bg-gray-100 border-gray-300">
          View Parent Info
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-white text-gray-900 border-gray-200">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Parent Information
          </DialogTitle>
        </DialogHeader>
        

        <ScrollArea className="max-h-[80vh] pr-4">
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-gray-200">
                  <AvatarImage
                    src={parent.imageUrl}
                    alt={`${parent.firstName} ${parent.lastName}`}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-100 text-gray-700 text-lg">
                    {parent.firstName[0]}{parent.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {parent.title} {parent.firstName} {parent.lastName}
                  </h2>
                  <p className="text-gray-600 font-medium">{parent.relationship}</p>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="grid gap-6 pt-6">
              {/* Ana Bilgiler */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  icon={<Mail className="w-4 h-4 text-gray-600" />}
                  label="Email"
                  value={parent.email}
                />
                <InfoItem
                  icon={<Phone className="w-4 h-4 text-gray-600" />}
                  label="Phone"
                  value={parent.phone}
                />
                <InfoItem
                  icon={<Phone className="w-4 h-4 text-gray-600" />}
                  label="WhatsApp"
                  value={parent.whatsapNo || "—"}
                />
                <InfoItem
                  icon={<User className="w-4 h-4 text-gray-600" />}
                  label="Gender"
                  value={parent.gender}
                />
                <InfoItem
                  icon={<Calendar className="w-4 h-4 text-gray-600" />}
                  label="Date of Birth"
                  value={format(new Date(parent.dob), "PPP")}
                />
                <InfoItem
                  icon={<Flag className="w-4 h-4 text-gray-600" />}
                  label="Nationality"
                  value={parent.nationality}
                />
                <InfoItem
                  icon={<User className="w-4 h-4 text-gray-600" />}
                  label="National ID/Passport"
                  value={parent.NIN}
                />
                <InfoItem
                  icon={<Mail className="w-4 h-4 text-gray-600" />}
                  label="Preferred Contact"
                  value={parent.contactMethod}
                />
                <InfoItem
                  icon={<Briefcase className="w-4 h-4 text-gray-600" />}
                  label="Occupation"
                  value={parent.occupation}
                />
              </div>

              {/* Adres Bilgisi - Tam Genişlik */}
              <div className="border-t border-gray-100 pt-4">
                <InfoItem
                  icon={<MapPin className="w-4 h-4 text-gray-600" />}
                  label="Address"
                  value={parent.address}
                  fullWidth
                />
              </div>

              {/* Zaman Bilgileri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                <InfoItem
                  icon={<Clock className="w-4 h-4 text-gray-500" />}
                  label="Created At"
                  value={format(new Date(parent.createdAt), "PPP 'at' p")}
                  muted
                />
                <InfoItem
                  icon={<Clock className="w-4 h-4 text-gray-500" />}
                  label="Updated At"
                  value={format(new Date(parent.updatedAt), "PPP 'at' p")}
                  muted
                />
              </div>

              {/* Okul Bilgileri (Parent modelinde varsa) */}
              {parent.schoolName && (
                <div className="border-t border-gray-100 pt-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">School:</span> {parent.schoolName}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({
  icon,
  label,
  value,
  fullWidth = false,
  muted = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  fullWidth?: boolean;
  muted?: boolean;
}) {
  const textColor = muted ? "text-gray-500" : "text-gray-900";
  
  return (
    <div className={`flex items-start gap-3 ${fullWidth ? 'col-span-2' : ''}`}>
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </p>
        <p className={`text-base font-medium ${textColor} break-words`}>
          {value}
        </p>
      </div>
    </div>
  );
}