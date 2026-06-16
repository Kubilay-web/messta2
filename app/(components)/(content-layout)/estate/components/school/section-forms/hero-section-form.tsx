// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";

// import { Button } from "../../../components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../../../components/ui/card";
// import { Input } from "../../../components/ui/input";
// import { Label } from "../../../components/ui/label";
// import { Textarea } from "../../../components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../../components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../../../components/ui/popover";
// import { HexColorPicker } from "react-colorful";
// import { Section } from "../../../types/types";
// import ImageInput from "../../../components/FormInputs/ImageInput";
// import { UploadButton } from "../../../lib/uploadthing";
// import { createActivity, updateSection } from "../../../actions/site";
// import { toast } from "sonner";
// import { getFormattedDate } from "../../../lib/getFormatedDate";
// import { Loader2 } from "lucide-react";

// export default function HeroSectionForm({ section }: { section: Section }) {
//   // Current values from the image
//   const [title, setTitle] = useState(section.settings.title);
//   const [description, setDescription] = useState(section.settings.description);
//   const [backgroundColor, setBackgroundColor] = useState(
//     section.settings.backgroundColor
//   ); // Green color from the image
//   const [heroImage, setHeroImage] = useState(section.settings.image);
//   const [ctaText, setCtaText] = useState(section.settings.ctaText);
//   const [ctaLink, setCtaLink] = useState(section.settings.ctaLink);

//   // Preview state
//   const [previewTitle, setPreviewTitle] = useState(title);
//   const [previewDescription, setPreviewDescription] = useState(description);
//   const [previewBackgroundColor, setPreviewBackgroundColor] =
//     useState(backgroundColor);
//   const [previewHeroImage, setPreviewHeroImage] = useState(heroImage);
//   const [previewCtaText, setPreviewCtaText] = useState(ctaText);
//   const [previewCtaLink, setPreviewCtaLink] = useState(ctaLink);

//   // Navigation sections for dropdown
//   const navigationSections = [
//     { id: "#about", name: "About" },
//     { id: "#admissions", name: "Admissions" },
//     { id: "#academics", name: "Academics" },
//     { id: "#gallery", name: "Gallery" },
//     { id: "#news", name: "News" },
//     { id: "#contact", name: "Contact" },
//   ];
//   const [loading, setLoading] = useState(false);
//   // Save changes
//   const saveChanges = async () => {
//     setLoading(true);
//     setTitle(previewTitle);
//     setDescription(previewDescription);
//     setBackgroundColor(previewBackgroundColor);
//     setHeroImage(previewHeroImage);
//     setCtaText(previewCtaText);
//     setCtaLink(previewCtaLink);
//     const data = {
//       settings: {
//         backgroundColor: previewBackgroundColor,
//         title: previewTitle,
//         description: previewDescription,
//         image: previewHeroImage,
//         ctaText: previewCtaText,
//         ctaLink: previewCtaLink,
//       },
//     };
//     try {
//       console.log(data);
//       await updateSection(section.id, data);
//       setLoading(false);
//       toast.success("Hero Section Updated", {
//         description: " Hero Section Updated Successfully ",
//       });
//       const activity = {
//         activity: `Hero Section was Updated Successfully`,
//         description: `Admin Updated the Hero Section`,
//         time: getFormattedDate(new Date()),
//         schoolId: section.schoolId,
//       };
//       await createActivity(activity);
//     } catch (error) {
//       setLoading(false);
//       toast.error("Hero section updated Failed", {
//         description: " Hero section Failed to update ",
//       });
//       console.log(error);
//     }
//   };

//   // Reset changes
//   const resetChanges = () => {
//     setPreviewTitle(title);
//     setPreviewDescription(description);
//     setPreviewBackgroundColor(backgroundColor);
//     setPreviewHeroImage(heroImage);
//     setPreviewCtaText(ctaText);
//     setPreviewCtaLink(ctaLink);
//   };

//   return (
//     <div className="container mx-auto py-8 space-y-8">
//       <Tabs defaultValue="content" className="w-full">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="content">Content</TabsTrigger>
//           <TabsTrigger value="appearance">Appearance</TabsTrigger>
//           <TabsTrigger value="cta">Call to Action</TabsTrigger>
//         </TabsList>

//         {/* Content Tab */}
//         <TabsContent value="content" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Hero Content</CardTitle>
//               <CardDescription>
//                 Update your hero section title and description
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="hero-title">Hero Title</Label>
//                   <Input
//                     id="hero-title"
//                     value={previewTitle}
//                     onChange={(e) => setPreviewTitle(e.target.value)}
//                     placeholder="Enter hero title"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="hero-description">Hero Description</Label>
//                   <Textarea
//                     id="hero-description"
//                     value={previewDescription}
//                     onChange={(e) => setPreviewDescription(e.target.value)}
//                     placeholder="Enter hero description"
//                     rows={4}
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Appearance Tab */}
//         <TabsContent value="appearance" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Hero Appearance</CardTitle>
//               <CardDescription>
//                 Update your hero section background color and image
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="background-color">Background Color</Label>
//                   <div className="flex items-center gap-4">
//                     <div
//                       className="w-10 h-10 rounded-md border"
//                       style={{ backgroundColor: previewBackgroundColor }}
//                     />
//                     <div className="flex-1">
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant="outline"
//                             className="w-full justify-start"
//                           >
//                             <div className="flex items-center gap-2">
//                               <div
//                                 className="w-4 h-4 rounded-sm"
//                                 style={{
//                                   backgroundColor: previewBackgroundColor,
//                                 }}
//                               />
//                               <span>{previewBackgroundColor}</span>
//                             </div>
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-4">
//                           <HexColorPicker
//                             color={previewBackgroundColor}
//                             onChange={setPreviewBackgroundColor}
//                           />
//                           <div className="mt-4">
//                             <Input
//                               value={previewBackgroundColor}
//                               onChange={(e) =>
//                                 setPreviewBackgroundColor(e.target.value)
//                               }
//                               className="mt-2"
//                             />
//                           </div>
//                         </PopoverContent>
//                       </Popover>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="hero-image">Hero Image</Label>
//                   <div className="flex flex-col gap-4">
//                     <div className="border rounded-md p-2 w-full h-48 flex items-center justify-center bg-muted">
//                       <Image
//                         src={previewHeroImage || "/placeholder.svg"}
//                         alt="Hero Image"
//                         width={200}
//                         height={150}
//                         className="object-contain"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <UploadButton
//                         className="col-span-full"
//                         endpoint="logoImage"
//                         onClientUploadComplete={(res) => {
//                           // Do something with the response
//                           console.log("Files: ", res);
//                           ``;
//                           // logoImage(res[0].url);
//                           setPreviewHeroImage(res[0].url);
//                         }}
//                         onUploadError={(error: Error) => {
//                           // Do something with the error.
//                           console.log(error);
//                           alert(`ERROR! ${error.message}`);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <p className="text-sm text-center text-muted-foreground mt-2">
//                     Recommended image size: 800x600 pixels or larger with a 4:3
//                     aspect ratio
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Call to Action Tab */}
//         <TabsContent value="cta" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Call to Action</CardTitle>
//               <CardDescription>
//                 Update your hero section call-to-action button
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="cta-text">Button Text</Label>
//                   <Input
//                     id="cta-text"
//                     value={previewCtaText}
//                     onChange={(e) => setPreviewCtaText(e.target.value)}
//                     placeholder="Enter button text"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="cta-link">Button Link</Label>
//                   <Select
//                     value={previewCtaLink}
//                     onValueChange={setPreviewCtaLink}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a section" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {navigationSections.map((section) => (
//                         <SelectItem key={section.id} value={section.id}>
//                           {section.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <p className="text-sm text-muted-foreground mt-2">
//                     Select which section this button should link to
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       {/* Preview */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Preview</CardTitle>
//           <CardDescription>See how your hero section will look</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="border rounded-md overflow-hidden">
//             <div className="flex flex-col md:flex-row">
//               <div
//                 className="p-8 md:w-1/2 flex flex-col justify-center space-y-6"
//                 style={{ backgroundColor: previewBackgroundColor }}
//               >
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
//                   {previewTitle}
//                 </h2>
//                 <p className="text-white/90">{previewDescription}</p>
//                 <div>
//                   <Button
//                     variant="outline"
//                     className="bg-white text-black hover:bg-white/90 hover:text-black"
//                   >
//                     {previewCtaText}
//                   </Button>
//                 </div>
//               </div>
//               <div className="md:w-1/2 h-64 md:h-auto relative bg-slate-200">
//                 <Image
//                   src={previewHeroImage || "/placeholder.svg"}
//                   alt="Hero Image"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button variant="outline" onClick={resetChanges}>
//             Reset
//           </Button>
//           {loading ? (
//             <Button disabled>
//               <Loader2 className="animate-spin" />
//               Saving Please wait...
//             </Button>
//           ) : (
//             <Button onClick={saveChanges}>Save Changes</Button>
//           )}
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { HexColorPicker } from "react-colorful";

import { Section } from "../../../types/types";
import { createActivity, updateSection } from "../../../actions/site";
import { toast } from "sonner";

import { getFormattedDate } from "../../../lib/getFormatedDate";

export default function HeroSectionForm({ section }: { section: Section }) {
  // STATES
  const [title, setTitle] = useState(section.settings.title);
  const [description, setDescription] = useState(section.settings.description);
  const [backgroundColor, setBackgroundColor] = useState(section.settings.backgroundColor);
  const [heroImage, setHeroImage] = useState(section.settings.image);
  const [ctaText, setCtaText] = useState(section.settings.ctaText);
  const [ctaLink, setCtaLink] = useState(section.settings.ctaLink);

  const [previewTitle, setPreviewTitle] = useState(title);
  const [previewDescription, setPreviewDescription] = useState(description);
  const [previewBackgroundColor, setPreviewBackgroundColor] = useState(backgroundColor);
  const [previewHeroImage, setPreviewHeroImage] = useState(heroImage);
  const [previewCtaText, setPreviewCtaText] = useState(ctaText);
  const [previewCtaLink, setPreviewCtaLink] = useState(ctaLink);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const navigationSections = [
    { id: "#about", name: "About" },
    { id: "#admissions", name: "Admissions" },
    { id: "#academics", name: "Academics" },
    { id: "#gallery", name: "Gallery" },
    { id: "#news", name: "News" },
    { id: "#contact", name: "Contact" },
  ];

  // CLOUDINARY FILE UPLOAD
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
        setPreviewHeroImage(data.url);
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

  // SAVE CHANGES
  const saveChanges = async () => {
    setLoading(true);
    const data = {
      settings: {
        title: previewTitle,
        description: previewDescription,
        backgroundColor: previewBackgroundColor,
        image: previewHeroImage,
        ctaText: previewCtaText,
        ctaLink: previewCtaLink,
      },
    };

    try {
      await updateSection(section.id, data);
      toast.success("Hero section updated");

      await createActivity({
        activity: "Hero section updated",
        description: "Admin updated hero section",
        time: getFormattedDate(new Date()),
        schoolId: section.schoolId,
      });

      // Sync preview with current
      setTitle(previewTitle);
      setDescription(previewDescription);
      setBackgroundColor(previewBackgroundColor);
      setHeroImage(previewHeroImage);
      setCtaText(previewCtaText);
      setCtaLink(previewCtaLink);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update hero section");
    } finally {
      setLoading(false);
    }
  };

  const resetChanges = () => {
    setPreviewTitle(title);
    setPreviewDescription(description);
    setPreviewBackgroundColor(backgroundColor);
    setPreviewHeroImage(heroImage);
    setPreviewCtaText(ctaText);
    setPreviewCtaLink(ctaLink);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="cta">Call to Action</TabsTrigger>
        </TabsList>

        {/* Content */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Hero Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Title</Label>
              <Input value={previewTitle} onChange={(e) => setPreviewTitle(e.target.value)} />

              <Label>Description</Label>
              <Textarea
                value={previewDescription}
                onChange={(e) => setPreviewDescription(e.target.value)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Background Color</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: previewBackgroundColor }} />
                      <span>{previewBackgroundColor}</span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4">
                  <HexColorPicker color={previewBackgroundColor} onChange={setPreviewBackgroundColor} />
                  <Input
                    value={previewBackgroundColor}
                    onChange={(e) => setPreviewBackgroundColor(e.target.value)}
                    className="mt-2"
                  />
                </PopoverContent>
              </Popover>

              <Label>Hero Image</Label>
              <div className="flex flex-col gap-2">
                <div className="border rounded-md w-full h-48 flex items-center justify-center bg-muted">
                  <Image src={previewHeroImage || "/placeholder.svg"} alt="Hero" width={200} height={150} className="object-contain" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
                {uploading && <Loader2 className="animate-spin" />}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CTA */}
        <TabsContent value="cta">
          <Card>
            <CardHeader>
              <CardTitle>Call to Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Button Text</Label>
              <Input value={previewCtaText} onChange={(e) => setPreviewCtaText(e.target.value)} />

              <Label>Button Link</Label>
              <Select value={previewCtaLink} onValueChange={setPreviewCtaLink}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  {navigationSections.map((nav) => (
                    <SelectItem key={nav.id} value={nav.id}>{nav.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:w-1/2 flex flex-col justify-center space-y-4" style={{ backgroundColor: previewBackgroundColor }}>
              <h2 className="text-3xl font-bold text-white">{previewTitle}</h2>
              <p className="text-white/90">{previewDescription}</p>
              <Button variant="outline" className="bg-white text-black">{previewCtaText}</Button>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto relative bg-slate-200">
              <img src={previewHeroImage || "/placeholder.svg"} alt="Hero"  className="object-cover" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetChanges}>Reset</Button>
          {loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" /> Saving...
            </Button>
          ) : (
            <Button onClick={saveChanges}>Save Changes</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
