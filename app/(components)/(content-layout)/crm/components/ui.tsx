"use client";

// CRM modülü — sade, kendi içinde Tailwind bileşenleri.
// Estate/Radix bağımlılığı YOK. Hepsi düz HTML + Tailwind, mobil+desktop responsive.

import * as React from "react";

function join(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* ----------------------------- Button ----------------------------- */

type ButtonVariant = "default" | "outline" | "ghost" | "destructive" | "secondary";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const btnBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

const btnVariants: Record<ButtonVariant, string> = {
  default: "bg-indigo-600 text-white hover:bg-indigo-700",
  outline: "border border-slate-200 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800",
  ghost: "hover:bg-slate-100 dark:hover:bg-slate-800",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  secondary: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700",
};

const btnSizes: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-6",
  icon: "h-10 w-10",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

export function Button({
  variant = "default",
  size = "default",
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const cls = join(btnBase, btnVariants[variant], btnSizes[size], className);
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      className: join(cls, child.props.className),
      ...props,
    });
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

/* ------------------------------ Card ------------------------------ */

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={join(
        "rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={join("flex flex-col space-y-1.5 p-4 sm:p-5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={join("font-semibold leading-none tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={join("text-sm text-slate-500 dark:text-slate-400", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={join("p-4 sm:p-5 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={join("flex items-center p-4 sm:p-5 pt-0", className)} {...props} />;
}

/* --------------------------- Form inputs --------------------------- */

const fieldCls =
  "flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={join(fieldCls, className)} {...props} />
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={join(fieldCls, "h-auto min-h-[72px] py-2", className)} {...props} />
  )
);
Textarea.displayName = "Textarea";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={join("text-sm font-medium text-slate-700 dark:text-slate-300", className)} {...props} />;
}

/* ------------------------------ Badge ------------------------------ */

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";
const badgeVariants: Record<BadgeVariant, string> = {
  default: "border-transparent bg-indigo-600 text-white",
  secondary: "border-transparent bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  destructive: "border-transparent bg-red-600 text-white",
  outline: "border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={join(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

/* ----------------------------- Checkbox ----------------------------- */

export function Checkbox({
  checked,
  onCheckedChange,
  className,
}: {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={join(
        "size-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/40 dark:border-slate-600 dark:bg-slate-800",
        className
      )}
    />
  );
}

/* ------------------------------ Avatar ------------------------------ */

export function Avatar({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={join(
        "relative flex shrink-0 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",
        className ?? "size-10"
      )}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt ?? ""} className="absolute inset-0 h-full w-full object-cover" />;
}

export function AvatarFallback({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <span
      className={join(
        "flex h-full w-full items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-300",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------ Tabs ------------------------------ */

const TabsCtx = React.createContext<{ value: string; setValue: (v: string) => void } | null>(null);

export function Tabs({
  defaultValue,
  value: controlled,
  onValueChange,
  className,
  children,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const value = controlled ?? internal;
  const setValue = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
  };
  return (
    <TabsCtx.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsCtx.Provider>
  );
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={join(
        "inline-flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800",
        className
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(TabsCtx)!;
  const active = ctx.value === value;
  return (
    <button
      onClick={() => ctx.setValue(value)}
      className={join(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white"
          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(TabsCtx)!;
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}

/* ------------------------------ Dialog ------------------------------ */

const DialogCtx = React.createContext<{ onOpenChange: (o: boolean) => void } | null>(null);

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  if (!open) return null;
  return <DialogCtx.Provider value={{ onOpenChange }}>{children}</DialogCtx.Provider>;
}

export function DialogContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(DialogCtx);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => ctx?.onOpenChange(false)} />
      <div
        className={join(
          "relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => ctx?.onOpenChange(false)}
          className="absolute right-3 top-3 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
          aria-label="Kapat"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={join("mb-3 flex flex-col space-y-1.5 pr-6", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={join("text-lg font-semibold", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={join("text-sm text-slate-500 dark:text-slate-400", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={join("mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
  );
}

/* ------------------------------ Select ------------------------------ */
// Radix uyumlu API (Select/SelectTrigger/SelectValue/SelectContent/SelectItem)
// ama tamamen sade React + Tailwind.

type SelectCtxType = {
  value: string;
  onValueChange: (v: string) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  register: (value: string, label: React.ReactNode) => void;
  labels: Record<string, React.ReactNode>;
};
const SelectCtx = React.createContext<SelectCtxType | null>(null);

export function Select({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [labels, setLabels] = React.useState<Record<string, React.ReactNode>>({});
  const ref = React.useRef<HTMLDivElement>(null);

  const register = React.useCallback((v: string, label: React.ReactNode) => {
    setLabels((prev) => (prev[v] === label ? prev : { ...prev, [v]: label }));
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <SelectCtx.Provider value={{ value, onValueChange, open, setOpen, register, labels }}>
      <div className="relative" ref={ref}>
        {children}
      </div>
    </SelectCtx.Provider>
  );
}

export function SelectTrigger({ className, children }: { className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(SelectCtx)!;
  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(!ctx.open)}
      className={join(
        fieldCls,
        "items-center justify-between gap-2 text-left [&>span]:truncate",
        className
      )}
    >
      {children}
      <svg className="size-4 shrink-0 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const ctx = React.useContext(SelectCtx)!;
  const label = ctx.value ? ctx.labels[ctx.value] : undefined;
  return <span className={label ? "" : "text-slate-400"}>{label ?? placeholder ?? "Seçiniz"}</span>;
}

export function SelectContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(SelectCtx)!;
  if (!ctx.open) return null;
  return (
    <div
      className={join(
        "absolute z-50 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = React.useContext(SelectCtx)!;
  React.useEffect(() => {
    ctx.register(value, children);
  }, [value, children, ctx]);
  const selected = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => {
        ctx.onValueChange(value);
        ctx.setOpen(false);
      }}
      className={join(
        "flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-sm",
        selected ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300" : "hover:bg-slate-100 dark:hover:bg-slate-800"
      )}
    >
      <span className="truncate">{children}</span>
      {selected && (
        <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )}
    </button>
  );
}
