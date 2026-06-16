"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2, CreditCard, Building2, Banknote, FileCheck } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "../../../../components/ui/dialog";
import { Label } from "../../../../components/ui/label";
import toast from "react-hot-toast";
import {
  createPaymentIntent,
  confirmStripePayment,
  notifyManualPayment,
} from "../../../../actions/stripe-payments";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

type Payment = {
  id: string; title: string; amount: number;
  contract?: { contractNo: string; currency: string } | null;
};
type Method = "card" | "eft" | "cash" | "cheque";

const methods: { value: Method; label: string; icon: any; desc: string }[] = [
  { value: "card",   icon: CreditCard,  label: "Kredi / Banka Kartı", desc: "Anında güvenli ödeme"         },
  { value: "eft",    icon: Building2,   label: "EFT / Havale",         desc: "Banka transferi ile bildir"   },
  { value: "cash",   icon: Banknote,    label: "Nakit",                desc: "Ofise gelerek ödeme"          },
  { value: "cheque", icon: FileCheck,   label: "Çek",                  desc: "Çek ile ödeme bildirimi"      },
];

const CARD_STYLE = {
  style: {
    base: {
      fontSize: "14px",
      color: "#000",
      "::placeholder": { color: "#9ca3af" },
    },
  },
};

// ─── Stripe Kart Formu ────────────────────────────────────────────────────────
function CardForm({
  payment, onSuccess,
}: {
  payment: Payment;
  onSuccess: () => void;
}) {
  const stripe   = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    if (!stripe || !elements) return;
    const cardNum = elements.getElement(CardNumberElement);
    if (!cardNum) return;

    setLoading(true);
    try {
      const { clientSecret, paymentIntentId } = await createPaymentIntent(payment.id);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardNum },
      });

      if (result.error) {
        toast.error(result.error.message ?? "Kart ödemesi başarısız.");
        return;
      }

      await confirmStripePayment(payment.id, paymentIntentId);
      toast.success("Ödeme başarıyla tamamlandı!");
      onSuccess();
    } catch (e: any) {
      toast.error(e?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  const fmt = (v: number, cur = "TRY") =>
    `${v.toLocaleString("tr-TR")} ${cur}`;

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-black">
        <strong>{payment.title}</strong> ·{" "}
        <span className="font-bold text-blue-700">
          {fmt(payment.amount, payment.contract?.currency)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-xs font-medium text-black">Kart Numarası</Label>
          <div className="rounded-md border border-gray-300 px-3 py-2.5 bg-white">
            <CardNumberElement options={CARD_STYLE} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs font-medium text-black">Son Kullanma</Label>
            <div className="rounded-md border border-gray-300 px-3 py-2.5 bg-white">
              <CardExpiryElement options={CARD_STYLE} />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium text-black">CVV</Label>
            <div className="rounded-md border border-gray-300 px-3 py-2.5 bg-white">
              <CardCvcElement options={CARD_STYLE} />
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-black flex items-center gap-1">
        🔒 Ödemeniz 256-bit SSL ile şifrelenmektedir. Kart bilgileriniz saklanmaz.
      </p>

      <Button onClick={handlePay} disabled={loading || !stripe} className="w-full">
        {loading
          ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> İşleniyor…</>
          : `${fmt(payment.amount, payment.contract?.currency)} Öde`
        }
      </Button>
    </div>
  );
}

// ─── Manuel Ödeme Formu ───────────────────────────────────────────────────────
function ManualForm({
  payment, method, onSuccess,
}: {
  payment: Payment;
  method:  "eft" | "cash" | "cheque";
  onSuccess: () => void;
}) {
  const [note,    setNote]    = useState("");
  const [loading, setLoading] = useState(false);

  const info: Record<string, { title: string; detail: string }> = {
    eft: {
      title:  "EFT / Havale Bilgileri",
      detail: "Ödemeyi ajansınızın banka hesabına gönderdikten sonra bildirim yapın. Danışmanınız onaylayacaktır.",
    },
    cash: {
      title:  "Nakit Ödeme",
      detail: "Ofise gelerek ödeme yapacağınızı bildirin. Danışmanınız randevu ayarlayacaktır.",
    },
    cheque: {
      title:  "Çek ile Ödeme",
      detail: "Çek bilgilerinizi danışmanınızla paylaşın. Onay sonrası ödeme kaydedilir.",
    },
  };

  const dbMethod = method === "eft" ? "EFT" : method === "cash" ? "Nakit" : "Çek";

  async function handleNotify() {
    setLoading(true);
    try {
      await notifyManualPayment(payment.id, dbMethod as any, note || undefined);
      toast.success("Ödeme bildirimi gönderildi. Danışmanınız onaylayacaktır.");
      onSuccess();
    } catch (e: any) {
      toast.error(e?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 space-y-1">
        <p className="text-sm font-semibold text-black">{info[method].title}</p>
        <p className="text-xs text-black">{info[method].detail}</p>
      </div>

      <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-black">
        <strong>{payment.title}</strong> ·{" "}
        <span className="font-bold">
          {payment.amount.toLocaleString("tr-TR")} {payment.contract?.currency ?? "TRY"}
        </span>
      </div>

      <div className="space-y-1">
        <Label className="text-xs font-medium text-black">Ek Not (isteğe bağlı)</Label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Dekont numarası, çek tarihi vb."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />
      </div>

      <Button onClick={handleNotify} disabled={loading} className="w-full">
        {loading
          ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Gönderiliyor…</>
          : "Ödemeyi Bildir"
        }
      </Button>
    </div>
  );
}

// ─── Ana Modal ────────────────────────────────────────────────────────────────
export default function PaymentModal({
  payment, open, onClose, onSuccess,
}: {
  payment:   Payment | null;
  open:      boolean;
  onClose:   () => void;
  onSuccess: () => void;
}) {
  const [method, setMethod] = useState<Method>("card");

  if (!payment) return null;

  function handleSuccess() {
    onSuccess();
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="w-[95vw] max-w-md bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-black">Ödeme Yap</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Yöntem Seçimi */}
          <div className="grid grid-cols-2 gap-2">
            {methods.map(({ value, label, icon: Icon, desc }) => (
              <button
                key={value}
                onClick={() => setMethod(value)}
                className={`flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-all ${
                  method === value
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-black hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <p className="text-xs font-semibold leading-tight">{label}</p>
                <p className="text-[10px] opacity-70 leading-tight">{desc}</p>
              </button>
            ))}
          </div>

          {/* İçerik */}
          {method === "card" ? (
            <Elements stripe={stripePromise}>
              <CardForm payment={payment} onSuccess={handleSuccess} />
            </Elements>
          ) : (
            <ManualForm payment={payment} method={method} onSuccess={handleSuccess} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
