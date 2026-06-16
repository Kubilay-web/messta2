import { contactInfo } from "../../data";
import { Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TopBar() {
  return (
    <div className="bg-green-50 py-1 px-4">
      <div className="container mx-auto flex justify-between items-center text-xs">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Phone className="h-3 w-3 mr-1" /> {contactInfo.phone}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {contactInfo.loginLinks.map((link, index) => (
            <Link key={index} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
