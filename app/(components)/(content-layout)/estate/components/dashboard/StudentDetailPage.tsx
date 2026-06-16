"use client";

import {
  Calendar,
  Phone,
  Mail,
  GraduationCap,
  Users,
  Receipt,
  LineChartIcon as ChartLineUp,
  Book,
  User,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Period, Student } from "../../types/types";
import { getInitials } from "../../lib/getInitials";
import { getNormalDate } from "../../lib/getNormalDate";
import { Button } from "../ui/button";
import GuardianForm from "./forms/students/GuadianForm";
import { useState } from "react";
import StudentFees, { Data } from "../StudentFees";
import StudentDocuments from "../StudentDocuments";

export default function StudentDetailPage({
  student,
  terms,
  schoolId
}: {
  student: Student;
  terms: Period[];
  schoolId:string;
}) {
  const guardian = student?.guardian;
  const [showEditForm, setShowEditForm] = useState(false);
  const details: Data = {
    studentProfileId: student?.id ?? "",
    studentUserId: student?.regNo ?? "",
    studentName: student?.name ?? "",
    parentProfileId: student?.parentId,
    parentUserId: student?.parentId,
    parentName: student?.parentName ?? "",
  };
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <Card className="max-w-6xl mx-auto border-blue-100 shadow-lg">
        {/* Header Section */}
        <div
          className="relative h-48 rounded-t-lg overflow-hidden z-[9999px]"
          style={{
            backgroundImage: `url('/management/bg.jpg?height=400&width=1200')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "soft-light",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-75" />
          <div className="absolute bottom-[19%] left-8 flex items-end gap-6">
            <Avatar className="h-32 w-32 border-4 border-blue-600 shadow-xl">
              <AvatarImage src={`${student.imageUrl}`} alt={student.name} />
              <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
            </Avatar>
            <div className="mb-8 text-white">
              <h1 className="text-3xl font-bold">{student.name}</h1>
              <p className="text-blue-100 capitalize">
                {/* {student.gender.toLowerCase()} / Student */}
                {student.regNo}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="pt-5 pb-8  -z-50">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-blue-100 border-t-4 border-t-blue-600">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Class/Stream</p>
                  <p className="font-semibold">
                    {student.classTitle}/{" "}
                    <span className="text-muted-foreground">
                      {student.streamTitle}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-100 border-t-4 border-t-blue-600">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                   <p className="font-semibold">{getNormalDate(student.dob)}</p> 
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-100 border-t-4 border-t-blue-600">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{student.phone}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-100 border-t-4 border-t-blue-600">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Guardian/Parent</p>
                  <p className="font-semibold line-clamp-1">
                    {student.parentName}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start bg-blue-50/50 p-0 h-auto flex-wrap">
              {[
                { id: "details", label: "Basic Details", icon: User },
                { id: "parents", label: "Parent Information", icon: Users },
                { id: "fees", label: "Fees", icon: Receipt },
                {
                  id: "promotion",
                  label: "Promotion History",
                  icon: ChartLineUp,
                },

                { id: "documents", label: "Documents", icon: FileText },
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

            <TabsContent value="details" className="mt-6">
              <Card className="border-blue-100 border-t-4 border-t-blue-600 ">
                <CardHeader className="border-b border-blue-50">
                  <h3 className="text-lg font-semibold">
                    Personal Information
                  </h3>
                </CardHeader>
                <CardContent className="grid gap-4 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{student.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Student Reg No</p>
                      <p className="font-medium">{student.regNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Class/Stream</p>
                      <p className="font-medium">
                        {student.classTitle}/{" "}
                        <span className="text-muted-foreground">
                          {student.streamTitle}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">
                        {getNormalDate(student.dob)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{student.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Admission Date</p>
                      <p className="font-medium">
                        {getNormalDate(student.admissionDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">{student.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{student.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Religion</p>
                      <p className="font-medium">{student.religion}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nationality</p>
                      <p className="font-medium">{student.nationality}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">State</p>
                      <p className="font-medium">{student.state}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{student.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="parents" className="mt-6">
              <Card className="border-blue-100 border-t-4 border-t-blue-600">
                <CardHeader className="border-b border-blue-50 ">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Parent/Guardian Information
                    </h3>
                    {guardian && (
                      <Button onClick={() => setShowEditForm(!showEditForm)}>
                        {showEditForm ? "Close" : "Edit"}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                {showEditForm ? (
                  <CardContent className="p-6">
                    <GuardianForm
                      initialData={guardian}
                      studentId={student.id}
                      editingId={guardian?.id}
                    />
                  </CardContent>
                ) : (
                  <CardContent className="p-6">
                    {student?.guardian ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Father's Information */}
                        <Card className="border-blue-100 ">
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-16 w-16 border-2 border-blue-100">
                                <AvatarFallback className="bg-blue-50 text-blue-600">
                                  FN
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="text-lg font-semibold">
                                  Father's Details
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Primary Guardian
                                </p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Full Name
                                </p>
                                <p className="font-medium">
                                  {guardian?.fatherFullName}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Occupation
                                </p>
                                <p className="font-medium">
                                  {guardian?.fatherOccupation}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Phone Number
                                </p>
                                <p className="font-medium">
                                  {guardian?.fatherPhoneNumber}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">
                                  {guardian?.fatherEmail}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-sm text-gray-500">
                                  Office Address
                                </p>
                                <p className="font-medium">
                                  {guardian?.fatherOfficeAddress}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Mother's Information */}
                        <Card className="border-blue-100">
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-16 w-16 border-2 border-blue-100">
                                <AvatarFallback className="bg-blue-50 text-blue-600">
                                  MN
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="text-lg font-semibold">
                                  Mother's Details
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Secondary Guardian
                                </p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Full Name
                                </p>
                                <p className="font-medium">
                                  {guardian?.motherFullName}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Occupation
                                </p>
                                <p className="font-medium">
                                  {guardian?.motherOccupation}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Phone Number
                                </p>
                                <p className="font-medium">
                                  {guardian?.motherPhoneNumber}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">
                                  {guardian?.motherEmail}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-sm text-gray-500">
                                  Office Address
                                </p>
                                <p className="font-medium">
                                  {guardian?.motherOfficeAddress}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Emergency Contact */}
                        <Card className="border-blue-100 lg:col-span-2">
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                  <Phone className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold">
                                    Emergency Contact
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    Additional Contact Person
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className="border-blue-200 text-blue-600"
                              >
                                Local Guardian
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Full Name
                                </p>
                                <p className="font-medium">
                                  {guardian?.emergencyContactName}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Relationship
                                </p>
                                <p className="font-medium">
                                  {guardian?.emergencyContactRelation}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Contact Number
                                </p>
                                <p className="font-medium">
                                  {guardian?.emergencyContactNumber}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="">
                        <GuardianForm studentId={student.id} />
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </TabsContent>
            <TabsContent value="fees" className="mt-6">
              <StudentFees
                terms={terms}
                classTitle={student.classTitle ?? ""}
                schoolId={schoolId}
                data={details}
              />
            </TabsContent>
            <TabsContent value="documents" className="mt-6">
              <StudentDocuments studentId={student.id} />
            </TabsContent>

            {/* Other tab contents would follow the same pattern */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
