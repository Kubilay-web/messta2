"use client";
import {
  Activity,
  BookOpen,
  Calendar,
  Clock,
  Edit,
  Eye,
  FileText,
  ImageIcon,
  LucideImage,
  MessageSquare,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Progress } from "../../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import useSchoolStore from "../../../store/school";
import { RecentActivity, School, Section } from "../../../types/types";
import { timeAgo } from "../../../lib/getPastTime";
import Link from "next/link";
import { getSectionInfo, SectionType } from "../../../lib/sectionTypes";

export default function WelcomeSection({
  school,
  activities,
  incompleteSections,
  allSections,
}: {
  school: School | null;
  activities: RecentActivity[];
  incompleteSections: Section[];
  allSections: Section[];
}) {
  const percentCompletion = school?.siteCompletion ?? 0;
  const completedSections = percentCompletion / 10;
  const totalSections = school?.sectionCount ?? 0;
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome to {school?.name} Dashboard
          </h1>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link target="_blank" href={`/management/school/${school?.slug}`}>
                {" "}
                <Eye className="mr-2 h-4 w-4" />
                Preview Site
              </Link>
            </Button>
            {/* <Button size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Quick Edit
            </Button> */}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Website Completion</CardTitle>
              <CardDescription>Your website setup progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{percentCompletion}%</div>
                    <div className="text-sm text-muted-foreground">
                      completed
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {`${completedSections}/${totalSections}`} sections
                  </div>
                </div>
                <Progress value={85} className="h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium">
                      {completedSections} sections
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="font-medium">
                      {totalSections - completedSections} sections
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Incomplete Sections
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates to your website</CardDescription>
            </CardHeader>
            <CardContent>
              {activities && activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((item) => {
                    return (
                      <div key={item.id} className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Edit className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-[0.8rem] font-medium leading-none">
                            {item.activity}
                          </p>
                          <p className="text-[0.75rem] text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center pt-1">
                            <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {timeAgo(item.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="">
                  <p>No Activities Yet</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks you might want to do
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link href={`/management/school/${school?.slug}/customize/news`}>
                    <FileText className="mr-2 h-4 w-4" />
                    Add News Article
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href={`/management/school/${school?.slug}/customize/events`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule New Event
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href={`/management/school/${school?.slug}/customize/gallery-section`}>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Upload to Gallery
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href={`/management/school/${school?.slug}/customize/contact-section`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Update Contact Info
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="incomplete">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">
                Website Sections
              </h2>
              <TabsList>
                <TabsTrigger value="incomplete">Needs Attention</TabsTrigger>
                <TabsTrigger value="all">All Sections</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="incomplete" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {incompleteSections.map((section) => {
                  const sectionInfo = getSectionInfo(
                    section.type as SectionType
                  );
                  const Icon = sectionInfo.icon;
                  return (
                    <Card key={section.id}>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="space-y-1">
                          <CardTitle>{sectionInfo.title}</CardTitle>
                          <CardDescription>
                            {sectionInfo.subtitle}
                          </CardDescription>
                        </div>
                        <div className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                          Incomplete
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {sectionInfo.description}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link
                            href={`/management/school/${school?.slug}/customize${sectionInfo.href}`}
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            Set Up {sectionInfo.title}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="all" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {allSections.map((section, i) => {
                  const sectionInfo = getSectionInfo(
                    section.type as SectionType
                  );
                  const Icon = sectionInfo.icon;
                  return (
                    <Card key={i}>
                      <CardHeader className="flex flex-row items-start justify-between pb-2">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                              {sectionInfo.title}
                            </CardTitle>
                            <div
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                section.isComplete === true
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {section.isComplete ? "Complete" : "Incomplete"}
                            </div>
                          </div>
                          <CardDescription>
                            {sectionInfo.description}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardFooter className="pt-2">
                        <Button asChild className="w-full">
                          <Link
                            href={`/management/school/${school?.slug}/customize${sectionInfo.href}`}
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            Set Up {sectionInfo.title}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
