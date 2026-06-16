"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { toggleClientInterest } from "../../actions/client-interests";

type Props = {
  clientId:        string;
  listingId:       string;
  initialInterest: boolean;
};

export default function InterestToggleButton({ clientId, listingId, initialInterest }: Props) {
  const [interested, setInterested] = useState(initialInterest);
  const [pending, startTransition]  = useTransition();

  function handleToggle() {
    startTransition(async () => {
      try {
        const { interested: next } = await toggleClientInterest(clientId, listingId);
        setInterested(next);
        toast.success(next ? "Favorilere eklendi." : "Favorilerden çıkarıldı.");
      } catch {
        toast.error("İşlem başarısız.");
      }
    });
  }

  return (
    <Button
      type="button"
      variant={interested ? "default" : "outline"}
      size="sm"
      disabled={pending}
      onClick={handleToggle}
    >
      {pending ? (
        <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
      ) : (
        <Heart className={`mr-1.5 h-4 w-4 ${interested ? "fill-current" : ""}`} />
      )}
      {interested ? "Favorilerimde" : "İlgileniyorum"}
    </Button>
  );
}
