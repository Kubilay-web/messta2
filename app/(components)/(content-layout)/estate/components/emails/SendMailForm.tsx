"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../../components/ui/card";
import { sendMultipleEmails, sendSingleEmail } from "../../actions/emails";

export type MultipleMailPayload = {
  email_addresses: string;
  subject: string;
  message: string;
};
export type SingleMailPayload = {
  email_address: string;
  subject: string;
  message: string;
};
import SubmitButton from "../FormInputs/SubmitButton";
import {
  Send,
  Mail,
  Users,
  UserCheck,
  AlertCircle,
  X,
  Type,
} from "lucide-react";
import TextInput from "../FormInputs/TextInput";
import { toast } from "sonner";
// import { ContactGroupWithCount } from "@/types/types";

import { EmailEditor } from "./email-editor";
import { MessageGroups, sendGroupMessages } from "../../actions/communications";
// import useSchoolStore from "../../store/school";

type EmailType = "single" | "multiple" | "group";

interface FormData {
  email_addresses: string;
  subject: string;
  message: string;
  emailType: EmailType;
}

const SendMailForm = ({
  groupsData,
  schoolId,
}: {
  groupsData: MessageGroups;
  schoolId: string;
}) => {
  console.log(groupsData);
  const all = groupsData.parents + groupsData.students + groupsData.teachers;
  const groups = [
    {
      title: "All",
      count: all,
    },
    {
      title: "Parents",
      count: groupsData.parents,
    },
    {
      title: "Teachers",
      count: groupsData.teachers,
    },
    {
      title: "Students",
      count: groupsData.students,
    },
  ];
  const [emailType, setEmailType] = useState<EmailType>("group");
  const [html, setHtml] = useState("");
  console.log(html);
  const {
    register,
    setError,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const messageBody = watch("message", "");
  const subjectField = watch("subject", "");
  const emailAddressesField = watch("email_addresses", "");
  const [loading, setLoading] = useState(false);
  const [emailsWithErr, setEmailsWithError] = useState<string[]>([]);
  const [emailAddressesArray, setEmailAddressesArray] = useState<string[]>([]);

  // Parse email addresses into pills whenever the text area changes
  useEffect(() => {
    if (emailType === "multiple" && emailAddressesField) {
      const newEmails = emailAddressesField
        .split(/[\s,;]+/) // Split by spaces, commas, or semicolons
        .filter((email) => email.trim() !== "")
        .map((email) => email.trim());

      // Update the email addresses array
      setEmailAddressesArray(Array.from(new Set(newEmails))); // Remove duplicates

      // Validate email addresses and update errors
      const invalidEmails = newEmails.filter((email) => !isValidEmail(email));
      setEmailsWithError(invalidEmails);
    }
  }, [emailAddressesField, emailType]);

  // Validate an email address
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle removal of an email address pill
  const removeEmailAddress = (emailToRemove: string) => {
    const updatedEmails = emailAddressesArray.filter(
      (email) => email !== emailToRemove,
    );
    setEmailAddressesArray(updatedEmails);

    // Update the form field with the new space-separated string
    setValue("email_addresses", updatedEmails.join(" "));

    // Update error list
    setEmailsWithError((prev) =>
      prev.filter((email) => email !== emailToRemove),
    );
  };

  // Add a new email address from input
  const addEmailAddress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " " || e.key === "," || e.key === ";") {
      e.preventDefault();
      const inputElement = e.target as HTMLInputElement;
      const newEmail = inputElement.value.trim();

      if (newEmail) {
        if (!emailAddressesArray.includes(newEmail)) {
          const updatedEmails = [...emailAddressesArray, newEmail];
          setEmailAddressesArray(updatedEmails);
          setValue("email_addresses", updatedEmails.join(" "));

          // Validate and update errors
          if (!isValidEmail(newEmail) && !emailsWithErr.includes(newEmail)) {
            setEmailsWithError((prev) => [...prev, newEmail]);
          }
        }

        // Clear the input
        inputElement.value = "";
      }
    }
  };
  // const { school } = useSchoolStore();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    data.message = html;
    // Check for invalid email addresses before submission
    if (emailType === "multiple" && emailsWithErr.length > 0) {
      toast.error("Invalid Email Addresses", {
        description:
          "Please correct the highlighted email addresses before sending",
      });
      return;
    }

    if (emailType === "single") {
      const payload: SingleMailPayload = {
        email_address: data.email_addresses,
        subject: data.subject,
        message: data.message,
      };
      try {
        setLoading(true);
        const res = await sendSingleEmail(payload);
        if (!res.success) {
          toast.error("Failed to Send", {
            description: res.message,
          });
          setLoading(false);
          return;
        }
        setLoading(false);
        toast.success("Email sent Successfully", {
          description: "Your email has been successfully sent",
        });
        reset();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        toast.error("Failed to Send", {
          description: "Something went wrong, please try again",
        });
        setLoading(false);
        console.log(error);
      }
    }
    if (emailType === "multiple") {
      // Email addresses are already formatted as a space-separated string in the form data
      console.log(data.email_addresses);

      const payload: MultipleMailPayload = {
        email_addresses: data.email_addresses,
        subject: data.subject,
        message: data.message,
      };
      try {
        setLoading(true);
        const res = await sendMultipleEmails(payload);
        if (!res.success) {
          toast.error("Failed to Send", {
            description: res.message,
          });
          setLoading(false);
          return;
        }
        setLoading(false);
        toast.success("Emails sent Successfully", {
          description: "Your emails have been successfully sent",
        });
        reset();
        setEmailAddressesArray([]);
        setEmailsWithError([]);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    if (emailType === "group") {
      const payload = {
        key: data.email_addresses,
        subject: data.subject,
        message: data.message,
        // schoolId: school?.id ?? "",

        schoolId: schoolId ?? "",
      };
      await sendGroupMessages(payload);
      setLoading(false);
      toast.success("Message sent successfully");
      console.log(payload);
    }
  };

  const handleEmailTypeChange = (type: EmailType) => {
    setEmailType(type);
    if (type === "single") {
      setValue("email_addresses", "");
    } else {
      setValue("email_addresses", "");
      setEmailAddressesArray([]);
      setEmailsWithError([]);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto overflow-hidden bg-white rounded-xl shadow-lg border-0">
      <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      <CardContent className="p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Compose Message
          </h1>
          <p className="text-gray-500">
            Create and send emails to individuals or groups
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-indigo-50 p-1.5 rounded-md mr-2">
                <Mail className="h-5 w-5 text-indigo-600" />
              </span>
              Recipient Type
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleEmailTypeChange("single")}
                className={`relative p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  emailType === "single"
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                    : "border-gray-200 bg-white hover:border-indigo-200"
                }`}
              >
                <div className="flex flex-col items-start h-full">
                  <div className="mb-2 text-indigo-600">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <p className="font-bold text-gray-900 text-left">
                    Single Recipient
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Send to one recipient
                  </p>
                </div>
                {emailType === "single" && (
                  <div className="absolute top-3 right-3 text-indigo-600 bg-indigo-100 rounded-full p-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleEmailTypeChange("multiple")}
                className={`relative p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  emailType === "multiple"
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                    : "border-gray-200 bg-white hover:border-indigo-200"
                }`}
              >
                <div className="flex flex-col items-start h-full">
                  <div className="mb-2 text-indigo-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <p className="font-bold text-gray-900 text-left">
                    Multiple Recipients
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Send to several addresses
                  </p>
                </div>
                {emailType === "multiple" && (
                  <div className="absolute top-3 right-3 text-indigo-600 bg-indigo-100 rounded-full p-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleEmailTypeChange("group")}
                className={`relative p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  emailType === "group"
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                    : "border-gray-200 bg-white hover:border-indigo-200"
                }`}
              >
                <div className="flex flex-col items-start h-full">
                  <div className="mb-2 text-indigo-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <p className="font-bold text-gray-900 text-left">
                    Group Recipients
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Send to saved groups
                  </p>
                </div>
                {emailType === "group" && (
                  <div className="absolute top-3 right-3 text-indigo-600 bg-indigo-100 rounded-full p-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block font-bold text-gray-800">
              {emailType === "single"
                ? "Recipient"
                : emailType === "multiple"
                  ? "Recipients"
                  : "Contact Group"}
            </label>

            {emailType === "single" && (
              <div className="relative">
                <TextInput
                  register={register}
                  errors={errors}
                  label=""
                  name="email_addresses"
                  type="email"
                  placeholder="example@domain.com"
                />
              </div>
            )}

            {emailType === "multiple" && (
              <div className="space-y-4">
                {/* Hidden input to store the actual value for the form submission */}
                <input
                  type="hidden"
                  {...register("email_addresses")}
                  value={emailAddressesArray.join(" ")}
                />

                {/* Pills container */}
                {emailAddressesArray.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg min-h-[60px]">
                    {emailAddressesArray.map((email, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                          emailsWithErr.includes(email)
                            ? "bg-red-100 text-red-800 border border-red-300"
                            : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        {email}
                        <button
                          type="button"
                          onClick={() => removeEmailAddress(email)}
                          className={`p-0.5 rounded-full ${
                            emailsWithErr.includes(email)
                              ? "hover:bg-red-200 text-red-700"
                              : "hover:bg-indigo-200 text-indigo-700"
                          }`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Input for adding new email addresses */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type or paste email addresses, press space, enter, comma, or semicolon to add"
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 focus:bg-white rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                    onKeyDown={addEmailAddress}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pastedText = e.clipboardData.getData("text");
                      const pastedEmails = pastedText
                        .split(/[\s,;]+/)
                        .filter((email) => email.trim() !== "");

                      // Add unique pasted email addresses
                      const uniqueNewEmails = pastedEmails.filter(
                        (email) => !emailAddressesArray.includes(email.trim()),
                      );
                      const updatedEmails = [
                        ...emailAddressesArray,
                        ...uniqueNewEmails.map((e) => e.trim()),
                      ];

                      setEmailAddressesArray(updatedEmails);
                      setValue("email_addresses", updatedEmails.join(" "));

                      // Update errors
                      const newErrors = uniqueNewEmails.filter(
                        (email) => !isValidEmail(email.trim()),
                      );
                      if (newErrors.length > 0) {
                        setEmailsWithError((prev) => [
                          ...prev,
                          ...newErrors.map((e) => e.trim()),
                        ]);
                      }
                    }}
                  />
                  <div className="absolute top-3 right-0 flex items-start pr-3 pointer-events-none text-gray-400">
                    <Users className="h-5 w-5" />
                  </div>
                </div>

                {/* Error message display */}
                {emailsWithErr.length > 0 && (
                  <div className="flex items-start text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        Invalid email addresses detected:
                      </p>
                      <p className="mt-1">
                        The following email addresses are invalid:
                      </p>
                      <ul className="mt-1 list-disc list-inside">
                        {emailsWithErr.map((email, index) => (
                          <li key={index}>{email}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex items-start text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p>
                    Add email addresses by typing or pasting. Press Space,
                    Enter, comma, or semicolon after each address.
                    <br />
                    Email addresses must be in a valid format (e.g.,
                    example@domain.com).
                    <br />
                    Duplicate email addresses will automatically be removed.
                  </p>
                </div>
              </div>
            )}

            {emailType === "group" && (
              <div className="space-y-4">
                <div className="relative">
                  <select
                    {...register("email_addresses")}
                    className="w-full py-3 pl-4 pr-10 bg-gray-50 border-gray-200 focus:bg-white rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 appearance-none"
                  >
                    <option value="">Select a contact group</option>
                    {groups.map((group, i) => {
                      return (
                        <option key={i} value={group.title}>
                          {group.title} ({group.count} contacts)
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Email Subject Field */}
          <div className="space-y-3">
            <label className="block font-bold text-gray-800">Subject</label>
            <div className="relative">
              <input
                {...register("subject")}
                type="text"
                className="w-full py-3 px-4 bg-gray-50 border border-gray-200 focus:bg-white rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                placeholder="Enter email subject..."
              />
              <div className="absolute top-3 right-0 flex items-start pr-3 pointer-events-none text-gray-400">
                <Type className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="block font-bold text-gray-800">
                Email Content
              </label>
            </div>
            <div className="relative">
              <EmailEditor onHtmlChange={setHtml} />
              {/* <Textarea
                {...register("message")}
                className="w-full min-h-[180px] p-4 bg-gray-50 border-gray-200 focus:bg-white rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                placeholder="Compose your email here..."
              /> */}
            </div>
          </div>

          <div className="pt-4">
            <SubmitButton
              loading={loading}
              loadingTitle="Sending please wait..."
              buttonIcon={Send}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
              title="Send Email"
            />
            <p className="mt-2 text-center text-xs text-gray-500">
              By sending this email, you agree to our{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SendMailForm;

{
  /* <EmailEditor onHtmlChange={setHtml} /> */
}
