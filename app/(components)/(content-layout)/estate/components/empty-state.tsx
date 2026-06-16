"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  className,
  iconClassName,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[80vh] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
    >
      <div
        className={cn(
          "flex h-20 w-20 items-center justify-center rounded-full bg-muted",
          iconClassName
        )}
      >
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
