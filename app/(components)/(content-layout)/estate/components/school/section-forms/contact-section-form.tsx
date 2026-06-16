"use client";

import { useState } from "react";
import { Info, MapPin, Mail, Phone, Clock, Loader2 } from "lucide-react";

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
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { Section } from "../../../types/types";
import { createActivity, updateSection } from "../../../actions/site";
import { toast } from "sonner";
import { getFormattedDate } from "../../../lib/getFormatedDate";

export default function ContactSectionForm({ section }: { section: Section }) {
  const test = {
    type: "CONTACT",
    title: "Get In Touch",
    subtitle: "We'd love to hear from you",
    isActive: true,
    order: 9,
    settings: {
      title: "Get In Touch",
      description:
        "We offer extensive educational programs to outbound and inbound students and we are very proud of our successful student achievement track record.",
      locationInfo: {
        title: "Our Location",
        address: "P.O.Box 430337, Bristol, WA 98765-4321",
        note: "Visit us for a consultation",
      },
      emailInfo: {
        title: "Email Us",
        email: "info../../..abcschool.edu",
        note: "We'll respond as soon as possible",
      },
      phoneInfo: {
        title: "Call Us",
        phone: "+1 (123) 456-7890",
        note: "Mon-Fri from 8am to 5pm",
      },
      hoursInfo: {
        title: "Working Hours",
        hours: "8:00 AM - 5:00 PM, Monday-Friday",
        note: "Closed on weekends and holidays",
      },
      formSettings: {
        nameLabel: "Full Name",
        namePlaceholder: "John Doe",
        phoneLabel: "Phone Number",
        phonePlaceholder: "+1 (123) 456-7890",
        emailLabel: "Email Address",
        emailPlaceholder: "john../../..example.com",
        subjectLabel: "Subject",
        subjectPlaceholder: "How can we help?",
        messageLabel: "Message",
        messagePlaceholder: "Your message here...",
        buttonText: "Send Message",
        buttonColor: "#10B981",
      },
    },
  };
  // Header content
  const [title, setTitle] = useState(section.settings.title);
  const [description, setDescription] = useState(section.settings.description);

  // Contact cards
  const [locationInfo, setLocationInfo] = useState(
    section.settings.locationInfo
  );

  const [emailInfo, setEmailInfo] = useState(section.settings.emailInfo);

  const [phoneInfo, setPhoneInfo] = useState(section.settings.phoneInfo);

  const [hoursInfo, setHoursInfo] = useState(section.settings.hoursInfo);

  // Form settings
  const [formSettings, setFormSettings] = useState(
    section.settings.formSettings
  );

  // Preview state
  const [previewTitle, setPreviewTitle] = useState(title);
  const [previewDescription, setPreviewDescription] = useState(description);
  const [previewLocationInfo, setPreviewLocationInfo] = useState({
    ...locationInfo,
  });
  const [previewEmailInfo, setPreviewEmailInfo] = useState({ ...emailInfo });
  const [previewPhoneInfo, setPreviewPhoneInfo] = useState({ ...phoneInfo });
  const [previewHoursInfo, setPreviewHoursInfo] = useState({ ...hoursInfo });
  const [previewFormSettings, setPreviewFormSettings] = useState({
    ...formSettings,
  });

  // Handle location info change
  const handleLocationInfoChange = (
    field: keyof typeof locationInfo,
    value: string
  ) => {
    setPreviewLocationInfo({
      ...previewLocationInfo,
      [field]: value,
    });
  };
  const [loading, setLoading] = useState(false);
  // Handle email info change
  const handleEmailInfoChange = (
    field: keyof typeof emailInfo,
    value: string
  ) => {
    setPreviewEmailInfo({
      ...previewEmailInfo,
      [field]: value,
    });
  };

  // Handle phone info change
  const handlePhoneInfoChange = (
    field: keyof typeof phoneInfo,
    value: string
  ) => {
    setPreviewPhoneInfo({
      ...previewPhoneInfo,
      [field]: value,
    });
  };

  // Handle hours info change
  const handleHoursInfoChange = (
    field: keyof typeof hoursInfo,
    value: string
  ) => {
    setPreviewHoursInfo({
      ...previewHoursInfo,
      [field]: value,
    });
  };

  // Handle form settings change
  const handleFormSettingsChange = (
    field: keyof typeof formSettings,
    value: string
  ) => {
    setPreviewFormSettings({
      ...previewFormSettings,
      [field]: value,
    });
  };

  // Save changes
  const saveChanges = async () => {
    setLoading(true);
    setTitle(previewTitle);
    setDescription(previewDescription);

    const data = {
      settings: {
        ...section.settings,
        title: previewTitle,
        description: previewDescription,
      },
    };
    try {
      console.log(data);
      await updateSection(section.id, data);
      setLoading(false);
      toast.success("Contact section Updated", {
        description: " Contact section Updated Successfully ",
      });
      const activity = {
        activity: `Contact section was Updated Successfully`,
        description: `Admin Updated the Contact section header `,
        time: getFormattedDate(new Date()),
        schoolId: section.schoolId,
      };
      await createActivity(activity);
    } catch (error) {
      setLoading(false);
      toast.error("Contact updated Failed", {
        description: " Contact section Failed to update ",
      });
      console.log(error);
    }
  };
  const saveCardsChanges = async () => {
    setLoading(true);
    setLocationInfo({ ...previewLocationInfo });
    setEmailInfo({ ...previewEmailInfo });
    setPhoneInfo({ ...previewPhoneInfo });
    setHoursInfo({ ...previewHoursInfo });
    const data = {
      settings: {
        ...section.settings,
        locationInfo: previewLocationInfo,
        emailInfo: previewEmailInfo,
        phoneInfo: previewPhoneInfo,
        hoursInfo: previewHoursInfo,
      },
    };
    try {
      console.log(data);
      await updateSection(section.id, data);
      setLoading(false);
      toast.success("Contact section Updated", {
        description: " Contact section Updated Successfully ",
      });
      const activity = {
        activity: `Contact section was Updated Successfully`,
        description: `Admin Updated the Contact section header `,
        time: getFormattedDate(new Date()),
        schoolId: section.schoolId,
      };
      await createActivity(activity);
    } catch (error) {
      setLoading(false);
      toast.error("Contact updated Failed", {
        description: " Contact section Failed to update ",
      });
      console.log(error);
    }
  };
  const saveFormSettings = async () => {
    setLoading(true);
    setFormSettings({ ...previewFormSettings });
    const data = {
      settings: {
        ...section.settings,
        formSettings: previewFormSettings,
      },
    };
    try {
      console.log(data);
      await updateSection(section.id, data);
      setLoading(false);
      toast.success("Contact section Updated", {
        description: " Contact section Updated Successfully ",
      });
      const activity = {
        activity: `Contact section was Updated Successfully`,
        description: `Admin Updated the Contact section header `,
        time: getFormattedDate(new Date()),
        schoolId: section.schoolId,
      };
      await createActivity(activity);
    } catch (error) {
      setLoading(false);
      toast.error("Contact updated Failed", {
        description: " Contact section Failed to update ",
      });
      console.log(error);
    }
  };
  // setEmailInfo({ ...previewEmailInfo });
  // setPhoneInfo({ ...previewPhoneInfo });
  // setHoursInfo({ ...previewHoursInfo });
  // setFormSettings({ ...previewFormSettings });
  // alert("Contact section changes saved successfully!");
  // Reset changes
  const resetChanges = () => {
    setPreviewTitle(title);
    setPreviewDescription(description);
    setPreviewLocationInfo({ ...locationInfo });
    setPreviewEmailInfo({ ...emailInfo });
    setPreviewPhoneInfo({ ...phoneInfo });
    setPreviewHoursInfo({ ...hoursInfo });
    setPreviewFormSettings({ ...formSettings });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Tabs defaultValue="header" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="contact-cards">Contact Cards</TabsTrigger>
          <TabsTrigger value="form">Contact Form</TabsTrigger>
        </TabsList>

        {/* Header Tab */}
        <TabsContent value="header" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Header Content</CardTitle>
              <CardDescription>
                Update the contact section title and description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-title">Section Title</Label>
                  <Input
                    id="contact-title"
                    value={previewTitle}
                    onChange={(e) => setPreviewTitle(e.target.value)}
                    placeholder="Enter section title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-description">
                    Section Description
                  </Label>
                  <Textarea
                    id="contact-description"
                    value={previewDescription}
                    onChange={(e) => setPreviewDescription(e.target.value)}
                    placeholder="Enter section description"
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

        {/* Contact Cards Tab */}
        <TabsContent value="contact-cards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information Cards</CardTitle>
              <CardDescription>
                Update the contact information displayed in cards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location Card */}
                <div className="space-y-4 p-4 border rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium">
                      Location Information
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location-title">Card Title</Label>
                    <Input
                      id="location-title"
                      value={previewLocationInfo.title}
                      onChange={(e) =>
                        handleLocationInfoChange("title", e.target.value)
                      }
                      placeholder="Card Title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location-address">Address</Label>
                    <Input
                      id="location-address"
                      value={previewLocationInfo.address}
                      onChange={(e) =>
                        handleLocationInfoChange("address", e.target.value)
                      }
                      placeholder="Address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location-note">Additional Note</Label>
                    <Input
                      id="location-note"
                      value={previewLocationInfo.note}
                      onChange={(e) =>
                        handleLocationInfoChange("note", e.target.value)
                      }
                      placeholder="Additional Note"
                    />
                  </div>
                </div>

                {/* Email Card */}
                <div className="space-y-4 p-4 border rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium">Email Information</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-title">Card Title</Label>
                    <Input
                      id="email-title"
                      value={previewEmailInfo.title}
                      onChange={(e) =>
                        handleEmailInfoChange("title", e.target.value)
                      }
                      placeholder="Card Title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-address">Email Address</Label>
                    <Input
                      id="email-address"
                      value={previewEmailInfo.email}
                      onChange={(e) =>
                        handleEmailInfoChange("email", e.target.value)
                      }
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-note">Additional Note</Label>
                    <Input
                      id="email-note"
                      value={previewEmailInfo.note}
                      onChange={(e) =>
                        handleEmailInfoChange("note", e.target.value)
                      }
                      placeholder="Additional Note"
                    />
                  </div>
                </div>

                {/* Phone Card */}
                <div className="space-y-4 p-4 border rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium">Phone Information</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone-title">Card Title</Label>
                    <Input
                      id="phone-title"
                      value={previewPhoneInfo.title}
                      onChange={(e) =>
                        handlePhoneInfoChange("title", e.target.value)
                      }
                      placeholder="Card Title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input
                      id="phone-number"
                      value={previewPhoneInfo.phone}
                      onChange={(e) =>
                        handlePhoneInfoChange("phone", e.target.value)
                      }
                      placeholder="Phone Number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone-note">Additional Note</Label>
                    <Input
                      id="phone-note"
                      value={previewPhoneInfo.note}
                      onChange={(e) =>
                        handlePhoneInfoChange("note", e.target.value)
                      }
                      placeholder="Additional Note"
                    />
                  </div>
                </div>

                {/* Hours Card */}
                <div className="space-y-4 p-4 border rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium">
                      Working Hours Information
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours-title">Card Title</Label>
                    <Input
                      id="hours-title"
                      value={previewHoursInfo.title}
                      onChange={(e) =>
                        handleHoursInfoChange("title", e.target.value)
                      }
                      placeholder="Card Title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours-info">Working Hours</Label>
                    <Input
                      id="hours-info"
                      value={previewHoursInfo.hours}
                      onChange={(e) =>
                        handleHoursInfoChange("hours", e.target.value)
                      }
                      placeholder="Working Hours"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours-note">Additional Note</Label>
                    <Input
                      id="hours-note"
                      value={previewHoursInfo.note}
                      onChange={(e) =>
                        handleHoursInfoChange("note", e.target.value)
                      }
                      placeholder="Additional Note"
                    />
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
                <Button onClick={saveCardsChanges}>Save Changes</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Form Tab */}
        <TabsContent value="form" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form Settings</CardTitle>
              <CardDescription>
                Customize the contact form labels, placeholders, and button
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  You can only customize the existing form fields. Adding new
                  form fields is not supported.
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-label">Name Field Label</Label>
                    <Input
                      id="name-label"
                      value={previewFormSettings.nameLabel}
                      onChange={(e) =>
                        handleFormSettingsChange("nameLabel", e.target.value)
                      }
                      placeholder="Field Label"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name-placeholder">
                      Name Field Placeholder
                    </Label>
                    <Input
                      id="name-placeholder"
                      value={previewFormSettings.namePlaceholder}
                      onChange={(e) =>
                        handleFormSettingsChange(
                          "namePlaceholder",
                          e.target.value
                        )
                      }
                      placeholder="Field Placeholder"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone-label">Phone Field Label</Label>
                    <Input
                      id="phone-label"
                      value={previewFormSettings.phoneLabel}
                      onChange={(e) =>
                        handleFormSettingsChange("phoneLabel", e.target.value)
                      }
                      placeholder="Field Label"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone-placeholder">
                      Phone Field Placeholder
                    </Label>
                    <Input
                      id="phone-placeholder"
                      value={previewFormSettings.phonePlaceholder}
                      onChange={(e) =>
                        handleFormSettingsChange(
                          "phonePlaceholder",
                          e.target.value
                        )
                      }
                      placeholder="Field Placeholder"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-label">Email Field Label</Label>
                    <Input
                      id="email-label"
                      value={previewFormSettings.emailLabel}
                      onChange={(e) =>
                        handleFormSettingsChange("emailLabel", e.target.value)
                      }
                      placeholder="Field Label"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-placeholder">
                      Email Field Placeholder
                    </Label>
                    <Input
                      id="email-placeholder"
                      value={previewFormSettings.emailPlaceholder}
                      onChange={(e) =>
                        handleFormSettingsChange(
                          "emailPlaceholder",
                          e.target.value
                        )
                      }
                      placeholder="Field Placeholder"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject-label">Subject Field Label</Label>
                    <Input
                      id="subject-label"
                      value={previewFormSettings.subjectLabel}
                      onChange={(e) =>
                        handleFormSettingsChange("subjectLabel", e.target.value)
                      }
                      placeholder="Field Label"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject-placeholder">
                      Subject Field Placeholder
                    </Label>
                    <Input
                      id="subject-placeholder"
                      value={previewFormSettings.subjectPlaceholder}
                      onChange={(e) =>
                        handleFormSettingsChange(
                          "subjectPlaceholder",
                          e.target.value
                        )
                      }
                      placeholder="Field Placeholder"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="message-label">Message Field Label</Label>
                    <Input
                      id="message-label"
                      value={previewFormSettings.messageLabel}
                      onChange={(e) =>
                        handleFormSettingsChange("messageLabel", e.target.value)
                      }
                      placeholder="Field Label"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message-placeholder">
                      Message Field Placeholder
                    </Label>
                    <Input
                      id="message-placeholder"
                      value={previewFormSettings.messagePlaceholder}
                      onChange={(e) =>
                        handleFormSettingsChange(
                          "messagePlaceholder",
                          e.target.value
                        )
                      }
                      placeholder="Field Placeholder"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="button-text">Button Text</Label>
                    <Input
                      id="button-text"
                      value={previewFormSettings.buttonText}
                      onChange={(e) =>
                        handleFormSettingsChange("buttonText", e.target.value)
                      }
                      placeholder="Button Text"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="button-color">Button Color</Label>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{
                          backgroundColor: previewFormSettings.buttonColor,
                        }}
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
                                    backgroundColor:
                                      previewFormSettings.buttonColor,
                                  }}
                                />
                                <span>{previewFormSettings.buttonColor}</span>
                              </div>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-4">
                            <HexColorPicker
                              color={previewFormSettings.buttonColor}
                              onChange={(color) =>
                                handleFormSettingsChange("buttonColor", color)
                              }
                            />
                            <div className="mt-4">
                              <Input
                                value={previewFormSettings.buttonColor}
                                onChange={(e) =>
                                  handleFormSettingsChange(
                                    "buttonColor",
                                    e.target.value
                                  )
                                }
                                className="mt-2"
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
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
                <Button onClick={saveFormSettings}>Save Changes</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            See how your contact section will look
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden p-8 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{previewTitle}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {previewDescription}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {/* Location Card */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full mb-4">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-bold mb-2">
                      {previewLocationInfo.title}
                    </h3>
                    <p className="text-green-600 mb-2">
                      {previewLocationInfo.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {previewLocationInfo.note}
                    </p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full mb-4">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-bold mb-2">{previewEmailInfo.title}</h3>
                    <p className="text-green-600 mb-2">
                      {previewEmailInfo.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {previewEmailInfo.note}
                    </p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full mb-4">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-bold mb-2">{previewPhoneInfo.title}</h3>
                    <p className="text-green-600 mb-2">
                      {previewPhoneInfo.phone}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {previewPhoneInfo.note}
                    </p>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full mb-4">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-bold mb-2">{previewHoursInfo.title}</h3>
                    <p className="text-green-600 mb-2">
                      {previewHoursInfo.hours}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {previewHoursInfo.note}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="preview-name">
                      {previewFormSettings.nameLabel}
                    </Label>
                    <Input
                      id="preview-name"
                      placeholder={previewFormSettings.namePlaceholder}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preview-phone">
                      {previewFormSettings.phoneLabel}
                    </Label>
                    <Input
                      id="preview-phone"
                      placeholder={previewFormSettings.phonePlaceholder}
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <Label htmlFor="preview-email">
                    {previewFormSettings.emailLabel}
                  </Label>
                  <Input
                    id="preview-email"
                    placeholder={previewFormSettings.emailPlaceholder}
                    disabled
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <Label htmlFor="preview-subject">
                    {previewFormSettings.subjectLabel}
                  </Label>
                  <Input
                    id="preview-subject"
                    placeholder={previewFormSettings.subjectPlaceholder}
                    disabled
                  />
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="preview-message">
                    {previewFormSettings.messageLabel}
                  </Label>
                  <Textarea
                    id="preview-message"
                    placeholder={previewFormSettings.messagePlaceholder}
                    rows={5}
                    disabled
                  />
                </div>

                <Button
                  className="w-full"
                  style={{ backgroundColor: previewFormSettings.buttonColor }}
                >
                  {previewFormSettings.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        {/* <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetChanges}>
            Reset
          </Button>
          <Button onClick={saveChanges}>Save Changes</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}
