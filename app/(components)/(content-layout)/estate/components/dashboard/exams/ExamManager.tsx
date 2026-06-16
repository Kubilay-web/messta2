"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import ExamListing from "./ExamListing";
import ExamForm from "./ExamForm";
import MarkSheetForm from "./MarkSheetForm";
import MarkSheetListing from "./MarkSheetListing";
import { Book, BookDashed, BookOpen, LayoutGrid, Receipt } from "lucide-react";
import { ClassBrief, Exam, Period, SubjectBrief } from "../../../types/types";
import { EmptyState } from "../../../components/empty-state";

export default function ExamManager({
  terms,
  classes,
  subjects,
  exams,
  schoolId 
}: {
  terms: Period[];
  classes: ClassBrief[];
  subjects: SubjectBrief[];
  exams: Exam[];
  schoolId:string;
}) {
  const [activeTab, setActiveTab] = useState("exam-listing");

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full max-w-6xl mx-auto"
    >
      <TabsList className="w-full justify-start bg-blue-50/50 p-0 h-auto flex-wrap">
        {[
          { id: "exam-listing", label: "Exam Listing", icon: Book },
          { id: "create-exam", label: "Create Exam", icon: BookDashed },
          {
            id: "mark-sheet-form",
            label: "Enter student Marks",
            icon: Receipt,
          },
          {
            id: "mark-sheet-listing",
            label: "Marksheet Listing",
            icon: LayoutGrid,
          },
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

      <TabsContent value="exam-listing">
        <ExamListing exams={exams} />
      </TabsContent>
      <TabsContent value="create-exam">
        {/* */}
        {subjects && subjects.length > 0 ? (
          <ExamForm terms={terms} subjects={subjects} classes={classes} schoolId={schoolId} />
        ) : (
          <EmptyState
            icon={BookOpen}
            title="No subjects yet"
            description="Create Subjects first in order to Create exam"
            className="min-h-[300px] h-full"
          />
        )}
      </TabsContent>
      <TabsContent value="mark-sheet-form">
        {subjects && subjects.length > 0 ? (
          <MarkSheetForm
            subjects={subjects}
            classes={classes}
            terms={terms}
            exams={exams}
            schoolId={schoolId}
          />
        ) : (
          <EmptyState
            icon={BookOpen}
            title="No subjects yet"
            description="Create Subjects first in order to enter marks"
            className="min-h-[300px] h-full"
          />
        )}
      </TabsContent>
      <TabsContent value="mark-sheet-listing">
        {/* */}
        {subjects && subjects.length > 0 ? (
          <MarkSheetListing
            subjects={subjects}
            classes={classes}
            terms={terms}
            exams={exams}
          />
        ) : (
          <EmptyState
            icon={BookOpen}
            title="No subjects yet"
            description="Create Subjects first in order to see MarkSheets"
            className="min-h-[300px] h-full"
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
