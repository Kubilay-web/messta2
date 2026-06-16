import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Calendar } from "lucide-react";

// Define the structure of attendance data for a single term
interface TermAttendance {
  percentage: number;
  present: number;
  absent: number;
}

// Define the structure of attendance data for a year
interface YearAttendance {
  [term: string]: TermAttendance;
}

// Define the structure of all attendance data
interface AttendanceRecord {
  [year: string]: YearAttendance;
}

// Define the props type
interface AttendanceProps {
  selectedTerm: {
    term: string;
    year: string;
  };
}

export function Attendance({ selectedTerm }: AttendanceProps) {
  // Type the mock data
  const attendanceData: AttendanceRecord = {
    "2023": {
      "1": { percentage: 95, present: 57, absent: 3 },
      "2": { percentage: 97, present: 58, absent: 2 },
      "3": { percentage: 93, present: 56, absent: 4 },
    },
    "2022": {
      "1": { percentage: 94, present: 56, absent: 4 },
      "2": { percentage: 96, present: 58, absent: 2 },
      "3": { percentage: 92, present: 55, absent: 5 },
    },
  };

  // Get the current term's attendance with proper type checking
  const currentTermAttendance: TermAttendance = attendanceData[
    selectedTerm.year
  ]?.[selectedTerm.term] || {
    percentage: 0,
    present: 0,
    absent: 0,
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Attendance</CardTitle>
        <Calendar className="h-6 w-6 text-blue-600" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-blue-600">
          {currentTermAttendance.percentage}%
        </div>
        <p className="text-sm text-gray-500">
          Present: {currentTermAttendance.present} days
        </p>
        <p className="text-sm text-gray-500">
          Absent: {currentTermAttendance.absent} days
        </p>
        <p className="mt-2 text-sm font-medium">
          Term {selectedTerm.term}, {selectedTerm.year}
        </p>
      </CardContent>
    </Card>
  );
}
