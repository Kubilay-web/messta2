"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, MapPin, Calendar } from "lucide-react";
import type { EventData } from "../../types/types";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";

interface EventCardProps {
  event: EventData;
}

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":");
  const hour = Number.parseInt(hours);
  const ampm = hour >= 12 ? "pm" : "am";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleString("default", { month: "short" }).toUpperCase(),
    full: date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
};

export default function EventCard({ event }: EventCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
            <span className="text-xs">{formatDate(event.date).month}</span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {event.description}
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
          </div>
          <Button variant="outline" className="" onClick={() => setOpen(true)}>
            Read more
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {event.title}
            </DialogTitle>
          </DialogHeader>

          <div className="relative h-64 my-4">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              
              className="object-cover rounded-md"
            />
          </div>

          <div className="grid gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              <span className="font-medium">{formatDate(event.date).full}</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-green-600" />
              <span className="font-medium">
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </span>
            </div>

            <div className="flex items-center mt-2">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              <span className="font-medium">{event.location}</span>
            </div>

            <DialogDescription className="text-base mt-4 whitespace-pre-line">
              {event.description}
            </DialogDescription>
          </div>

          <DialogFooter>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
