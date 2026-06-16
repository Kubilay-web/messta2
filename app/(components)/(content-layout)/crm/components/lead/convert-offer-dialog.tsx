"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui";
import { convertLeadToOffer, type ConvertOfferInput } from "../../actions/leads";

const OFFER_TYPES: { value: "SALE" | "RENT" | "SHORT_RENT"; label: string }[] = [
  { value: "SALE", label: "Satış" },
  { value: "RENT", label: "Kira" },
  { value: "SHORT_RENT", label: "Kısa Dönem Kira" },
];

const CURRENCIES = ["TRY", "USD", "EUR", "GBP"];

export function ConvertOfferDialog({
  open,
  onOpenChange,
  lead,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  lead: any;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const buildInitial = () => {
    const defaultType: "SALE" | "RENT" | "SHORT_RENT" =
      lead.listingType === "RENT"
        ? "RENT"
        : lead.listingType === "SHORT_RENT"
        ? "SHORT_RENT"
        : "SALE";
    const defaultAmount =
      lead.value ?? lead.budgetMax ?? lead.listing?.askingPrice ?? "";
    return {
      amount: defaultAmount === null ? "" : String(defaultAmount ?? ""),
      currency: lead.currency || lead.listing?.currency || "TRY",
      offerType: defaultType,
      depositOffer: "",
      message: "",
      validUntil: "",
    };
  };

  const [form, setForm] = useState(buildInitial);

  useEffect(() => {
    if (open) setForm(buildInitial());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = (k: keyof ReturnType<typeof buildInitial>, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    const amount = Number(form.amount);
    if (!form.amount.trim() || !Number.isFinite(amount) || amount <= 0)
      return toast.error("Geçerli bir teklif tutarı giriniz.");

    setSaving(true);
    try {
      const payload: ConvertOfferInput = {
        amount,
        currency: form.currency,
        offerType: form.offerType,
        depositOffer: form.depositOffer.trim() ? Number(form.depositOffer) : null,
        message: form.message.trim() || null,
        validUntil: form.validUntil || null,
      };
      const offer = await convertLeadToOffer(lead.id, payload);
      toast.success(`Teklif oluşturuldu: ${(offer as any)?.offerNo ?? ""}`);
      onOpenChange(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Dönüştürülemedi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Teklife Çevir</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {lead.listing && (
            <p className="text-xs text-muted-foreground rounded-md bg-muted/50 px-3 py-2">
              İlan: <b>{lead.listing.title}</b> ({lead.listing.listingNo}) ·
              İstenen fiyat:{" "}
              <b>
                {lead.listing.askingPrice != null
                  ? `${Number(lead.listing.askingPrice).toLocaleString("tr-TR")} ${lead.listing.currency ?? ""}`
                  : "—"}
              </b>
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <F label="Teklif Tutarı *" className="sm:col-span-2">
              <Input
                type="number"
                inputMode="decimal"
                value={form.amount}
                onChange={(e) => set("amount", e.target.value)}
                placeholder="Müşterinin teklif ettiği tutar"
              />
            </F>
            <F label="Para Birimi">
              <Select value={form.currency} onValueChange={(v) => set("currency", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </F>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <F label="Teklif Türü">
              <Select
                value={form.offerType}
                onValueChange={(v) => set("offerType", v as any)}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {OFFER_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </F>
            <F label="Kapora / Depozito">
              <Input
                type="number"
                inputMode="decimal"
                value={form.depositOffer}
                onChange={(e) => set("depositOffer", e.target.value)}
                placeholder="Opsiyonel"
              />
            </F>
          </div>

          <F label="Geçerlilik Tarihi">
            <Input
              type="date"
              value={form.validUntil}
              onChange={(e) => set("validUntil", e.target.value)}
            />
          </F>

          <F label="Teklif Notu">
            <Textarea
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              rows={2}
              placeholder="Opsiyonel — müşterinin koşulları, şartları vb."
            />
          </F>

          <p className="text-xs text-muted-foreground rounded-md bg-muted/50 px-3 py-2">
            Bu işlem ERP'de <b>PENDING</b> durumunda bir teklif (PropertyOffer) oluşturur
            ve müşterinin portalında <b>Tekliflerim</b> altında görünür. Ofis bu teklifi
            kabul / karşı teklif / red ile yönetir.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            İptal
          </Button>
          <Button onClick={submit} disabled={saving}>
            {saving ? "Oluşturuluyor..." : "Teklif Oluştur"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function F({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
