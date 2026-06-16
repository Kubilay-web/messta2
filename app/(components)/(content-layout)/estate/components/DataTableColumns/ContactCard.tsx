"use client";

import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Mail,
  Phone,
  Building2,
  MapPin,
  Users,
  Briefcase,
  Globe,
  Calendar,
  MessageSquare,
  Hash,
} from "lucide-react";

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  school: string;      // agencyName
  country: string;     // city
  schoolPage: string;  // agencyWebsite
  students: number;    // agentCount
  role: string;
  media: string;
  message?: string;
  createdAt: string;
}

interface ContactInfoModalProps {
  contact: Contact;
  trigger?: React.ReactNode;
}

const roleLabels: Record<string, string> = {
  owner: "Ofis Sahibi / GM",
  manager: "Yönetici",
  agent: "Danışman",
  it: "BT Sorumlusu",
  consultant: "Danışman / İş Ortağı",
  other: "Diğer",
};

const mediaLabels: Record<string, string> = {
  google: "Google",
  social_media: "Sosyal Medya",
  referral: "Referans",
  blog: "Blog",
  event: "Fuar / Etkinlik",
  other: "Diğer",
};

export default function ContactInfoModal({
  contact,
  trigger,
}: ContactInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const infoCards = [
    { icon: Mail,     label: "E-posta",         value: contact.email },
    { icon: Phone,    label: "Telefon",          value: contact.phone },
    { icon: Building2,label: "Ofis / Firma",     value: contact.school },
    { icon: MapPin,   label: "Şehir",            value: contact.country },
    { icon: Globe,    label: "Web Sitesi",        value: contact.schoolPage, isLink: true },
    { icon: Users,    label: "Danışman Sayısı",   value: contact.students?.toString() ?? "—" },
    { icon: Briefcase,label: "Unvan",             value: roleLabels[contact.role] ?? contact.role },
    { icon: Hash,     label: "Nereden Duydu",     value: mediaLabels[contact.media] ?? contact.media },
    {
      icon: Calendar,
      label: "Başvuru Tarihi",
      value: new Date(contact.createdAt).toLocaleDateString("tr-TR"),
    },
  ];

  const initials = contact.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Görüntüle
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-white text-black sm:max-w-[480px] md:max-w-[720px] lg:max-w-[920px] max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${contact.fullName}`}
                alt={contact.fullName}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-black truncate">
                {contact.fullName}
              </h2>
              <div className="flex flex-wrap gap-1.5 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {contact.school}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {mediaLabels[contact.media] ?? contact.media} üzerinden
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Bilgi Kartları */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
          {infoCards.map((card, i) => (
            <Card
              key={i}
              className="overflow-hidden bg-white border border-gray-200 shadow-sm"
            >
              <CardContent className="p-3 flex flex-col items-center text-center">
                <card.icon className="w-5 h-5 mb-1.5 text-blue-600" />
                <h3 className="font-semibold text-[10px] uppercase tracking-wide text-gray-400 mb-1">
                  {card.label}
                </h3>
                <p className="text-xs sm:text-sm break-words w-full text-gray-800">
                  {card.isLink ? (
                    <a
                      href={card.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline break-all"
                    >
                      {card.value}
                    </a>
                  ) : (
                    card.value || "—"
                  )}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mesaj */}
        {contact.message && (
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                İletilen Mesaj
              </span>
            </div>
            <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
              {contact.message}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
