"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Calendar,
  GraduationCap,
  LibrarySquare,
  LucideIcon,
  MapPin,
  MessageCircle,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";
import { TeacherAnalyticsData } from "../../actions/analytics";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import useSchoolStore from "../../store/school";
export type TeacherAnalyticsProps = {
  title: string;
  count: number;
  icon: LucideIcon;
  unit: string;
  detailLink: string;
};

export default function TeacherAnalytics({
  data,
}: {
  data: TeacherAnalyticsData;
}) {
  const analytics: TeacherAnalyticsProps[] = [
    {
      title: "Total Students",
      count: data.students,
      icon: GraduationCap,
      unit: "",
      detailLink: "/management/portal/teachers/students",
    },
    {
      title: "Exams",
      count: data.exams,
      icon: LibrarySquare,
      unit: "",
      detailLink: "/management/portal/teachers/exams",
    },
    {
      title: "Reminders",
      count: data.reminders,
      icon: MessageCircle,
      unit: "",
      detailLink: "/management/portal/teachers/inbox",
    },
    {
      title: "Rating",
      count: 4.8,
      icon: Star,
      unit: "",
      detailLink: "/management/analytics/ratings",
    },
  ];
  const recentStudents = data.recentStudents || [];
  const recentEvents = data.recentEvents;

  const { school } = useSchoolStore();
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };
  return (
    <div className="">
      {/* Tables Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        {analytics.map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i} className="border-t-4 border-t-blue-600">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {item.unit}
                  {item.count.toString().padStart(2, "0")}
                </div>
                <Link href={item.detailLink} className="text-xs text-blue-600">
                  View Details
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Students Table */}

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              <div className="flex items-center justify-between">
                <h2>Recent Students</h2>
                <Link
                  href="/management/dashboard/students"
                  className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  View all students
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  {/* <TableHead>Reg No.</TableHead> */}
                  <TableHead>Gender</TableHead>
                  <TableHead>Class</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.length > 0 ? (
                  recentStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <h2> {student.name}</h2>
                          <h2 className="text-sm text-muted-foreground">
                            {student.regNo}
                          </h2>
                        </div>
                      </TableCell>
                      {/* <TableCell></TableCell> */}
                      <TableCell>
                        <Badge
                          variant={
                            student.gender === "MALE" ? "default" : "secondary"
                          }
                        >
                          {student.gender.charAt(0) +
                            student.gender.slice(1).toLowerCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.class.title}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p className="p-4 text-center">No Students</p>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Events Table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              <div className="flex items-center justify-between">
                <h2>Upcoming Events</h2>
                <Link
                  href={`/management/school/${school?.slug}/customize/events`}
                  className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  View all events
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  {/* <TableHead>Date</TableHead> */}
                  {/* <TableHead>Time</TableHead> */}
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEvents.length > 0 ? (
                  recentEvents.map((event) => {
                    return (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <h2> {event.title}</h2>
                            <h2 className="text-sm text-muted-foreground">
                              {formatDate(event.date)}
                            </h2>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col">
                            <h2>
                              {event.startTime} - {event.endTime}
                            </h2>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <p className="p-4 text-center">No Events Data</p>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
