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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface ButtonDialogProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export function ButtonDialog({ editor, isOpen, onClose }: ButtonDialogProps) {
  const [url, setUrl] = useState<string>("");
  const [text, setText] = useState<string>("Click Here");
  const [style, setStyle] = useState<string>("primary");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a button with the specified style
    const buttonClass = getButtonClass(style);

    editor
      .chain()
      .focus()
      .insertContent(`<a href="${url}" class="${buttonClass}">${text}</a>`)
      .run();

    onClose();
    setUrl("");
    setText("Click Here");
    setStyle("primary");
  };

  const getButtonClass = (style: string): string => {
    switch (style) {
      case "primary":
        return "inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 text-center no-underline";
      case "secondary":
        return "inline-block px-4 py-2 bg-gray-600 text-white font-medium rounded hover:bg-gray-700 text-center no-underline";
      case "success":
        return "inline-block px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 text-center no-underline";
      case "danger":
        return "inline-block px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 text-center no-underline";
      default:
        return "inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 text-center no-underline";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Button</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="button-url" className="text-right">
                URL
              </Label>
              <Input
                id="button-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="button-text" className="text-right">
                Text
              </Label>
              <Input
                id="button-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Button text"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="button-style" className="text-right">
                Style
              </Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="danger">Danger</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Insert Button</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
