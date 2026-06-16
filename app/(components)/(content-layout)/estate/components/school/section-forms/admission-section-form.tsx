"use client";

import type React from "react";

import { useState } from "react";
import { Info, LinkIcon, Loader2 } from "lucide-react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Section } from "../../../types/types";
import { createActivity, updateSection } from "../../../actions/site";
import { toast } from "sonner";
import { getFormattedDate } from "../../../lib/getFormatedDate";
import { UploadButton } from "../../../lib/uploadthing";

export default function AdmissionSectionForm({
  section,
}: {
  section: Section;
}) {
  // Current values from the image
  const [title, setTitle] = useState(section.settings.title);
  const [subtitle, setSubtitle] = useState(section.settings.subtitle);
  const [description, setDescription] = useState(section.settings.description);
  const [backgroundColor, setBackgroundColor] = useState(
    section.settings.backgroundColor,
  ); // Green color from the image
  const [buttonText, setButtonText] = useState(section.settings.buttonText);
  const [buttonLink, setButtonLink] = useState(section.settings.buttonLink);
  const [studentImage, setStudentImage] = useState(
    section.settings.studentImage,
  );
  const [linkType, setLinkType] = useState(section.settings.linkType); // internal or external

  // Preview state
  const [previewTitle, setPreviewTitle] = useState(title);
  const [previewSubtitle, setPreviewSubtitle] = useState(subtitle);
  const [previewDescription, setPreviewDescription] = useState(description);
  const [previewBackgroundColor, setPreviewBackgroundColor] =
    useState(backgroundColor);
  const [previewButtonText, setPreviewButtonText] = useState(buttonText);
  const [previewButtonLink, setPreviewButtonLink] = useState(buttonLink);
  const [previewStudentImage, setPreviewStudentImage] = useState(studentImage);
  const [previewLinkType, setPreviewLinkType] = useState(linkType);

  // Navigation sections for internal link dropdown
  const navigationSections = [
    { id: "#about", name: "About Us" },
    { id: "#contact", name: "Contact" },
    { id: "#news", name: "News" },
    { id: "#events", name: "Events" },
    { id: "#gallery", name: "Gallery" },
  ];

  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [AdmissionImage, setAdmissionImage] = useState("");

  // Save changes
  const saveChanges = async () => {
    setLoading(true);
    setTitle(previewTitle);
    setSubtitle(previewSubtitle);
    setDescription(previewDescription);
    setBackgroundColor(previewBackgroundColor);
    setButtonText(previewButtonText);
    setButtonLink(previewButtonLink);
    setStudentImage(previewStudentImage);
    setLinkType(previewLinkType);
    const data = {
      settings: {
        title: previewTitle,
        subtitle: previewSubtitle,
        description: previewDescription,
        backgroundColor: previewBackgroundColor,
        buttonText: previewButtonText,
        buttonLink: previewButtonLink,
        studentImage: previewStudentImage,
        linkType: previewLinkType,
      },
    };
    try {
      console.log(data);
      await updateSection(section.id, data);
      setLoading(false);
      toast.success("Admission section Updated", {
        description: " Admission section Updated Successfully ",
      });
      const activity = {
        activity: `Admission section was Updated Successfully`,
        description: `Admin Updated the Admission section Links`,
        time: getFormattedDate(new Date()),
        schoolId: section.schoolId,
      };
      await createActivity(activity);
    } catch (error) {
      setLoading(false);
      toast.error("Logo updated Failed", {
        description: " Logo Navigation Failed to update ",
      });
      console.log(error);
    }
  };

  // Reset changes
  const resetChanges = () => {
    setPreviewTitle(title);
    setPreviewSubtitle(subtitle);
    setPreviewDescription(description);
    setPreviewBackgroundColor(backgroundColor);
    setPreviewButtonText(buttonText);
    setPreviewButtonLink(buttonLink);
    setPreviewStudentImage(studentImage);
    setPreviewLinkType(linkType);
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
        setAdmissionImage(data.url);
        setPreviewStudentImage(data.url); // Preview için de güncelliyoruz
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

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="button">Apply Button</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admission Content</CardTitle>
              <CardDescription>
                Update your admission section text content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admission-title">Section Title</Label>
                  <Input
                    id="admission-title"
                    value={previewTitle}
                    onChange={(e) => setPreviewTitle(e.target.value)}
                    placeholder="Enter section title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admission-subtitle">Subtitle</Label>
                  <Input
                    id="admission-subtitle"
                    value={previewSubtitle}
                    onChange={(e) => setPreviewSubtitle(e.target.value)}
                    placeholder="Enter subtitle"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admission-description">Description</Label>
                  <Textarea
                    id="admission-description"
                    value={previewDescription}
                    onChange={(e) => setPreviewDescription(e.target.value)}
                    placeholder="Enter description"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Appearance</CardTitle>
              <CardDescription>
                Update the background color and student image
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="background-color">Background Color</Label>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: previewBackgroundColor }}
                    />
                    <div className="flex-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-sm"
                                style={{
                                  backgroundColor: previewBackgroundColor,
                                }}
                              />
                              <span>{previewBackgroundColor}</span>
                            </div>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4">
                          <HexColorPicker
                            color={previewBackgroundColor}
                            onChange={setPreviewBackgroundColor}
                          />
                          <div className="mt-4">
                            <Input
                              value={previewBackgroundColor}
                              onChange={(e) =>
                                setPreviewBackgroundColor(e.target.value)
                              }
                              className="mt-2"
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-image">Student Image</Label>
                  <div className="flex flex-col gap-4">
                    {/* <div className="border rounded-md p-2 w-full h-64 flex items-center justify-center bg-muted">
                      <Image
                        src={
                          previewStudentImage ||
                          "/management/images/placeholder.jpg"
                        }
                        alt="Student"
                        width={300}
                        height={200}
                        className="object-contain"
                      />
                    </div> */}

                    <div className="border rounded-md p-2 w-full h-64 flex items-center justify-center bg-muted">
                      <Image
                        src={
                          previewStudentImage ||
                          AdmissionImage ||
                          "/management/images/placeholder.jpg"
                        }
                        alt="Student"
                        width={300}
                        height={200}
                        className="object-contain"
                      />
                    </div>
                    {/* <div className="flex-1">
                      <UploadButton
                        className="col-span-full"
                        endpoint="logoImage"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          console.log("Files: ", res);
                          ``;
                          // logoImage(res[0].url);
                          setPreviewStudentImage(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                          // Do something with the error.
                          console.log(error);
                          alert(`ERROR! ${error.message}`);
                        }}
                      />
                    </div> */}

                    <div className="flex-1">
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
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Recommended image size: 800x600 pixels. Use a high-quality
                    image of a student that represents your school.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Button Tab */}
        <TabsContent value="button" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apply Button</CardTitle>
              <CardDescription>
                Customize the "Apply Now" button text and link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  Make sure the button links to a valid application form or
                  contact page where prospective students can apply.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="button-text">Button Text</Label>
                  <Input
                    id="button-text"
                    value={previewButtonText}
                    onChange={(e) => setPreviewButtonText(e.target.value)}
                    placeholder="Enter button text"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Link Type</Label>
                  <RadioGroup
                    value={previewLinkType}
                    onValueChange={setPreviewLinkType}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="internal" id="link-internal" />
                      <Label htmlFor="link-internal">Internal Page</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="external" id="link-external" />
                      <Label htmlFor="link-external">External URL</Label>
                    </div>
                  </RadioGroup>
                </div>

                {previewLinkType === "internal" ? (
                  <div className="space-y-2">
                    <Label htmlFor="internal-link">Select Page</Label>
                    <Select
                      value={previewButtonLink}
                      onValueChange={setPreviewButtonLink}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a page" />
                      </SelectTrigger>
                      <SelectContent>
                        {navigationSections.map((section) => (
                          <SelectItem key={section.id} value={section.id}>
                            {section.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="external-link">External URL</Label>
                    <div className="flex">
                      <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        id="external-link"
                        value={previewButtonLink}
                        onChange={(e) => setPreviewButtonLink(e.target.value)}
                        placeholder="https://example.com/apply"
                        className="rounded-l-none"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter the full URL including https://
                    </p>
                  </div>
                )}
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
            See how your admission section will look
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 h-64 md:h-auto relative bg-slate-200">
                {/* <Image
                  src={previewStudentImage || "/placeholder.svg"}
                  alt="Student"
                  fill
                  className="object-cover"
                /> */}
              </div>
              <div
                className="p-8 md:w-1/2 flex flex-col justify-center space-y-6"
                style={{ backgroundColor: previewBackgroundColor }}
              >
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    {previewTitle}
                  </h2>
                  <p className="text-white/90 font-medium">{previewSubtitle}</p>
                  <p className="text-white/90">{previewDescription}</p>
                </div>

                <div>
                  <Button variant="outline" className="">
                    {previewButtonText}
                  </Button>
                </div>
              </div>
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
    </div>
  );
}
