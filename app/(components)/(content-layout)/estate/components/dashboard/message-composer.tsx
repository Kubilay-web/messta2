"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Textarea } from "../../components/ui/textarea";
import { Loader2, Mail, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { Parent } from "../../types/types";
import FormSelectInput from "../FormInputs/FormSelectInput";
import VEditor from "../FormInputs/VEditor";
import {
  sendBulkEmail,
  sendSingleEmailReminder,
  sendSinglePhoneReminder,
} from "../../actions/communications";

type Recipient = "all" | "specific";
type MessageType = "email" | "sms";

export default function MessageComposer({ parents }: { parents: Parent[] }) {
  const parentOptions = parents.map((parent) => {
    return {
      label: `${parent.firstName} ${parent.lastName}`,
      value: parent.id,
    };
  });
  const [selectedParent, setSelectedParent] = useState<any>(null);
  console.log(parents);
  const [recipient, setRecipient] = useState<Recipient>("all");
  const [messageType, setMessageType] = useState<MessageType>("email");
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("<p>Write your message here</p>");
  const [specificParent, setSpecificParent] = useState("");

  const handleSend = async () => {
    try {
      setLoading(true);
      if (recipient === "specific") {
        // Specific Parent
        const parent = parents.find(
          (parent) => parent.id === selectedParent.value
        );
        if (messageType === "email") {
          // Via email
          const data = {
            parentName: `${parent?.title} ${parent?.firstName} ${parent?.lastName}`,
            email: parent?.email ?? "",
            message: content,
            subject: subject,
          };
          await sendSingleEmailReminder(data);
          console.log(data);
        } else {
          // Via SMS
          const data = {
            parentName: `${parent?.title} ${parent?.firstName} ${parent?.lastName}`,
            phone: "+256762063160",
            message: message,
          };
          await sendSinglePhoneReminder(data);
          console.log(data);
        }
      } else {
        // All Parents
        const parentData = parents.map((parent) => {
          return {
            name: `${parent?.title} ${parent?.firstName} ${parent?.lastName}`,
            email: parent?.email ?? "",
            phone: parent?.phone ?? "",
          };
        });
        if (messageType === "email") {
          // Via email
          const data = {
            parents: parentData,
            message: content,
            subject: subject,
          };
          await sendBulkEmail(data);
          console.log(data);
        } else {
          // Via SMS
          const data = {
            parents: parentData,
            message: message,
          };
          console.log(data);
        }
      }
      toast.success("Message Sent Successfully");
      // Reset form
      setSubject("");
      setMessage("");
      setSpecificParent("");
      setContent("<p>Write your message here</p>");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Compose Message to Parents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Recipient</Label>
          <RadioGroup
            defaultValue="all"
            onValueChange={(value) => setRecipient(value as Recipient)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Parents</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="specific" id="specific" />
              <Label htmlFor="specific">Specific Parent</Label>
            </div>
          </RadioGroup>
        </div>

        {recipient === "specific" && (
          <div className="space-y-2">
            <FormSelectInput
              label="Parent"
              options={parentOptions}
              option={selectedParent}
              setOption={setSelectedParent}
              toolTipText="Add New Parent"
              href="/dashboard/users/parents/new"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Message Type</Label>
          <RadioGroup
            defaultValue="email"
            onValueChange={(value) => setMessageType(value as MessageType)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sms" id="sms" />
              <Label htmlFor="sms">SMS</Label>
            </div>
          </RadioGroup>
        </div>

        {messageType === "email" && (
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        )}
        {messageType === "email" ? (
          <div className="space-y-2">
            <VEditor
              variant="compact"
              content={content}
              setContent={setContent}
              isEditable={true}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        {loading ? (
          <Button className="w-full" disabled>
            <Loader2 className="animate-spin" />
            Sending Please wait...
          </Button>
        ) : (
          <Button
            onClick={handleSend}
            className="w-full"
            disabled={
              (messageType === "sms" && !message) ||
              (messageType === "email" && !content) ||
              (recipient === "specific" && !selectedParent)
            }
          >
            {messageType === "email" ? (
              <Mail className="mr-2 h-4 w-4" />
            ) : (
              <MessageSquare className="mr-2 h-4 w-4" />
            )}
            Send {messageType === "email" ? "Email" : "SMS"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
