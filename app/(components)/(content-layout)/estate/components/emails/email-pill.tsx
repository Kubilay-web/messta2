"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email();

interface EmailPill {
  email: string;
  isValid: boolean;
}

interface EmailPillsProps {
  value: string;
  onChange: (value: string) => void;
}

export function EmailPills({ value, onChange }: EmailPillsProps) {
  const [pills, setPills] = useState<EmailPill[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Update pills when value changes externally
    const emails = value
      .split(/[,;\n]/)
      .map((email) => email.trim())
      .filter(Boolean);
    setPills(
      emails.map((email) => ({
        email,
        isValid: emailSchema.safeParse(email).success,
      }))
    );
  }, [value]);

  const addPill = (email: string) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    const isValid = emailSchema.safeParse(trimmedEmail).success;
    const newPills = [...pills, { email: trimmedEmail, isValid }];
    setPills(newPills);
    setInput("");
    onChange(newPills.map((pill) => pill.email).join("\n"));
  };

  const removePill = (index: number) => {
    const newPills = pills.filter((_, i) => i !== index);
    setPills(newPills);
    onChange(newPills.map((pill) => pill.email).join("\n"));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "," || e.key === ";") {
      e.preventDefault();
      addPill(input);
    } else if (e.key === "Backspace" && !input && pills.length > 0) {
      removePill(pills.length - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const emails = pastedText
      .split(/[,;\n]/)
      .map((email) => email.trim())
      .filter(Boolean);

    const newPills = [
      ...pills,
      ...emails.map((email) => ({
        email,
        isValid: emailSchema.safeParse(email).success,
      })),
    ];

    setPills(newPills);
    onChange(newPills.map((pill) => pill.email).join("\n"));
  };

  return (
    <div className="min-h-[100px] p-2 border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <div className="flex flex-wrap gap-2">
        {pills.map((pill, index) => (
          <div
            key={index}
            className={`
              flex items-center gap-1 px-2 py-1 rounded-full text-sm
              ${pill.isValid ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}
            `}
          >
            <span>{pill.email}</span>
            <button
              type="button"
              onClick={() => removePill(index)}
              className="hover:bg-primary/20 rounded-full p-1"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {pill.email}</span>
            </button>
          </div>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => input && addPill(input)}
          className="flex-1 min-w-[200px] bg-transparent focus:outline-none"
          placeholder={pills.length === 0 ? "Enter email addresses" : ""}
        />
      </div>
    </div>
  );
}
