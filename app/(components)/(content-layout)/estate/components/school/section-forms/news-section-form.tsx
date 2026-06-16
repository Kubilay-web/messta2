"use client";

import type React from "react";

import { useState } from "react";
import { Plus, Trash2, Edit, Calendar, Loader2 } from "lucide-react";
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
import { News, Section } from "../../../types/types";
import { toast } from "sonner";
import {
  addNewsItem,
  createActivity,
  updateSection,
} from "../../../actions/site";
import { getFormattedDate } from "../../../lib/getFormatedDate";
import { UploadButton } from "../../../lib/uploadthing";
// import useSchoolStore from "../../../store/school";

// Define the NewsItem interface
export interface NewsItem {
  title: string;
  content: string;
  image: string;
  schoolId: string;
}

export default function NewsSectionForm({
  section,
  recentNews,
  schoolId,
}: {
  section: Section;
  recentNews: News[];
  schoolId: string;
}) {
  // Section header
  // const { school } = useSchoolStore();
  const [sectionTitle, setSectionTitle] = useState(section.title);
  const [viewDescriptionText, setViewDescriptionText] = useState(
    section.subtitle,
  );

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // News items
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  const [NewsImage, setNewsImage] = useState("");

  // New/Edit news form
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentNews, setCurrentNews] = useState<NewsItem>({
    title: "",
    content: "",
    image: "",
    schoolId: "",
  });
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(
    "/management/school/news-1.jpg",
  );
  // const [loading, setLoading] = useState(false);
  // Preview state
  const [previewSectionTitle, setPreviewSectionTitle] = useState(sectionTitle);
  const [previewDescriptionText, setPreviewDescriptionText] =
    useState(viewDescriptionText);

  const [previewNewsItems, setPreviewNewsItems] = useState<NewsItem[]>([
    ...newsItems,
  ]);

  // Add/Edit news item
  const saveNewsItem = async () => {
    if (tempImageSrc && currentNews.title) {
      setLoading(true);
      try {
        const newItem: NewsItem = {
          ...currentNews,
          image: tempImageSrc,
          schoolId: schoolId ?? "",
        };

        console.log(newItem);
        await addNewsItem(newItem);
        setLoading(false);
        toast.success("New News Item Added successfully");
        // Reset form
        setCurrentNews({
          title: "",
          content: "",
          image: "",
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
        setNewsImage(data.url);
        toast.success("Image uploaded");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Upload error");
    } finally {
      setUploading(false);
    }
  };

  // Edit news item
  const editNewsItem = (item: NewsItem) => {
    setCurrentNews(item);
    setTempImageSrc(item.image);
    setIsEditMode(true);
  };

  // Delete news item
  const deleteNewsItem = (id: string) => {
    console.log(id);
  };

  // Update excerpt when content changes
  const handleContentChange = (content: string) => {
    setCurrentNews({
      ...currentNews,
      content,
    });
  };

  // Save all changes
  const saveChanges = async () => {
    setLoading(true);
    setSectionTitle(previewSectionTitle);
    setViewDescriptionText(previewDescriptionText);
    // setNewsItems([...previewNewsItems]);
    const data = {
      title: previewSectionTitle,
      subtitle: previewDescriptionText,
    };

    try {
      // console.log(data);
      await updateSection(section.id, data);
      setLoading(false);
      toast.success("News section updated", {
        description: " News section Updated Successfully ",
      });
      const activity = {
        activity: `News section Updated Successfully`,
        description: `Admin Updated the News section `,
        time: getFormattedDate(new Date()),
        schoolId: section.schoolId,
      };
      await createActivity(activity);
    } catch (error) {
      setLoading(false);
      toast.error("News section update Failed", {
        description: " News section Failed to update ",
      });
      console.log(error);
    }
  };

  // Reset changes
  const resetChanges = () => {
    setPreviewSectionTitle(sectionTitle);
    setPreviewDescriptionText(viewDescriptionText);
    setPreviewNewsItems([...newsItems]);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Tabs defaultValue="header" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="header">Section Header</TabsTrigger>
          <TabsTrigger value="news">News Items</TabsTrigger>
        </TabsList>

        {/* Header Tab */}
        <TabsContent value="header" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>News Sections</CardTitle>
              <CardDescription>
                Update the news section title and description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="news-title">News Title</Label>
                  <Input
                    id="news-title"
                    value={previewSectionTitle}
                    onChange={(e) => setPreviewSectionTitle(e.target.value)}
                    placeholder="Enter gallery title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gallery-description">News Description</Label>
                  <Textarea
                    id="gallery-description"
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

        {/* News Items Tab */}
        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>News Items</CardTitle>
              <CardDescription>
                Manage the news items in your section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 bg-white text-black">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add News Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px] bg-white text-black">
                  <DialogHeader>
                    <DialogTitle>
                      {isEditMode ? "Edit News Item" : "Add News Item"}
                    </DialogTitle>
                    <DialogDescription>
                      Fill in the details for the news item.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="news-title">Title</Label>
                        <Input
                          id="news-title"
                          value={currentNews.title}
                          onChange={(e) => {
                            setCurrentNews({
                              ...currentNews,
                              title: e.target.value,
                            });
                          }}
                          placeholder="Enter news title"
                        />
                      </div>
                      <div className="flex flex-col ">
                        <Label className="text-center" htmlFor="news-image">
                          Featured Image
                        </Label>

                        <div className="flex items-start gap-4 mt-3 justify-center">
                          {/* <Image
                            src={""}
                            alt="logo"
                            width={80}
                            height={80}
                            className="object-contain border rounded"
                          /> */}
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
                            src={tempImageSrc ?? "/management/school/news-1.jpg"}
                            width={300}
                            height={300}
                            className="w-20 rounded-xl"
                          />
                        </div> */}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="news-content">Content</Label>
                      <Textarea
                        id="news-content"
                        value={currentNews.content}
                        onChange={(e) => handleContentChange(e.target.value)}
                        placeholder="Enter news content"
                        rows={5}
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
                        onClick={saveNewsItem}
                        disabled={!tempImageSrc || !currentNews.title}
                      >
                        {isEditMode ? "Save Changes" : "Add News Item"}
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="space-y-4">
                <div className="border rounded-md">
                  <div className="p-4 bg-muted">
                    <h3 className="font-medium">
                      Current News Items ({recentNews.length}) - We only show 6
                      last news Items
                    </h3>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <div className="p-4 space-y-4">
                      {recentNews.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No news items added yet. Click "Add News Item" to get
                          started.
                        </div>
                      ) : (
                        recentNews.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 p-4 border rounded-md"
                          >
                            <div className="w-24 h-24 relative flex-shrink-0">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium truncate">
                                  {item.title}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(item.createdAt).toLocaleDateString()}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {item.content}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => editNewsItem(item)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => deleteNewsItem(item.id)}
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
          <CardDescription>See how your news section will look</CardDescription>
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

              {/* News Grid */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {previewNewsItems.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No news items to display.
                  </div>
                ) : (
                  previewNewsItems.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                      <div className="aspect-[3/2] w-full relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground mb-4">
                          {item.excerpt}
                        </p>
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
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
