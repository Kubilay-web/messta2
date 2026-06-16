// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Info, Plus, Trash2, Edit, Calendar, Loader2 } from "lucide-react";
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
// import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../../../components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../../components/ui/select";
// import { Badge } from "../../../components/ui/badge";
// import { ScrollArea } from "../../../components/ui/scroll-area";
// import {
//   GalleryCategory,
//   GalleryImageCreateDTO,
//   GalleryImageDTO,
//   Section,
// } from "../../../types/types";
// import { toast } from "sonner";
// import {
//   createActivity,
//   createGalleryCategory,
//   createGalleryImage,
//   deleteSiteGalleryCategory,
//   deleteSiteGalleryImage,
//   updateSection,
// } from "../../../actions/site";
// import { getFormattedDate } from "../../../lib/getFormatedDate";
// import { UploadButton } from "../../../lib/uploadthing";

// // Define the GalleryImage interface
// interface GalleryImage {
//   id: number;
//   src: string;
//   category: string;
//   title: string;
//   description?: string;
//   date?: string;
// }

// export default function GallerySectionForm({
//   section,
//   initialCategories,
//   galleryImages,
// }: {
//   section: Section;
//   initialCategories: GalleryCategory[];
//   galleryImages: GalleryImageDTO[];
// }) {
//   const cats = ["All", ...initialCategories.map((cat) => cat.name)];
//   // Gallery header content
//   const [title, setTitle] = useState(section?.title ?? "");
//   const [description, setDescription] = useState(section?.subtitle ?? "");

//   // Categories
//   const [categories, setCategories] = useState<string[]>(cats);
//   const [newCategory, setNewCategory] = useState("");

//   // Gallery images
//   const [images, setImages] = useState<GalleryImageDTO[]>(galleryImages);

//   // New/Edit image form
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [currentImage, setCurrentImage] = useState<GalleryImage>({
//     id: 0,
//     src: "",
//     category: "",
//     title: "",
//     description: "",
//     date: "",
//   });
//   const [tempImageSrc, setTempImageSrc] = useState<string | null>(
//     "/school/event-1.avif"
//   );

//   // Preview state
//   const [loading, setLoading] = useState(false);
//   const [previewTitle, setPreviewTitle] = useState(title);
//   const [previewDescription, setPreviewDescription] = useState(description);
//   const [previewCategories, setPreviewCategories] = useState<string[]>([
//     ...categories,
//   ]);
//   const [previewImages, setPreviewImages] = useState<GalleryImageDTO[]>([
//     ...images,
//   ]);
//   const [activeCategory, setActiveCategory] = useState({
//     id: "all",
//     name: "All",
//   });

//   // Handle image upload
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const result = e.target?.result as string;
//         setTempImageSrc(result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Add new category
//   const addCategory = async () => {
//     setLoading(true);
//     if (newCategory.trim() && !previewCategories.includes(newCategory.trim())) {
//       setPreviewCategories([...previewCategories, newCategory.trim()]);
//       setCategories([...previewCategories]);
//       const data = {
//         schoolId: section.schoolId,
//         name: newCategory.trim(),
//       };
//       try {
//         await createGalleryCategory(data);
//         setNewCategory("");
//         setLoading(false);
//         toast.success("New Gallery Category added", {
//           description: " New Gallery Category added Successfully ",
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
//   const [removing, setRemoving] = useState(false);
//   // Remove category
//   const removeCategory = async (categoryToRemove: string) => {
//     if (categoryToRemove !== "All") {
//       // Update images that use this category to use "Other" instead
//       setRemoving(true);
//       const category = initialCategories.find(
//         (item) => item.name == categoryToRemove
//       );

//       try {
//         await deleteSiteGalleryCategory(category?.id ?? "");
//         // setPreviewImages(updatedImages);
//         setPreviewCategories(
//           previewCategories.filter((cat) => cat !== categoryToRemove)
//         );
//         setRemoving(false);
//         toast.success("Category Deleted Successfully");
//       } catch (error) {
//         console.log(error);
//         setRemoving(false);
//         toast.error("Failed to delete");
//       }
//     }
//   };

//   // Add new image
//   const addImage = async () => {
//     if (tempImageSrc && currentImage.title && currentImage.category) {
//       setLoading(true);
//       const newImage: GalleryImage = {
//         ...currentImage,
//         src: tempImageSrc,
//       };
//       const category = initialCategories.find(
//         (c) => c.name == newImage.category
//       );
//       if (!category) {
//         toast.error("Please select image Category");
//         return;
//       }
//       const data: GalleryImageCreateDTO = {
//         schoolId: section.schoolId,
//         title: newImage.title,
//         description: newImage?.description,
//         image: newImage.src,
//         date: newImage?.date,
//         categoryId: category.id,
//       };

//       if (isEditMode) {
//         // setPreviewImages(
//         //   previewImages.map((img) => (img.id === newImage.id ? newImage : img))
//         // );
//       } else {
//         try {
//           const image = await createGalleryImage(data);

//           setLoading(false);
//           toast.success("New Gallery Image ", {
//             description: " New Gallery image Added Successfully ",
//           });
//           setPreviewImages([image, ...previewImages]);
//           setCurrentImage({
//             id: 0,
//             src: "",
//             category: "",
//             title: "",
//             description: "",
//             date: "",
//           });
//           setTempImageSrc(null);
//           setIsEditMode(false);
//         } catch (error) {
//           setLoading(false);
//           console.log(error);
//         }
//       }
//     }
//   };

//   // Edit image
//   const editImage = (image: GalleryImageDTO) => {
//     // setCurrentImage(image);
//     // setTempImageSrc(image.src);
//     // setIsEditMode(true);
//   };

//   // Delete image
//   const deleteImage = async (id: string) => {
//     setRemoving(true);
//     try {
//       await deleteSiteGalleryImage(id);
//       setPreviewImages(previewImages.filter((img) => img.id !== id));
//       setRemoving(false);
//       toast.success("Gallery Image Deleted Successfully");
//     } catch (error) {
//       console.log(error);
//       setRemoving(false);
//       toast.success("Failed to delete");
//     }
//   };

//   // Filter images by category
//   const filteredImages =
//     activeCategory.name === "All"
//       ? previewImages
//       : previewImages.filter((img) => img.categoryId === activeCategory.id);

//   // Save changes
//   const saveChanges = async () => {
//     setLoading(true);
//     setTitle(previewTitle);
//     setDescription(previewDescription);
//     const data = {
//       title: previewTitle,
//       subtitle: previewDescription,
//     };
//     try {
//       console.log(data);
//       await updateSection(section.id, data);
//       setLoading(false);
//       toast.success("Gallery section Updated", {
//         description: " Gallery section Updated Successfully ",
//       });
//       const activity = {
//         activity: `Gallery section was Updated Successfully`,
//         description: `Admin Updated the Gallery section Links`,
//         time: getFormattedDate(new Date()),
//         schoolId: section.schoolId,
//       };
//       await createActivity(activity);
//     } catch (error) {
//       setLoading(false);
//       toast.error("Gallery updated Failed", {
//         description: " Gallery Failed to update ",
//       });
//       console.log(error);
//     }
//   };
//   // setCategories([...previewCategories]);
//   // setImages([...previewImages]);
//   // alert("Gallery section changes saved successfully!");
//   // Reset changes
//   const resetChanges = () => {
//     setPreviewTitle(title);
//     setPreviewDescription(description);
//     setPreviewCategories([...categories]);
//     setPreviewImages([...images]);
//   };

//   return (
//     <div className="container mx-auto py-8 space-y-8">
//       <Tabs defaultValue="header" className="w-full">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="header">Header</TabsTrigger>
//           <TabsTrigger value="categories">Categories</TabsTrigger>
//           <TabsTrigger value="images">Gallery Images</TabsTrigger>
//         </TabsList>

//         {/* Header Tab */}
//         <TabsContent value="header" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Gallery Header</CardTitle>
//               <CardDescription>
//                 Update the gallery section title and description
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="gallery-title">Gallery Title</Label>
//                   <Input
//                     id="gallery-title"
//                     value={previewTitle}
//                     onChange={(e) => setPreviewTitle(e.target.value)}
//                     placeholder="Enter gallery title"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="gallery-description">
//                     Gallery Description
//                   </Label>
//                   <Textarea
//                     id="gallery-description"
//                     value={previewDescription}
//                     onChange={(e) => setPreviewDescription(e.target.value)}
//                     placeholder="Enter gallery description"
//                     rows={3}
//                   />
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button variant="outline" onClick={resetChanges}>
//                 Reset
//               </Button>
//               {loading ? (
//                 <Button disabled>
//                   <Loader2 className="animate-spin" />
//                   Saving Please wait...
//                 </Button>
//               ) : (
//                 <Button onClick={saveChanges}>Save Changes</Button>
//               )}
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         {/* Categories Tab */}
//         <TabsContent value="categories" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Gallery Categories</CardTitle>
//               <CardDescription>
//                 Manage the categories for filtering gallery images
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <Alert>
//                 <Info className="h-4 w-4" />
//                 <AlertTitle>Important Note</AlertTitle>
//                 <AlertDescription>
//                   The "All" category is required and cannot be removed. When you
//                   remove a category, any images in that category will be
//                   Achieved as well as the Category.
//                 </AlertDescription>
//               </Alert>

//               <div className="space-y-4">
//                 <div className="flex flex-wrap gap-2">
//                   {previewCategories.map((category) => (
//                     <Badge
//                       key={category}
//                       variant="outline"
//                       className="py-2 px-3"
//                     >
//                       {category}
//                       {category !== "All" && (
//                         <>
//                           {removing ? (
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-4 w-4 ml-2 text-muted-foreground hover:text-destructive"
//                               disabled
//                             >
//                               <Loader2 className="h-3 w-3 animate-spin" />
//                               <span className="sr-only">Remove {category}</span>
//                             </Button>
//                           ) : (
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-4 w-4 ml-2 text-muted-foreground hover:text-destructive"
//                               onClick={() => removeCategory(category)}
//                             >
//                               <Trash2 className="h-3 w-3" />
//                               <span className="sr-only">Remove {category}</span>
//                             </Button>
//                           )}
//                         </>
//                       )}
//                     </Badge>
//                   ))}
//                 </div>

//                 <div className="flex gap-2">
//                   <Input
//                     value={newCategory}
//                     onChange={(e) => setNewCategory(e.target.value)}
//                     placeholder="New category name"
//                   />

//                   {loading ? (
//                     <Button disabled>
//                       <Loader2 className="animate-spin" />
//                       Saving Please wait...
//                     </Button>
//                   ) : (
//                     <Button
//                       disabled={!newCategory}
//                       onClick={addCategory}
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 mr-2" />
//                       Add
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Images Tab */}
//         <TabsContent value="images" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Gallery Images</CardTitle>
//               <CardDescription>
//                 Manage the images in your gallery
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button>
//                     <Plus className="h-4 w-4 mr-2" />
//                     Add New Image
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[600px]">
//                   <DialogHeader>
//                     <DialogTitle>
//                       {isEditMode ? "Edit Image" : "Add New Image"}
//                     </DialogTitle>
//                     <DialogDescription>
//                       Fill in the details for the gallery image.
//                     </DialogDescription>
//                   </DialogHeader>
//                   <div className="grid gap-4 py-4">
//                     <div className="grid gap-4 grid-cols-2 ">
//                       <div className="flex gap-4 items-start">
//                         <UploadButton
//                           className="col-span-full"
//                           endpoint="logoImage"
//                           onClientUploadComplete={(res) => {
//                             // Do something with the response
//                             console.log("Files: ", res);
//                             ``;
//                             // logoImage(res[0].url);
//                             setTempImageSrc(res[0].url);
//                           }}
//                           onUploadError={(error: Error) => {
//                             // Do something with the error.
//                             console.log(error);
//                             alert(`ERROR! ${error.message}`);
//                           }}
//                         />
//                         <Image
//                           src={tempImageSrc || "/school/event-1.avif"}
//                           alt="Gallery Image"
//                           width={50}
//                           height={50}
//                           className="object-contain rounded-lg"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="image-date">Date (Optional)</Label>
//                         <Input
//                           id="image-date"
//                           type="date"
//                           value={currentImage.date || ""}
//                           onChange={(e) =>
//                             setCurrentImage({
//                               ...currentImage,
//                               date: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="image-title">Title</Label>
//                         <Input
//                           id="image-title"
//                           value={currentImage.title}
//                           onChange={(e) =>
//                             setCurrentImage({
//                               ...currentImage,
//                               title: e.target.value,
//                             })
//                           }
//                           placeholder="Enter image title"
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="image-category">Category</Label>
//                         <Select
//                           value={currentImage.category}
//                           onValueChange={(value) =>
//                             setCurrentImage({
//                               ...currentImage,
//                               category: value,
//                             })
//                           }
//                         >
//                           <SelectTrigger id="image-category">
//                             <SelectValue placeholder="Select a category" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {previewCategories
//                               .filter((cat) => cat !== "All")
//                               .map((category) => (
//                                 <SelectItem key={category} value={category}>
//                                   {category}
//                                 </SelectItem>
//                               ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="image-description">
//                         Description (Optional)
//                       </Label>
//                       <Textarea
//                         id="image-description"
//                         value={currentImage.description || ""}
//                         onChange={(e) =>
//                           setCurrentImage({
//                             ...currentImage,
//                             description: e.target.value,
//                           })
//                         }
//                         placeholder="Enter image description"
//                         rows={3}
//                       />
//                     </div>
//                   </div>
//                   <DialogFooter>
//                     {loading ? (
//                       <Button disabled>
//                         <Loader2 className="animate-spin" />
//                         Saving Please wait...
//                       </Button>
//                     ) : (
//                       <Button
//                         type="submit"
//                         onClick={addImage}
//                         disabled={
//                           !tempImageSrc ||
//                           !currentImage.title ||
//                           !currentImage.category
//                         }
//                       >
//                         {isEditMode ? "Save Changes" : "Add Image"}
//                       </Button>
//                     )}
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>

//               <div className="space-y-4">
//                 <div className="border rounded-md">
//                   <div className="p-4 bg-muted">
//                     <h3 className="font-medium">
//                       Current Gallery Images ({previewImages.length})
//                     </h3>
//                   </div>
//                   <ScrollArea className="h-[400px]">
//                     <div className="p-4 space-y-4">
//                       {previewImages.length === 0 ? (
//                         <div className="text-center py-8 text-muted-foreground">
//                           No images added yet. Click "Add New Image" to get
//                           started.
//                         </div>
//                       ) : (
//                         previewImages.map((image) => (
//                           <div
//                             key={image.id}
//                             className="flex gap-4 p-4 border rounded-md"
//                           >
//                             <div className="w-24 h-24 relative flex-shrink-0">
//                               <Image
//                                 src={image.image || "/placeholder.svg"}
//                                 alt={image.title}
//                                 fill
//                                 className="object-cover rounded-md"
//                               />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <h4 className="font-medium truncate">
//                                 {image.title}
//                               </h4>
//                               <div className="flex items-center gap-2 mt-1">
//                                 {/* <Badge variant="secondary">
//                                   {image.category}
//                                 </Badge> */}
//                                 {image.date && (
//                                   <span className="text-xs text-muted-foreground flex items-center">
//                                     <Calendar className="h-3 w-3 mr-1" />
//                                     {new Date(image.date).toLocaleDateString()}
//                                   </span>
//                                 )}
//                               </div>
//                               {image.description && (
//                                 <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
//                                   {image.description}
//                                 </p>
//                               )}
//                             </div>
//                             <div className="flex flex-col gap-2">
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 onClick={() => editImage(image)}
//                               >
//                                 <Edit className="h-4 w-4" />
//                                 <span className="sr-only">Edit</span>
//                               </Button>
//                               {removing ? (
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   className="text-destructive"
//                                   disabled
//                                 >
//                                   <Loader2 className="h-4 w-4 animate-spin" />
//                                   <span className="sr-only">Deleting</span>
//                                 </Button>
//                               ) : (
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   className="text-destructive"
//                                   onClick={() => deleteImage(image.id)}
//                                 >
//                                   <Trash2 className="h-4 w-4" />
//                                   <span className="sr-only">Delete</span>
//                                 </Button>
//                               )}
//                             </div>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </ScrollArea>
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
//             See how your gallery section will look
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="border rounded-md overflow-hidden p-8">
//             <div className="max-w-5xl mx-auto">
//               {/* Header */}
//               <div className="text-center mb-12">
//                 <h2 className="text-3xl font-bold mb-4">{previewTitle}</h2>
//                 <p className="text-muted-foreground max-w-2xl mx-auto">
//                   {previewDescription}
//                 </p>
//               </div>

//               {/* Categories */}
//               <div className="flex flex-wrap justify-center gap-2 mb-8">
//                 {[{ id: "all", name: "All" }, ...initialCategories].map(
//                   (category) => (
//                     <Button
//                       key={category.id}
//                       variant={
//                         activeCategory.name === category.name
//                           ? "default"
//                           : "outline"
//                       }
//                       className="rounded-full"
//                       onClick={() => setActiveCategory(category)}
//                     >
//                       {category.name}
//                     </Button>
//                   )
//                 )}
//               </div>

//               {/* Gallery Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredImages.length === 0 ? (
//                   <div className="col-span-full text-center py-12 text-muted-foreground">
//                     No images found in this category.
//                   </div>
//                 ) : (
//                   filteredImages.map((image) => (
//                     <div
//                       key={image.id}
//                       className="group relative overflow-hidden rounded-lg"
//                     >
//                       <div className="aspect-[4/3] w-full relative">
//                         <Image
//                           src={image.image || "/placeholder.svg"}
//                           alt={image.title}
//                           fill
//                           className="object-cover transition-transform group-hover:scale-105"
//                         />
//                       </div>
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
//                       <div className="absolute bottom-0 left-0 right-0 p-4">
//                         <h3 className="text-white font-medium text-lg">
//                           {image.title}
//                         </h3>
//                         {image.description && (
//                           <p className="text-white/80 text-sm mt-1 line-clamp-2">
//                             {image.description}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//         {/* <CardFooter className="flex justify-between">
//           <Button variant="outline" onClick={resetChanges}>
//             Reset
//           </Button>
//           <Button onClick={saveChanges}>Save Changes</Button>
//         </CardFooter> */}
//       </Card>
//     </div>
//   );
// }

"use client";

import type React from "react";

import { useState } from "react";
import { Info, Plus, Trash2, Edit, Calendar, Loader2 } from "lucide-react";
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
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import { ScrollArea } from "../../../components/ui/scroll-area";
import {
  GalleryCategory,
  GalleryImageCreateDTO,
  GalleryImageDTO,
  Section,
} from "../../../types/types";
import { toast } from "sonner";
import {
  createActivity,
  createGalleryCategory,
  createGalleryImage,
  deleteSiteGalleryCategory,
  deleteSiteGalleryImage,
  updateSection,
} from "../../../actions/site";
import { getFormattedDate } from "../../../lib/getFormatedDate";
import { UploadButton } from "../../../lib/uploadthing";

// Define the GalleryImage interface
interface GalleryImage {
  id: number;
  src: string;
  category: string;
  title: string;
  description?: string;
  date?: string;
}

export default function GallerySectionForm({
  section,
  initialCategories,
  galleryImages,
}: {
  section: Section;
  initialCategories: GalleryCategory[];
  galleryImages: GalleryImageDTO[];
}) {
  // Kategorileri order'a göre sırala
  const sortedCategories = [...initialCategories].sort(
    (a, b) => a.order - b.order,
  );
  const cats = ["All", ...sortedCategories.map((cat) => cat.name)];

  // Gallery header content
  const [title, setTitle] = useState(section?.title ?? "");
  const [description, setDescription] = useState(section?.subtitle ?? "");

  // Categories
  const [categories, setCategories] = useState<string[]>(cats);
  const [newCategory, setNewCategory] = useState("");

  const [uploading, setUploading] = useState(false);

  const [GalleryImage, setGalleryImage] = useState("");

  // Gallery images
  const [images, setImages] = useState<GalleryImageDTO[]>(galleryImages);

  // New/Edit image form
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage>({
    id: 0,
    src: "",
    category: "",
    title: "",
    description: "",
    date: "",
  });
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(
    "/school/event-1.avif",
  );

  // Preview state
  const [loading, setLoading] = useState(false);
  const [previewTitle, setPreviewTitle] = useState(title);
  const [previewDescription, setPreviewDescription] = useState(description);
  const [previewCategories, setPreviewCategories] = useState<string[]>([
    ...cats,
  ]);
  const [previewImages, setPreviewImages] = useState<GalleryImageDTO[]>([
    ...images,
  ]);
  const [activeCategory, setActiveCategory] = useState({
    id: "all",
    name: "All",
  });

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setTempImageSrc(result);
      };
      reader.readAsDataURL(file);
    }
  };

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
        setGalleryImage(data.url);
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

  // Add new category
  const addCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name is required", {
        description: "Please enter a category name",
      });
      return;
    }

    if (previewCategories.includes(newCategory.trim())) {
      toast.error("Category already exists", {
        description: "This category name is already in use",
      });
      return;
    }

    setLoading(true);

    try {
      // Yeni kategorinin order'ını hesapla (mevcut kategori sayısı)
      const existingCategoriesCount = previewCategories.filter(
        (cat) => cat !== "All",
      ).length;

      const data = {
        schoolId: section.schoolId,
        name: newCategory.trim(),
        order: existingCategoriesCount, // ✅ order alanı eklendi
      };

      const newCategoryObj = await createGalleryCategory(data);

      // State'leri güncelle
      const updatedCategories = [...previewCategories, newCategory.trim()];
      setPreviewCategories(updatedCategories);
      setCategories(updatedCategories);
      setNewCategory("");

      toast.success("New Gallery Category added", {
        description: "New Gallery Category added Successfully",
      });
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const [removing, setRemoving] = useState(false);

  // Remove category
  const removeCategory = async (categoryToRemove: string) => {
    if (categoryToRemove === "All") {
      toast.error("Cannot remove 'All' category", {
        description: "The 'All' category is required for the gallery",
      });
      return;
    }

    setRemoving(true);

    try {
      const category = initialCategories.find(
        (item) => item.name === categoryToRemove,
      );

      if (!category) {
        throw new Error("Category not found");
      }

      await deleteSiteGalleryCategory(category.id);

      // Preview state'lerini güncelle
      setPreviewCategories(
        previewCategories.filter((cat) => cat !== categoryToRemove),
      );

      toast.success("Category Deleted Successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setRemoving(false);
    }
  };

  // Add new image
  const addImage = async () => {
    if (!tempImageSrc || !currentImage.title || !currentImage.category) {
      toast.error("Missing information", {
        description: "Please fill in all required fields",
      });
      return;
    }

    setLoading(true);

    try {
      const category = initialCategories.find(
        (c) => c.name === currentImage.category,
      );

      if (!category) {
        toast.error("Invalid category", {
          description: "Please select a valid category",
        });
        setLoading(false);
        return;
      }

      const data: GalleryImageCreateDTO = {
        schoolId: section.schoolId,
        title: currentImage.title,
        description: currentImage.description,
        image: tempImageSrc,
        date: currentImage.date,
        categoryId: category.id,
      };

      const image = await createGalleryImage(data);

      toast.success("New Gallery Image Added", {
        description: "Gallery image added successfully",
      });

      setPreviewImages([image, ...previewImages]);
      setCurrentImage({
        id: 0,
        src: "",
        category: "",
        title: "",
        description: "",
        date: "",
      });
      setTempImageSrc(null);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error adding image:", error);
      toast.error("Failed to add image", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  // Edit image
  const editImage = (image: GalleryImageDTO) => {
    const category = initialCategories.find((c) => c.id === image.categoryId);
    setCurrentImage({
      id: Number(image.id),
      src: image.image,
      category: category?.name || "",
      title: image.title,
      description: image.description || "",
      date: image.date || "",
    });
    setTempImageSrc(image.image);
    setIsEditMode(true);
  };

  // Delete image
  const deleteImage = async (id: string) => {
    setRemoving(true);
    try {
      await deleteSiteGalleryImage(id);
      setPreviewImages(previewImages.filter((img) => img.id !== id));
      toast.success("Gallery Image Deleted Successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setRemoving(false);
    }
  };

  // Filter images by category
  const filteredImages =
    activeCategory.name === "All"
      ? previewImages
      : previewImages.filter((img) => {
          const category = initialCategories.find(
            (c) => c.id === img.categoryId,
          );
          return category?.name === activeCategory.name;
        });

  // Save changes
  const saveChanges = async () => {
    setLoading(true);

    try {
      const data = {
        title: previewTitle,
        subtitle: previewDescription,
      };

      await updateSection(section.id, data);
      setTitle(previewTitle);
      setDescription(previewDescription);

      toast.success("Gallery section Updated", {
        description: "Gallery section updated successfully",
      });

      const activity = {
        activity: `Gallery section was Updated Successfully`,
        description: `Admin updated the gallery section`,
        time: getFormattedDate(new Date()),
        schoolId: section.schoolId,
      };
      await createActivity(activity);
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Gallery update failed", {
        description: "Failed to update gallery section",
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset changes
  const resetChanges = () => {
    setPreviewTitle(title);
    setPreviewDescription(description);
    setPreviewCategories([...cats]);
    setPreviewImages([...images]);
    toast.info("Changes reset", {
      description: "All changes have been reset to last saved state",
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Tabs defaultValue="header" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="images">Gallery Images</TabsTrigger>
        </TabsList>

        {/* Header Tab */}
        <TabsContent value="header" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gallery Header</CardTitle>
              <CardDescription>
                Update the gallery section title and description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gallery-title">Gallery Title</Label>
                  <Input
                    id="gallery-title"
                    value={previewTitle}
                    onChange={(e) => setPreviewTitle(e.target.value)}
                    placeholder="Enter gallery title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gallery-description">
                    Gallery Description
                  </Label>
                  <Textarea
                    id="gallery-description"
                    value={previewDescription}
                    onChange={(e) => setPreviewDescription(e.target.value)}
                    placeholder="Enter gallery description"
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
                  <Loader2 className="animate-spin mr-2" />
                  Saving...
                </Button>
              ) : (
                <Button onClick={saveChanges}>Save Changes</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gallery Categories</CardTitle>
              <CardDescription>
                Manage the categories for filtering gallery images
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  The "All" category is required and cannot be removed. When you
                  remove a category, any images in that category will be
                  archived as well as the category.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {previewCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="py-2 px-3"
                    >
                      {category}
                      {category !== "All" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-2 text-muted-foreground hover:text-destructive"
                          onClick={() => removeCategory(category)}
                          disabled={removing}
                        >
                          {removing ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                          <span className="sr-only">Remove {category}</span>
                        </Button>
                      )}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newCategory.trim()) {
                        addCategory();
                      }
                    }}
                  />
                  <Button
                    disabled={!newCategory.trim() || loading}
                    onClick={addCategory}
                    type="button"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gallery Images</CardTitle>
              <CardDescription>
                Manage the images in your gallery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Image
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-white text-black">
                  <DialogHeader>
                    <DialogTitle>
                      {isEditMode ? "Edit Image" : "Add New Image"}
                    </DialogTitle>
                    <DialogDescription>
                      Fill in the details for the gallery image.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-4 grid-cols-2">
                      {/* <div className="flex gap-4 items-start">
                         <UploadButton
                          className="col-span-full"
                          endpoint="logoImage"
                          onClientUploadComplete={(res) => {
                            console.log("Files: ", res);
                            setTempImageSrc(res[0].url);
                          }}
                          onUploadError={(error: Error) => {
                            console.log(error);
                            toast.error("Upload failed", {
                              description: error.message,
                            });
                          }}
                        /> 




                        
                        <Image
                          src={tempImageSrc || "/school/event-1.avif"}
                          alt="Gallery Image"
                          width={50}
                          height={50}
                          className="object-contain rounded-lg"
                        />
                      </div> */}

                
                        <div className="flex p-3 gap-4 items-start">
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
                   

                      <div className="space-y-2">
                        <Label htmlFor="image-date">Date (Optional)</Label>
                        <Input
                          id="image-date"
                          type="date"
                          value={currentImage.date || ""}
                          onChange={(e) =>
                            setCurrentImage({
                              ...currentImage,
                              date: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="image-title">Title *</Label>
                        <Input
                          id="image-title"
                          value={currentImage.title}
                          onChange={(e) =>
                            setCurrentImage({
                              ...currentImage,
                              title: e.target.value,
                            })
                          }
                          placeholder="Enter image title"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image-category">Category *</Label>
                        <Select
                          value={currentImage.category}
                          onValueChange={(value) =>
                            setCurrentImage({
                              ...currentImage,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger id="image-category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-black">
                            {previewCategories
                              .filter((cat) => cat !== "All")
                              .map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image-description">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="image-description"
                        value={currentImage.description || ""}
                        onChange={(e) =>
                          setCurrentImage({
                            ...currentImage,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter image description"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={addImage}
                      disabled={
                        loading ||
                        !tempImageSrc ||
                        !currentImage.title ||
                        !currentImage.category
                      }
                    >
                      {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isEditMode ? "Save Changes" : "Add Image"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="space-y-4">
                <div className="border rounded-md">
                  <div className="p-4 bg-muted">
                    <h3 className="font-medium">
                      Current Gallery Images ({previewImages.length})
                    </h3>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <div className="p-4 space-y-4">
                      {previewImages.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No images added yet. Click "Add New Image" to get
                          started.
                        </div>
                      ) : (
                        previewImages.map((image) => {
                          const category = initialCategories.find(
                            (c) => c.id === image.categoryId,
                          );
                          return (
                            <div
                              key={image.id}
                              className="flex gap-4 p-4 border rounded-md"
                            >
                              <div className="w-24 h-24 relative flex-shrink-0">
                                <img
                                  src={image.image || "/placeholder.svg"}
                                  alt={image.title}
                                  width={200}
                                  height={200}
                                  className="object-cover rounded-md"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">
                                  {image.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  {category && (
                                    <Badge variant="secondary">
                                      {category.name}
                                    </Badge>
                                  )}
                                  {image.date && (
                                    <span className="text-xs text-muted-foreground flex items-center">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      {new Date(
                                        image.date,
                                      ).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                                {image.description && (
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {image.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-col gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => editImage(image)}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive"
                                  onClick={() => deleteImage(image.id)}
                                  disabled={removing}
                                >
                                  {removing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </div>
                          );
                        })
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
            See how your gallery section will look
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden p-8">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{previewTitle}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {previewDescription}
                </p>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[{ id: "all", name: "All" }, ...sortedCategories].map(
                  (category) => (
                    <Button
                      key={category.id}
                      variant={
                        activeCategory.name === category.name
                          ? "default"
                          : "outline"
                      }
                      className="rounded-full"
                      onClick={() => setActiveCategory(category)}
                    >
                      {category.name}
                    </Button>
                  ),
                )}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No images found in this category.
                  </div>
                ) : (
                  filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-lg"
                    >
                      <div className="aspect-[4/3] w-full relative">
                        <img
                          src={image.image || "/placeholder.svg"}
                          alt={image.title}
                          
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-medium text-lg">
                          {image.title}
                        </h3>
                        {image.description && (
                          <p className="text-white/80 text-sm mt-1 line-clamp-2">
                            {image.description}
                          </p>
                        )}
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
