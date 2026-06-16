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
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface ProductCardDialogProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductCardDialog({
  editor,
  isOpen,
  onClose,
}: ProductCardDialogProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("Read more");
  const [buttonUrl, setButtonUrl] = useState<string>("");
  const [layout, setLayout] = useState<"full" | "split">("full");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create product card HTML based on layout
    const productCard =
      layout === "full"
        ? `
      <div style="border-radius: 0.75rem; overflow: hidden; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin: 1rem 0; width: 100%;">
        <img 
          src="${imageUrl}" 
          alt="${title}"
          style="width: 100%; height: 300px; object-fit: cover;"
        />
        <div style="padding: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 0.75rem;">
            ${title}
          </h2>
          <p style="color: #6b7280; margin-bottom: 1.5rem;">
            ${description}
          </p>
          <a 
            href="${buttonUrl}"
            style="display: inline-flex; align-items: center; background-color: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; text-decoration: none; font-weight: 500;"
          >
            ${buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="margin-left: 0.5rem;">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    `
        : `
      <div style="border-radius: 0.75rem; overflow: hidden; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin: 1rem 0; width: 100%; display: flex;">
        <div style="flex: 1;">
          <img 
            src="${imageUrl}" 
            alt="${title}"
            style="width: 100%; height: 100%; object-fit: cover;"
          />
        </div>
        <div style="flex: 1; padding: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 0.75rem;">
            ${title}
          </h2>
          <p style="color: #6b7280; margin-bottom: 1.5rem;">
            ${description}
          </p>
          <a 
            href="${buttonUrl}"
            style="display: inline-flex; align-items: center; background-color: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; text-decoration: none; font-weight: 500;"
          >
            ${buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="margin-left: 0.5rem;">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    `;

    editor.chain().focus().insertContent(productCard).run();

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setImageUrl("");
    setTitle("");
    setDescription("");
    setButtonText("Read more");
    setButtonUrl("");
    setLayout("full");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Product Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="layout" className="text-right">
                Layout
              </Label>
              <Select
                value={layout}
                onValueChange={(value) => setLayout(value as "full" | "split")}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Width</SelectItem>
                  <SelectItem value="split">Split</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-url" className="text-right">
                Image URL
              </Label>
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product title"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="button-text" className="text-right">
                Button Text
              </Label>
              <Input
                id="button-text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="Read more"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="button-url" className="text-right">
                Button URL
              </Label>
              <Input
                id="button-url"
                value={buttonUrl}
                onChange={(e) => setButtonUrl(e.target.value)}
                placeholder="https://example.com"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Insert Card</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
