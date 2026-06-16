"use client";

import type React from "react";

import { useState } from "react";
import { Info, Phone, Mail } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
import { Switch } from "../../../components/ui/switch";
import { Separator } from "../../../components/ui/separator";

export default function FooterSectionForm() {
  // Contact Information
  const [logo, setLogo] = useState("/school/logo.jpg?height=100&width=100");
  const [address, setAddress] = useState({
    line1: "Box 34590",
    line2: "2nd Floor, Plaza 2",
    line3: "Bristol, WA 98765-4321",
    line4: "Brooklyn",
  });
  const [phone, setPhone] = useState("+123-4567890");
  const [email, setEmail] = useState("abc../../..school.com");

  // Footer Links
  const [aboutLinks, setAboutLinks] = useState([
    { id: 1, label: "Overview", url: "/about" },
    { id: 2, label: "Admissions", url: "/admissions" },
    { id: 3, label: "Academics", url: "/academics" },
    { id: 4, label: "Infrastructure", url: "/infrastructure" },
    { id: 5, label: "Gallery", url: "/gallery" },
    { id: 6, label: "News", url: "/news" },
  ]);

  const [adminLinks, setAdminLinks] = useState([
    { id: 1, label: "Calendar", url: "/calendar" },
    { id: 2, label: "Email Login", url: "/login" },
  ]);

  // Social Media
  const [socialMedia, setSocialMedia] = useState([
    { id: 1, platform: "Facebook", url: "https://facebook.com", enabled: true },
    { id: 2, platform: "Twitter", url: "https://twitter.com", enabled: true },
    { id: 3, platform: "YouTube", url: "https://youtube.com", enabled: true },
    {
      id: 4,
      platform: "Instagram",
      url: "https://instagram.com",
      enabled: true,
    },
  ]);

  // Copyright and Legal
  const [copyright, setCopyright] = useState(
    "Copyright © 2025 ABC Matric High School. All Rights Reserved."
  );
  const [termsUrl, setTermsUrl] = useState("/terms");
  const [privacyUrl, setPrivacyUrl] = useState("/privacy");

  // Preview state
  const [previewLogo, setPreviewLogo] = useState(logo);
  const [previewAddress, setPreviewAddress] = useState({ ...address });
  const [previewPhone, setPreviewPhone] = useState(phone);
  const [previewEmail, setPreviewEmail] = useState(email);
  const [previewAboutLinks, setPreviewAboutLinks] = useState([...aboutLinks]);
  const [previewAdminLinks, setPreviewAdminLinks] = useState([...adminLinks]);
  const [previewSocialMedia, setPreviewSocialMedia] = useState([
    ...socialMedia,
  ]);
  const [previewCopyright, setPreviewCopyright] = useState(copyright);
  const [previewTermsUrl, setPreviewTermsUrl] = useState(termsUrl);
  const [previewPrivacyUrl, setPreviewPrivacyUrl] = useState(privacyUrl);

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewLogo(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle address change
  const handleAddressChange = (field: keyof typeof address, value: string) => {
    setPreviewAddress({
      ...previewAddress,
      [field]: value,
    });
  };

  // Handle about links change
  const handleAboutLinkChange = (
    id: number,
    field: "label" | "url",
    value: string
  ) => {
    const updatedLinks = previewAboutLinks.map((link) =>
      link.id === id ? { ...link, [field]: value } : link
    );
    setPreviewAboutLinks(updatedLinks);
  };

  // Handle admin links change
  const handleAdminLinkChange = (
    id: number,
    field: "label" | "url",
    value: string
  ) => {
    const updatedLinks = previewAdminLinks.map((link) =>
      link.id === id ? { ...link, [field]: value } : link
    );
    setPreviewAdminLinks(updatedLinks);
  };

  // Handle social media change
  const handleSocialMediaChange = (
    id: number,
    field: "url" | "enabled",
    value: string | boolean
  ) => {
    const updatedSocial = previewSocialMedia.map((social) =>
      social.id === id ? { ...social, [field]: value } : social
    );
    setPreviewSocialMedia(updatedSocial);
  };

  // Save changes
  const saveChanges = () => {
    setLogo(previewLogo);
    setAddress({ ...previewAddress });
    setPhone(previewPhone);
    setEmail(previewEmail);
    setAboutLinks([...previewAboutLinks]);
    setAdminLinks([...previewAdminLinks]);
    setSocialMedia([...previewSocialMedia]);
    setCopyright(previewCopyright);
    setTermsUrl(previewTermsUrl);
    setPrivacyUrl(previewPrivacyUrl);
    alert("Footer changes saved successfully!");
  };

  // Reset changes
  const resetChanges = () => {
    setPreviewLogo(logo);
    setPreviewAddress({ ...address });
    setPreviewPhone(phone);
    setPreviewEmail(email);
    setPreviewAboutLinks([...aboutLinks]);
    setPreviewAdminLinks([...adminLinks]);
    setPreviewSocialMedia([...socialMedia]);
    setPreviewCopyright(copyright);
    setPreviewTermsUrl(termsUrl);
    setPreviewPrivacyUrl(privacyUrl);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="links">Footer Links</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="legal">Copyright & Legal</TabsTrigger>
        </TabsList>

        {/* Contact Info Tab */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Update your school's logo and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="footer-logo">School Logo</Label>
                  <div className="flex flex-col gap-4">
                    <div className="border rounded-md p-2 w-40 h-40 flex items-center justify-center bg-muted">
                      <Image
                        src={previewLogo || "/placeholder.svg"}
                        alt="School Logo"
                        width={120}
                        height={120}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        id="footer-logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>School Address</Label>
                  <div className="grid gap-2">
                    <Input
                      value={previewAddress.line1}
                      onChange={(e) =>
                        handleAddressChange("line1", e.target.value)
                      }
                      placeholder="Address Line 1"
                    />
                    <Input
                      value={previewAddress.line2}
                      onChange={(e) =>
                        handleAddressChange("line2", e.target.value)
                      }
                      placeholder="Address Line 2"
                    />
                    <Input
                      value={previewAddress.line3}
                      onChange={(e) =>
                        handleAddressChange("line3", e.target.value)
                      }
                      placeholder="City, State, ZIP"
                    />
                    <Input
                      value={previewAddress.line4}
                      onChange={(e) =>
                        handleAddressChange("line4", e.target.value)
                      }
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="phone"
                      value={previewPhone}
                      onChange={(e) => setPreviewPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="email"
                      value={previewEmail}
                      onChange={(e) => setPreviewEmail(e.target.value)}
                      placeholder="Email Address"
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Links Tab */}
        <TabsContent value="links" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Footer Links</CardTitle>
              <CardDescription>
                Update the links displayed in your footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">About Us Links</h3>
                  <div className="space-y-4">
                    {previewAboutLinks.map((link) => (
                      <div key={link.id} className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`about-label-${link.id}`}>
                            Link Label
                          </Label>
                          <Input
                            id={`about-label-${link.id}`}
                            value={link.label}
                            onChange={(e) =>
                              handleAboutLinkChange(
                                link.id,
                                "label",
                                e.target.value
                              )
                            }
                            placeholder="Link Label"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`about-url-${link.id}`}>
                            Link URL
                          </Label>
                          <Input
                            id={`about-url-${link.id}`}
                            value={link.url}
                            onChange={(e) =>
                              handleAboutLinkChange(
                                link.id,
                                "url",
                                e.target.value
                              )
                            }
                            placeholder="Link URL"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Admin Links</h3>
                  <div className="space-y-4">
                    {previewAdminLinks.map((link) => (
                      <div key={link.id} className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`admin-label-${link.id}`}>
                            Link Label
                          </Label>
                          <Input
                            id={`admin-label-${link.id}`}
                            value={link.label}
                            onChange={(e) =>
                              handleAdminLinkChange(
                                link.id,
                                "label",
                                e.target.value
                              )
                            }
                            placeholder="Link Label"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`admin-url-${link.id}`}>
                            Link URL
                          </Label>
                          <Input
                            id={`admin-url-${link.id}`}
                            value={link.url}
                            onChange={(e) =>
                              handleAdminLinkChange(
                                link.id,
                                "url",
                                e.target.value
                              )
                            }
                            placeholder="Link URL"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>
                Update your school's social media links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  Enter the full URL to your social media profiles, including
                  https://
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {previewSocialMedia.map((social) => (
                  <div
                    key={social.id}
                    className="flex items-center gap-4 p-4 border rounded-md"
                  >
                    <div className="flex-1">
                      <Label className="text-base font-medium">
                        {social.platform}
                      </Label>
                      <div className="mt-2">
                        <Input
                          value={social.url}
                          onChange={(e) =>
                            handleSocialMediaChange(
                              social.id,
                              "url",
                              e.target.value
                            )
                          }
                          placeholder={`${social.platform} URL`}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`social-enabled-${social.id}`}>
                        Enable
                      </Label>
                      <Switch
                        id={`social-enabled-${social.id}`}
                        checked={social.enabled as boolean}
                        onCheckedChange={(checked) =>
                          handleSocialMediaChange(social.id, "enabled", checked)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Copyright & Legal Tab */}
        <TabsContent value="legal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Copyright & Legal</CardTitle>
              <CardDescription>
                Update your copyright notice and legal links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="copyright">Copyright Text</Label>
                  <Input
                    id="copyright"
                    value={previewCopyright}
                    onChange={(e) => setPreviewCopyright(e.target.value)}
                    placeholder="Copyright notice"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="terms-url">Terms of Service URL</Label>
                    <Input
                      id="terms-url"
                      value={previewTermsUrl}
                      onChange={(e) => setPreviewTermsUrl(e.target.value)}
                      placeholder="/terms"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="privacy-url">Privacy Policy URL</Label>
                    <Input
                      id="privacy-url"
                      value={previewPrivacyUrl}
                      onChange={(e) => setPreviewPrivacyUrl(e.target.value)}
                      placeholder="/privacy"
                    />
                  </div>
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
          <CardDescription>See how your footer will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden bg-[#f0f7f0]">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="h-16 w-32">
                    <Image
                      src={previewLogo || "/placeholder.svg"}
                      alt="School Logo"
                      width={120}
                      height={60}
                      className="object-contain"
                    />
                  </div>

                  <div className="space-y-1 text-sm">
                    <p>{previewAddress.line1}</p>
                    <p>{previewAddress.line2}</p>
                    <p>{previewAddress.line3}</p>
                    <p>{previewAddress.line4}</p>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{previewPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{previewEmail}</span>
                    </div>
                  </div>
                </div>

                {/* About Us Links */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">About Us</h3>
                  <ul className="space-y-2">
                    {previewAboutLinks.map((link) => (
                      <li key={link.id}>
                        <a href={link.url} className="hover:underline">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Admin Links */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Admin</h3>
                  <ul className="space-y-2">
                    {previewAdminLinks.map((link) => (
                      <li key={link.id}>
                        <a href={link.url} className="hover:underline">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Follow Us</h3>
                  <div className="flex gap-4">
                    {previewSocialMedia
                      .filter((social) => social.enabled)
                      .map((social) => (
                        <a
                          key={social.id}
                          href={social.url}
                          className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          {social.platform === "Facebook" && (
                            <span className="text-lg">f</span>
                          )}
                          {social.platform === "Twitter" && (
                            <span className="text-lg">t</span>
                          )}
                          {social.platform === "YouTube" && (
                            <span className="text-lg">y</span>
                          )}
                          {social.platform === "Instagram" && (
                            <span className="text-lg">i</span>
                          )}
                        </a>
                      ))}
                  </div>
                </div>
              </div>

              {/* Copyright & Legal */}
              <div className="mt-8 pt-4 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  {previewCopyright}
                </div>
                <div className="flex gap-4 text-sm">
                  <a href={previewTermsUrl} className="hover:underline">
                    Terms of Service
                  </a>
                  <a href={previewPrivacyUrl} className="hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetChanges}>
            Reset
          </Button>
          <Button onClick={saveChanges}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
