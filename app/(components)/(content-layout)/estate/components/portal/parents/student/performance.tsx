import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";

// Define structure for subject scores
interface SubjectScores {
  math: number;
  science: number;
  english: number;
}

// Define structure for a year's performance data
interface YearPerformance {
  [term: string]: SubjectScores;
}

// Define structure for all performance data
interface PerformanceRecord {
  [year: string]: YearPerformance;
}

interface PerformanceProps {
  selectedTerm: {
    term: string;
    year: string;
  };
}

export function Performance({ selectedTerm }: PerformanceProps) {
  // Type the mock data
  const performanceRecords: PerformanceRecord = {
    "2023": {
      "1": { math: 85, science: 92, english: 78 },
      "2": { math: 88, science: 90, english: 82 },
      "3": { math: 90, science: 94, english: 85 },
    },
    "2022": {
      "1": { math: 80, science: 88, english: 75 },
      "2": { math: 82, science: 89, english: 79 },
      "3": { math: 85, science: 91, english: 81 },
    },
  };

  // Default performance data
  const defaultPerformance: SubjectScores = {
    math: 0,
    science: 0,
    english: 0,
  };

  // Get current term's performance with type checking
  const currentTermPerformance: SubjectScores =
    performanceRecords[selectedTerm.year]?.[selectedTerm.term] ||
    defaultPerformance;

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Academic Performance
        </CardTitle>
        <p className="text-sm text-gray-500">
          Term {selectedTerm.term}, {selectedTerm.year}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Math</span>
            <span className="text-sm font-medium">
              {currentTermPerformance.math}%
            </span>
          </div>
          <Progress value={currentTermPerformance.math} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Science</span>
            <span className="text-sm font-medium">
              {currentTermPerformance.science}%
            </span>
          </div>
          <Progress value={currentTermPerformance.science} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">English</span>
            <span className="text-sm font-medium">
              {currentTermPerformance.english}%
            </span>
          </div>
          <Progress value={currentTermPerformance.english} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
