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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

interface ProductInfo {
  imageUrl: string;
  title: string;
  price: string;
  link: string;
}

interface TwoProductCardsDialogProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export function TwoProductCardsDialog({
  editor,
  isOpen,
  onClose,
}: TwoProductCardsDialogProps) {
  const [product1, setProduct1] = useState<ProductInfo>({
    imageUrl: "",
    title: "",
    price: "",
    link: "",
  });

  const [product2, setProduct2] = useState<ProductInfo>({
    imageUrl: "",
    title: "",
    price: "",
    link: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create two product cards side by side
    const twoProductCards = `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin: 1rem 0; width: 100%;">
        <div style="flex: 1; min-width: 250px; border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden;">
          <a href="${product1.link}" style="text-decoration: none; color: inherit;">
            <img src="${product1.imageUrl}" alt="${product1.title}" style="width: 100%; height: 200px; object-fit: cover;" />
            <div style="padding: 1rem;">
              <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">${product1.title}</h3>
              <p style="font-size: 1rem; font-weight: 700; color: #4f46e5;">${product1.price}</p>
              <a href="${product1.link}" style="display: inline-block; margin-top: 0.5rem; padding: 0.5rem 1rem; background-color: #4f46e5; color: white; border-radius: 0.25rem; text-decoration: none; font-weight: 500;">View Product</a>
            </div>
          </a>
        </div>
        <div style="flex: 1; min-width: 250px; border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden;">
          <a href="${product2.link}" style="text-decoration: none; color: inherit;">
            <img src="${product2.imageUrl}" alt="${product2.title}" style="width: 100%; height: 200px; object-fit: cover;" />
            <div style="padding: 1rem;">
              <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">${product2.title}</h3>
              <p style="font-size: 1rem; font-weight: 700; color: #4f46e5;">${product2.price}</p>
              <a href="${product2.link}" style="display: inline-block; margin-top: 0.5rem; padding: 0.5rem 1rem; background-color: #4f46e5; color: white; border-radius: 0.25rem; text-decoration: none; font-weight: 500;">View Product</a>
            </div>
          </a>
        </div>
      </div>
    `;

    editor.chain().focus().insertContent(twoProductCards).run();

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setProduct1({
      imageUrl: "",
      title: "",
      price: "",
      link: "",
    });
    setProduct2({
      imageUrl: "",
      title: "",
      price: "",
      link: "",
    });
  };

  const updateProduct1 = (field: keyof ProductInfo, value: string) => {
    setProduct1((prev) => ({ ...prev, [field]: value }));
  };

  const updateProduct2 = (field: keyof ProductInfo, value: string) => {
    setProduct2((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Insert Two Product Cards</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="product1" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="product1">Product 1</TabsTrigger>
              <TabsTrigger value="product2">Product 2</TabsTrigger>
            </TabsList>
            <TabsContent value="product1">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product1-image" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="product1-image"
                    value={product1.imageUrl}
                    onChange={(e) => updateProduct1("imageUrl", e.target.value)}
                    placeholder="https://example.com/product1.jpg"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product1-title" className="text-right">
                    Product Title
                  </Label>
                  <Input
                    id="product1-title"
                    value={product1.title}
                    onChange={(e) => updateProduct1("title", e.target.value)}
                    placeholder="Product 1 Name"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product1-price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="product1-price"
                    value={product1.price}
                    onChange={(e) => updateProduct1("price", e.target.value)}
                    placeholder="$99.99"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product1-link" className="text-right">
                    Product Link
                  </Label>
                  <Input
                    id="product1-link"
                    value={product1.link}
                    onChange={(e) => updateProduct1("link", e.target.value)}
                    placeholder="https://example.com/product1"
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="product2">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product2-image" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="product2-image"
                    value={product2.imageUrl}
                    onChange={(e) => updateProduct2("imageUrl", e.target.value)}
                    placeholder="https://example.com/product2.jpg"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product2-title" className="text-right">
                    Product Title
                  </Label>
                  <Input
                    id="product2-title"
                    value={product2.title}
                    onChange={(e) => updateProduct2("title", e.target.value)}
                    placeholder="Product 2 Name"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product2-price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="product2-price"
                    value={product2.price}
                    onChange={(e) => updateProduct2("price", e.target.value)}
                    placeholder="$99.99"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product2-link" className="text-right">
                    Product Link
                  </Label>
                  <Input
                    id="product2-link"
                    value={product2.link}
                    onChange={(e) => updateProduct2("link", e.target.value)}
                    placeholder="https://example.com/product2"
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Insert Product Cards</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
