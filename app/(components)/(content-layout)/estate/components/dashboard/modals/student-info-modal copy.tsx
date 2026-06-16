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
  School,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Book,
  Hash,
  Grid2X2,
} from "lucide-react";
import { Student } from "../../../types/types";

interface StudentInfoModalProps {
  student: Student;
}

export function StudentInfoModal({ student }: StudentInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    // onEdit(student)
    setIsOpen(false);
  };

  const handleDelete = () => {
    // onDelete(student)
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant="outline">
          <Grid2X2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Student Information</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={handleEdit}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex items-center"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
        <ScrollArea className="max-h-[80vh] pr-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={student.imageUrl} alt={student.name} />
                  <AvatarFallback>
                    {student.firstName[0]}
                    {student.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{student.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    Student ID: {student.id}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value={student.email}
                />
                <InfoItem
                  icon={<Phone className="w-4 h-4" />}
                  label="Phone"
                  value={student.phone}
                />
                <InfoItem
                  icon={<User className="w-4 h-4" />}
                  label="Gender"
                  value={student.gender}
                />
                <InfoItem
                  icon={<Calendar className="w-4 h-4" />}
                  label="Date of Birth"
                  value={format(new Date(student.dob), "PPP")}
                />
                <InfoItem
                  icon={<Flag className="w-4 h-4" />}
                  label="Nationality"
                  value={student.nationality}
                />
                <InfoItem
                  icon={<User className="w-4 h-4" />}
                  label="Religion"
                  value={student.religion}
                />
                <InfoItem
                  icon={<MapPin className="w-4 h-4" />}
                  label="State"
                  value={student.state}
                />
                <InfoItem
                  icon={<Hash className="w-4 h-4" />}
                  label="BCN"
                  value={student.BCN}
                />
                <InfoItem
                  icon={<School className="w-4 h-4" />}
                  label="Class"
                  value={student?.classTitle || student.classId}
                />
                <InfoItem
                  icon={<Book className="w-4 h-4" />}
                  label="Stream"
                  value={student?.streamTitle || student.streamId}
                />
                <InfoItem
                  icon={<Hash className="w-4 h-4" />}
                  label="Roll No"
                  value={student.rollNo}
                />
                <InfoItem
                  icon={<Hash className="w-4 h-4" />}
                  label="Reg No"
                  value={student.regNo}
                />
                <InfoItem
                  icon={<Calendar className="w-4 h-4" />}
                  label="Admission Date"
                  value={format(new Date(student.admissionDate), "PPP")}
                />
                <InfoItem
                  icon={<User className="w-4 h-4" />}
                  label="Parent"
                  value={student?.parentName || student.parentId}
                />
              </div>
              <InfoItem
                icon={<MapPin className="w-4 h-4" />}
                label="Address"
                value={student.address}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <InfoItem
                  icon={<Clock className="w-4 h-4" />}
                  label="Created At"
                  value={format(new Date(student.createdAt), "PPP")}
                />
                <InfoItem
                  icon={<Clock className="w-4 h-4" />}
                  label="Updated At"
                  value={format(new Date(student.updatedAt), "PPP")}
                />
              </div>
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
