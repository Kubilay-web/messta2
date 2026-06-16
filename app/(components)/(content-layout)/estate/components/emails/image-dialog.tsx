"use client";

import type React from "react";

import { useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

interface ImageDialogProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageDialog({ editor, isOpen, onClose }: ImageDialogProps) {
  const [url, setUrl] = useState<string>("");
  const [alt, setAlt] = useState<string>("");
  const [width, setWidth] = useState<string>("100%");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Insert image with specified attributes
    editor
      .chain()
      .focus()
      .insertContent(
        `<img src="${url}" alt="${alt}" style="width: ${width}; max-width: 100%; height: auto;" />`
      )
      .run();

    onClose();
    setUrl("");
    setAlt("");
    setWidth("100%");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-url" className="text-right">
                Image URL
              </Label>
              <Input
                id="image-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-alt" className="text-right">
                Alt Text
              </Label>
              <Input
                id="image-alt"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Image description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-width" className="text-right">
                Width
              </Label>
              <Input
                id="image-width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="100%"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Insert Image</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
