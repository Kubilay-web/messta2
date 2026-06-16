import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { BriefStudent } from "./StudentList";
function calculateAge(dateString: string): number {
  // Parse the date string into a Date object
  const birthDate = new Date(dateString);

  // Get current date
  const currentDate = new Date();

  // Get the difference in years
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Get current month and birth month for more precise calculation
  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDate.getMonth();

  // Adjust age if birthday hasn't occurred this year
  if (
    birthMonth > currentMonth ||
    (birthMonth === currentMonth && birthDate.getDate() > currentDate.getDate())
  ) {
    age--;
  }
  return age;
}
export function StudentCard({ student }: { student: BriefStudent }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Image
            src={student.imageUrl}
            alt={student.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <CardTitle className="text-lg">{student.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{student.regNo}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <p>
            <span className="font-semibold">Class:</span> {student.classTitle}
          </p>
          <p>
            <span className="font-semibold">Stream:</span> {student.streamTitle}
          </p>
          <p>
            <span className="font-semibold">Age:</span>{" "}
            {calculateAge(student.dob)}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/management/portal/parent/student/${student.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
