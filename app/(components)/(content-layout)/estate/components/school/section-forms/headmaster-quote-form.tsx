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
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../../../components/ui/popover";
// import { HexColorPicker } from "react-colorful";
// import { Section } from "../../../types/types";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { getFormattedDate } from "../../../lib/getFormatedDate";
// import { createActivity, updateSection } from "../../../actions/site";
// import { UploadButton } from "../../../lib/uploadthing";

// export default function HeadmasterQuoteForm({ section }: { section: Section }) {
//   const {
//     backgroundColor: defaultBg,
//     quoteTitle: title,
//     quoteText: subtitle,
//     mainImage: image,
//     smallImage: tinyImage,
//     headmasterName: teacherName,
//     headmasterTitle: teacherTitle,
//   }: {
//     backgroundColor: string;
//     quoteTitle: string;
//     quoteText: string;
//     mainImage: string;
//     smallImage: string;
//     headmasterName: string;
//     headmasterTitle: string;
//   } = section.settings;
//   // Current values from the image
//   const [quoteTitle, setQuoteTitle] = useState(title);
//   const [quoteText, setQuoteText] = useState(subtitle);
//   const [headmasterName, setHeadmasterName] = useState(teacherName);
//   const [headmasterTitle, setHeadmasterTitle] = useState(teacherTitle);
//   const [backgroundColor, setBackgroundColor] = useState(defaultBg); // Yellow color from the image
//   const [mainImage, setMainImage] = useState(image);
//   const [smallImage, setSmallImage] = useState(tinyImage);

//   // Preview state
//   const [previewQuoteTitle, setPreviewQuoteTitle] = useState(quoteTitle);
//   const [previewQuoteText, setPreviewQuoteText] = useState(quoteText);
//   const [previewHeadmasterName, setPreviewHeadmasterName] =
//     useState(headmasterName);
//   const [previewHeadmasterTitle, setPreviewHeadmasterTitle] =
//     useState(headmasterTitle);
//   const [previewBackgroundColor, setPreviewBackgroundColor] =
//     useState(backgroundColor);
//   const [previewMainImage, setPreviewMainImage] = useState(mainImage);
//   const [previewSmallImage, setPreviewSmallImage] = useState(smallImage);
//   const [loading, setLoading] = useState(false);

//   // Save changes
//   const saveChanges = async () => {
//     setLoading(true);
//     setQuoteTitle(previewQuoteTitle);
//     setQuoteText(previewQuoteText);
//     setHeadmasterName(previewHeadmasterName);
//     setHeadmasterTitle(previewHeadmasterTitle);
//     setBackgroundColor(previewBackgroundColor);
//     setMainImage(previewMainImage);
//     setSmallImage(previewSmallImage);
//     const data = {
//       settings: {
//         quoteTitle: previewQuoteTitle,
//         quoteText: previewQuoteText,
//         headmasterName: previewHeadmasterName,
//         headmasterTitle: previewHeadmasterTitle,
//         backgroundColor: previewBackgroundColor,
//         mainImage: previewMainImage,
//         smallImage: previewSmallImage,
//       },
//     };
//     try {
//       console.log(data);
//       await updateSection(section.id, data);
//       setLoading(false);
//       toast.success("HM Quote Section Updated", {
//         description: " HM Quote Section Updated Successfully ",
//       });
//       const activity = {
//         activity: `HM Quote Section was Updated Successfully`,
//         description: `Admin Updated the HM Quote Section`,
//         time: getFormattedDate(new Date()),
//         schoolId: section.schoolId,
//       };
//       await createActivity(activity);
//     } catch (error) {
//       setLoading(false);
//       toast.error("HM Quote section updated Failed", {
//         description: " HM Quote section Failed to update ",
//       });
//       console.log(error);
//     }
//   };

//   // Reset changes
//   const resetChanges = () => {
//     setPreviewQuoteTitle(quoteTitle);
//     setPreviewQuoteText(quoteText);
//     setPreviewHeadmasterName(headmasterName);
//     setPreviewHeadmasterTitle(headmasterTitle);
//     setPreviewBackgroundColor(backgroundColor);
//     setPreviewMainImage(mainImage);
//     setPreviewSmallImage(smallImage);
//   };

//   return (
//     <div className="container mx-auto py-8 space-y-8">
//       <Tabs defaultValue="content" className="w-full">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="content">Quote Content</TabsTrigger>
//           <TabsTrigger value="appearance">Appearance</TabsTrigger>
//           <TabsTrigger value="headmaster">Headmaster Info</TabsTrigger>
//         </TabsList>

//         {/* Content Tab */}
//         <TabsContent value="content" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Quote Content</CardTitle>
//               <CardDescription>
//                 Update the headmaster's quote and supporting text
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="quote-title">Quote Title/Heading</Label>
//                   <Input
//                     id="quote-title"
//                     value={previewQuoteTitle}
//                     onChange={(e) => setPreviewQuoteTitle(e.target.value)}
//                     placeholder="Enter quote heading"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="quote-text">Supporting Text</Label>
//                   <Textarea
//                     id="quote-text"
//                     value={previewQuoteText}
//                     onChange={(e) => setPreviewQuoteText(e.target.value)}
//                     placeholder="Enter supporting text"
//                     rows={3}
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
//               <CardTitle>Section Appearance</CardTitle>
//               <CardDescription>
//                 Update the background color and images
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
//                   <Label htmlFor="main-image">Main Headmaster Image</Label>
//                   <div className="flex flex-col gap-4">
//                     <div className="border rounded-full w-40 h-40 flex items-center justify-center bg-muted mx-auto overflow-hidden">
//                       <Image
//                         src={previewMainImage || "/placeholder.svg"}
//                         alt="Headmaster"
//                         width={160}
//                         height={160}
//                         className="object-cover w-full h-full"
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
//                           setPreviewMainImage(res[0].url);
//                         }}
//                         onUploadError={(error: Error) => {
//                           // Do something with the error.
//                           console.log(error);
//                           alert(`ERROR! ${error.message}`);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <p className="text-sm text-muted-foreground mt-2">
//                     Recommended image size: 400x400 pixels with a 1:1 aspect
//                     ratio. The image will be displayed in a circular crop.
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="small-image">Small Profile Image</Label>
//                   <div className="flex flex-col gap-4">
//                     <div className="border rounded-full w-20 h-20 flex items-center justify-center bg-muted mx-auto overflow-hidden">
//                       <Image
//                         src={previewSmallImage || "/placeholder.svg"}
//                         alt="Headmaster Small"
//                         width={80}
//                         height={80}
//                         className="object-cover w-full h-full"
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
//                           setPreviewSmallImage(res[0].url);
//                         }}
//                         onUploadError={(error: Error) => {
//                           // Do something with the error.
//                           console.log(error);
//                           alert(`ERROR! ${error.message}`);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <p className="text-sm text-muted-foreground mt-2">
//                     Recommended image size: 100x100 pixels with a 1:1 aspect
//                     ratio. The image will be displayed in a circular crop.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Headmaster Info Tab */}
//         <TabsContent value="headmaster" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Headmaster Information</CardTitle>
//               <CardDescription>
//                 Update the headmaster's name and title
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="headmaster-name">Headmaster Name</Label>
//                   <Input
//                     id="headmaster-name"
//                     value={previewHeadmasterName}
//                     onChange={(e) => setPreviewHeadmasterName(e.target.value)}
//                     placeholder="Enter headmaster name"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="headmaster-title">Headmaster Title</Label>
//                   <Input
//                     id="headmaster-title"
//                     value={previewHeadmasterTitle}
//                     onChange={(e) => setPreviewHeadmasterTitle(e.target.value)}
//                     placeholder="Enter headmaster title"
//                   />
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
//           <CardDescription>
//             See how your headmaster quote section will look
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div
//             className="border rounded-md overflow-hidden p-8"
//             style={{ backgroundColor: previewBackgroundColor }}
//           >
//             <div className="flex flex-col md:flex-row items-center gap-8">
//               <div className="md:w-1/3 flex justify-center">
//                 <div className="rounded-full overflow-hidden w-64 h-64 bg-white">
//                   <Image
//                     src={previewMainImage || "/placeholder.svg"}
//                     alt="Headmaster"
//                     width={256}
//                     height={256}
//                     className="object-cover w-full h-full"
//                   />
//                 </div>
//               </div>

//               <div className="md:w-2/3 space-y-6">
//                 <div className="space-y-4">
//                   <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
//                     {previewQuoteTitle}
//                   </h2>
//                   <p className="text-lg">{previewQuoteText}</p>
//                 </div>

//                 <div className="flex items-center gap-4 mt-6">
//                   <div className="rounded-full overflow-hidden w-16 h-16 bg-white">
//                     <Image
//                       src={previewSmallImage || "/placeholder.svg"}
//                       alt="Headmaster Small"
//                       width={64}
//                       height={64}
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                   <div>
//                     <div className="font-bold text-lg">
//                       {previewHeadmasterName}
//                     </div>
//                     <div className="text-sm">{previewHeadmasterTitle}</div>
//                   </div>
//                 </div>
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

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { Section } from "../../../types/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getFormattedDate } from "../../../lib/getFormatedDate";
import { createActivity, updateSection } from "../../../actions/site";

export default function HeadmasterQuoteForm({ section }: { section: Section }) {
  const {
    backgroundColor: defaultBg,
    quoteTitle: title,
    quoteText: subtitle,
    mainImage: image,
    smallImage: tinyImage,
    headmasterName: teacherName,
    headmasterTitle: teacherTitle,
  } = section.settings;

  // States
  const [quoteTitle, setQuoteTitle] = useState(title);
  const [quoteText, setQuoteText] = useState(subtitle);
  const [headmasterName, setHeadmasterName] = useState(teacherName);
  const [headmasterTitle, setHeadmasterTitle] = useState(teacherTitle);
  const [backgroundColor, setBackgroundColor] = useState(defaultBg);
  const [mainImage, setMainImage] = useState(image);
  const [smallImage, setSmallImage] = useState(tinyImage);

  const [previewQuoteTitle, setPreviewQuoteTitle] = useState(quoteTitle);
  const [previewQuoteText, setPreviewQuoteText] = useState(quoteText);
  const [previewHeadmasterName, setPreviewHeadmasterName] = useState(headmasterName);
  const [previewHeadmasterTitle, setPreviewHeadmasterTitle] = useState(headmasterTitle);
  const [previewBackgroundColor, setPreviewBackgroundColor] = useState(backgroundColor);
  const [previewMainImage, setPreviewMainImage] = useState(mainImage);
  const [previewSmallImage, setPreviewSmallImage] = useState(smallImage);

  const [loading, setLoading] = useState(false);

  // ===================== CLOUDINARY UPLOAD =====================
  const handleUpload = async (file: File, type: "main" | "small") => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("schoolId", section.schoolId);
      formData.append("type", type);

      const res = await fetch("/api/schoolmanage/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        if (type === "main") setPreviewMainImage(data.url);
        if (type === "small") setPreviewSmallImage(data.url);
        toast.success("Image uploaded successfully");
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Image upload failed", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  // ===================== SAVE CHANGES =====================
  const saveChanges = async () => {
    setLoading(true);

    const data = {
      settings: {
        quoteTitle: previewQuoteTitle,
        quoteText: previewQuoteText,
        headmasterName: previewHeadmasterName,
        headmasterTitle: previewHeadmasterTitle,
        backgroundColor: previewBackgroundColor,
        mainImage: previewMainImage,
        smallImage: previewSmallImage,
      },
    };

    try {
      await updateSection(section.id, data);
      toast.success("HM Quote Section Updated");

      const activity = {
        activity: `HM Quote Section was Updated Successfully`,
        description: `Admin Updated the HM Quote Section`,
        time: getFormattedDate(new Date()),
        schoolId: section.schoolId,
      };

      await createActivity(activity);

      // Update local state
      setQuoteTitle(previewQuoteTitle);
      setQuoteText(previewQuoteText);
      setHeadmasterName(previewHeadmasterName);
      setHeadmasterTitle(previewHeadmasterTitle);
      setBackgroundColor(previewBackgroundColor);
      setMainImage(previewMainImage);
      setSmallImage(previewSmallImage);
    } catch (error) {
      console.error(error);
      toast.error("HM Quote Section Update Failed");
    } finally {
      setLoading(false);
    }
  };

  const resetChanges = () => {
    setPreviewQuoteTitle(quoteTitle);
    setPreviewQuoteText(quoteText);
    setPreviewHeadmasterName(headmasterName);
    setPreviewHeadmasterTitle(headmasterTitle);
    setPreviewBackgroundColor(backgroundColor);
    setPreviewMainImage(mainImage);
    setPreviewSmallImage(smallImage);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Quote Content</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="headmaster">Headmaster Info</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Quote Content</CardTitle>
              <CardDescription>Update the headmaster's quote</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label htmlFor="quote-title">Quote Title</Label>
              <Input
                id="quote-title"
                value={previewQuoteTitle}
                onChange={(e) => setPreviewQuoteTitle(e.target.value)}
              />

              <Label htmlFor="quote-text">Supporting Text</Label>
              <Textarea
                id="quote-text"
                value={previewQuoteText}
                onChange={(e) => setPreviewQuoteText(e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Images & Background</CardTitle>
              <CardDescription>Upload images and pick background color</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Main Headmaster Image</Label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && handleUpload(e.target.files[0], "main")}
              />
              {previewMainImage && (
                <Image src={previewMainImage} alt="Main" width={160} height={160} className="rounded-full mt-2" />
              )}

              <Label>Small Profile Image</Label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && handleUpload(e.target.files[0], "small")}
              />
              {previewSmallImage && (
                <Image src={previewSmallImage} alt="Small" width={80} height={80} className="rounded-full mt-2" />
              )}

              <Label>Background Color</Label>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: previewBackgroundColor }} />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <span>{previewBackgroundColor}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <HexColorPicker color={previewBackgroundColor} onChange={setPreviewBackgroundColor} />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Headmaster Info Tab */}
        <TabsContent value="headmaster">
          <Card>
            <CardHeader>
              <CardTitle>Headmaster Info</CardTitle>
              <CardDescription>Update name and title</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Name</Label>
              <Input
                value={previewHeadmasterName}
                onChange={(e) => setPreviewHeadmasterName(e.target.value)}
              />
              <Label>Title</Label>
              <Input
                value={previewHeadmasterTitle}
                onChange={(e) => setPreviewHeadmasterTitle(e.target.value)}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview & Save */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See the headmaster quote section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 rounded-md" style={{ backgroundColor: previewBackgroundColor }}>
            <div className="flex gap-4 items-center">
              <Image src={previewMainImage || "/placeholder.svg"} alt="Headmaster" width={160} height={160} className="rounded-full" />
              <div>
                <h2 className="text-xl font-bold">{previewQuoteTitle}</h2>
                <p>{previewQuoteText}</p>
                <p className="font-semibold">{previewHeadmasterName} - {previewHeadmasterTitle}</p>
              </div>
              <Image src={previewSmallImage || "/placeholder.svg"} alt="Small" width={80} height={80} className="rounded-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetChanges}>Reset</Button>
          <Button onClick={saveChanges} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}