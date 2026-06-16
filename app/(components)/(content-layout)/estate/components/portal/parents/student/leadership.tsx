import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Award } from "lucide-react";

// Define structure for a term's leadership data
type TermLeadership = string[];

// Define structure for a year's leadership data
interface YearLeadership {
  [term: string]: TermLeadership;
}

// Define structure for all leadership data
interface LeadershipRecord {
  [year: string]: YearLeadership;
}

interface LeadershipProps {
  selectedTerm: {
    term: string;
    year: string;
  };
}

export function Leadership({ selectedTerm }: LeadershipProps) {
  // Type the mock data
  const leadershipData: LeadershipRecord = {
    "2023": {
      "1": [
        "Class Representative",
        "Science Club President",
        "Basketball Team Captain",
        "Volunteer at Local Animal Shelter",
      ],
      "2": [
        "Class Representative",
        "Science Club President",
        "Debate Team Member",
        "Math Olympiad Participant",
      ],
      "3": [
        "Student Council Member",
        "Science Fair Organizer",
        "Basketball Team Captain",
        "Environmental Club Leader",
      ],
    },
    "2022": {
      "1": [
        "Class Monitor",
        "Science Club Member",
        "Junior Basketball Team",
        "Art Club Participant",
      ],
      "2": [
        "Class Monitor",
        "Science Club Vice President",
        "Junior Basketball Team",
        "School Newsletter Editor",
      ],
      "3": [
        "Class Representative",
        "Science Club President",
        "Junior Basketball Team Captain",
        "Volunteer at Local Library",
      ],
    },
  };

  // Get current term's leadership data with type checking
  const currentTermLeadership: string[] =
    leadershipData[selectedTerm.year]?.[selectedTerm.term] || [];

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          Leadership & Activities
        </CardTitle>
        <Award className="h-6 w-6 text-blue-600" />
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-sm text-gray-500">
          Term {selectedTerm.term}, {selectedTerm.year}
        </p>
        <ul className="list-disc list-inside space-y-2">
          {currentTermLeadership.map((activity: string, index: number) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
