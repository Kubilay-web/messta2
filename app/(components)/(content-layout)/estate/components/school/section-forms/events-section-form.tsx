"use client";

import type React from "react";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Calendar,
  Clock,
  MapPin,
  Loader2,
} from "lucide-react";
import Image from "next/image";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Switch } from "../../../components/ui/switch";
import { EventData, Section } from "../../../types/types";
import { toast } from "sonner";
import {
  addEventItem,
  createActivity,
  updateSection,
} from "../../../actions/site";
import { getFormattedDate } from "../../../lib/getFormatedDate";
import { UploadButton } from "../../../lib/uploadthing";
import useSchoolStore from "../../../store/school";

// Define the Event interface
export interface Event {
  title: string;
  description: string;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  schoolId: string;
}

export default function EventsSectionForm({
  section,
  recentEvents,
  schoolId
}: {
  section: Section;
  recentEvents: EventData[];
  schoolId:string;
}) {
  // Section header
  const [sectionTitle, setSectionTitle] = useState(section.title);
  const [viewDescriptionText, setViewDescriptionText] = useState(
    section.subtitle,
  );

  // Events
  const [events, setEvents] = useState<Event[]>([]);

  // New/Edit event form
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event>({
    title: "",
    description: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "10:00",
    location: "",
    schoolId: "",
  });
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);

  // Preview state
  const [previewSectionTitle, setPreviewSectionTitle] = useState(sectionTitle);
  const [previewDescriptionText, setPreviewDescriptionText] =
    useState(viewDescriptionText);
  const [previewViewAllText, setPreviewViewAllText] =
    useState(viewDescriptionText);
  const { school } = useSchoolStore();
  const [previewEvents, setPreviewEvents] = useState<EventData[]>([
    ...recentEvents,
  ]);
  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [EventImage, setEventImage] = useState("");

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }).toUpperCase(),
    };
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? "pm" : "am";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Add/Edit event
  const saveEvent = async () => {
    if (tempImageSrc && currentEvent.title && currentEvent.description) {
      try {
        setLoading(true);
        const newEvent: Event = {
          ...currentEvent,
          schoolId: schoolId ?? "",
          image: tempImageSrc,
        };
        await addEventItem(newEvent);
        setLoading(false);
        toast.success("New News Item Added successfully");
        // Reset form
        setCurrentEvent({
          title: "",
          description: "",
          image: "",
          date: new Date().toISOString().split("T")[0],
          startTime: "09:00",
          endTime: "10:00",
          location: "",
          schoolId: schoolId ?? "",
        });
        setTempImageSrc(null);
        setIsEditMode(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  // Edit event
  const editEvent = (event: Event) => {
    setCurrentEvent(event);
    setTempImageSrc(event.image);
    setIsEditMode(true);
  };

  // Delete event
  const deleteEvent = (id: string) => {
    console.log(id);
  };

  // Save all changes
  const saveChanges = async () => {
    setLoading(true);
    setSectionTitle(previewSectionTitle);
    setViewDescriptionText(previewDescriptionText);
    // setEvents([...previewEvents]);
    const data = {
      title: previewSectionTitle,
      subtitle: previewDescriptionText,
    };

    try {
      // console.log(data);
      await updateSection(section.id, data);
      setLoading(false);
      toast.success("Events section updated", {
        description: " Events section Updated Successfully ",
      });
      const activity = {
        activity: `Events section Updated Successfully`,
        description: `Admin Updated the Events section `,
        time: getFormattedDate(new Date()),
        schoolId: section.schoolId,
      };
      await createActivity(activity);
    } catch (error) {
      setLoading(false);
      toast.error("Events section update Failed", {
        description: " Events section Failed to update ",
      });
      console.log(error);
    }
  };

  // Reset changes
  const resetChanges = () => {
    setPreviewSectionTitle(sectionTitle);
    setPreviewDescriptionText(viewDescriptionText);
  };

  // Sort events by date
  const sortedEvents = [...previewEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/schoolmanage/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setEventImage(data.url);
        setTempImageSrc(data.url); 
        toast.success("Image uploaded");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Tabs defaultValue="header" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="header">Section Header</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        {/* Header Tab */}
        <TabsContent value="header" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Header</CardTitle>
              <CardDescription>
                Update the events section title and "View All" link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="section-title">Section Title</Label>
                  <Input
                    id="section-title"
                    value={previewSectionTitle}
                    onChange={(e) => setPreviewSectionTitle(e.target.value)}
                    placeholder="Enter section title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gallery-description">
                    Events Description
                  </Label>
                  <Textarea
                    id="events-description"
                    value={previewDescriptionText ?? ""}
                    onChange={(e) => setPreviewDescriptionText(e.target.value)}
                    placeholder="Enter news description"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetChanges}>
                Reset
              </Button>
              {loading ? (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Saving Please wait...
                </Button>
              ) : (
                <Button onClick={saveChanges}>Save Changes</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Manage the events in your section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 bg-white text-black">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px] bg-white text-black">
                  <DialogHeader>
                    <DialogTitle>
                      {isEditMode ? "Edit Event" : "Add Event"}
                    </DialogTitle>
                    <DialogDescription>
                      Fill in the details for the event.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 pb-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="news-title">Title</Label>
                        <Input
                          id="event-title"
                          value={currentEvent.title}
                          onChange={(e) => {
                            setCurrentEvent({
                              ...currentEvent,
                              title: e.target.value,
                            });
                          }}
                          placeholder="Enter event title"
                        />
                      </div>
                      <div className="flex flex-col ">
                        <Label className="text-center" htmlFor="news-image">
                          Event Image
                        </Label>
                        {/* <div className="flex items-start gap-4 mt-3 justify-center">
                          <UploadButton
                            className=""
                            endpoint="logoImage"
                            onClientUploadComplete={(res) => {
                              // Do something with the response
                              console.log("Files: ", res);
                              ``;
                              // logoImage(res[0].url);
                              setTempImageSrc(res[0].url);
                            }}
                            onUploadError={(error: Error) => {
                              // Do something with the error.
                              console.log(error);
                              alert(`ERROR! ${error.message}`);
                            }}
                          />
                          <Image
                            alt="news image"
                            src={tempImageSrc ?? "/school/news-1.jpg"}
                            width={300}
                            height={300}
                            className="w-20 rounded-xl"
                          />
                        </div> */}

                        <div className="flex items-start gap-4 mt-3 justify-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              e.target.files?.[0] &&
                              handleFileUpload(e.target.files[0])
                            }
                          />
                          {uploading && <Loader2 className="animate-spin" />}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="event-description">Description</Label>
                      <Textarea
                        id="event-description"
                        value={currentEvent.description}
                        onChange={(e) =>
                          setCurrentEvent({
                            ...currentEvent,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter event description"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-date">Date</Label>
                        <Input
                          id="event-date"
                          type="date"
                          value={currentEvent.date}
                          onChange={(e) =>
                            setCurrentEvent({
                              ...currentEvent,
                              date: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="event-start-time">Start Time</Label>
                        <Input
                          id="event-start-time"
                          type="time"
                          value={currentEvent.startTime}
                          onChange={(e) =>
                            setCurrentEvent({
                              ...currentEvent,
                              startTime: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="event-end-time">End Time</Label>
                        <Input
                          id="event-end-time"
                          type="time"
                          value={currentEvent.endTime}
                          onChange={(e) =>
                            setCurrentEvent({
                              ...currentEvent,
                              endTime: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="event-location">Location</Label>
                      <Input
                        id="event-location"
                        value={currentEvent.location}
                        onChange={(e) =>
                          setCurrentEvent({
                            ...currentEvent,
                            location: e.target.value,
                          })
                        }
                        placeholder="Enter event location"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    {loading ? (
                      <Button disabled>
                        <Loader2 className="animate-spin" />
                        Saving Please wait...
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        onClick={saveEvent}
                        disabled={
                          !tempImageSrc ||
                          !currentEvent.title ||
                          !currentEvent.description
                        }
                      >
                        {isEditMode ? "Save Changes" : "Add Event"}
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="space-y-4">
                <div className="border rounded-md">
                  <div className="p-4 bg-muted">
                    <h3 className="font-medium">
                      Current Events ({previewEvents.length})- we only show 6
                      latest events
                    </h3>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <div className="p-4 space-y-4">
                      {previewEvents.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No events added yet. Click "Add Event" to get started.
                        </div>
                      ) : (
                        sortedEvents.map((event) => (
                          <div
                            key={event.id}
                            className="flex gap-4 p-4 border rounded-md"
                          >
                            <div className="w-24 h-24 relative flex-shrink-0">
                              <img
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                className="object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium truncate">
                                  {event.title}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {formatTime(event.startTime)} -{" "}
                                {formatTime(event.endTime)}
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {event.description}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => editEvent(event)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => deleteEvent(event.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            See how your events section will look
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  {previewSectionTitle}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {previewDescriptionText}
                </p>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sortedEvents.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No events to display.
                  </div>
                ) : (
                  sortedEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                      <div className="aspect-[3/2] w-full relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white rounded-lg p-2 text-center w-14 h-14 flex flex-col justify-center">
                          <span className="text-2xl font-bold">
                            {formatDate(event.date).day}
                          </span>
                          <span className="text-xs">
                            {formatDate(event.date).month}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {event.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {formatTime(event.startTime)} -{" "}
                              {formatTime(event.endTime)}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="bg-green-600 hover:bg-green-700 text-white border-none"
                        >
                          Read more
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
