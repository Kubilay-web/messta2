"use client";

import type { News } from "../../types/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="relative h-48">
          <Image
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="font-bold mb-2">{news.title}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 pt-5">
            {news.content}
          </p>
          <Button
            onClick={() => setOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Read more
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {news.title}
            </DialogTitle>
          </DialogHeader>
          <div className="relative h-64 my-4">
            <Image
              src={news.image || "/placeholder.svg"}
              alt={news.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="mt-4">
            <p className="text-gray-700 whitespace-pre-line">{news.content}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
