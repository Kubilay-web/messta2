"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, Ban, Check, Tag, XCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Button,
  Badge,
  Separator,
} from "../components/ui";
import {
  unitStatusLabel,
  unitStatusSoft,
  propertyTypeLabel,
  saleStatusLabel,
  formatCurrency,
  formatArea,
} from "../lib/labels";
import { updateUnitStatus, deleteUnit } from "../actions/units";
import { cancelSale } from "../actions/sales";

export function UnitManageSheet({
  open,
  onOpenChange,
  unit,
  canManage,
  canSell,
  onEdit,
  onSell,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  unit: any | null;
  canManage: boolean;
  canSell: boolean;
  onEdit: () => void;
  onSell: () => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  if (!unit) return null;

  const activeSale = unit.sale; // serialized latest active sale or null

  const setStatus = async (status: string) => {
    setBusy(true);
    try {
      await updateUnitStatus(unit.id, status as any);
      toast.success("Durum güncellendi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`${unit.unitNo} silinsin mi?`)) return;
    setBusy(true);
    try {
      await deleteUnit(unit.id);
      toast.success("Daire silindi.");
      onOpenChange(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setBusy(false);
    }
  };

  const doCancelSale = async () => {
    if (!activeSale) return;
    if (!window.confirm("Satış/rezervasyon iptal edilsin mi? Daire tekrar müsait olacak.")) return;
    setBusy(true);
    try {
      await cancelSale(activeSale.id);
      toast.success("İptal edildi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setBusy(false);
    }
  };

  const rows: [string, React.ReactNode][] = [
    ["Tür", propertyTypeLabel[unit.type] ?? unit.type],
    ["Blok", unit.block?.name ?? "—"],
    ["Kat", unit.floor ?? "—"],
    ["Oda", unit.roomCount ?? "—"],
    ["Brüt", formatArea(unit.grossArea)],
    ["Net", formatArea(unit.netArea)],
    ["Balkon", formatArea(unit.balconyArea)],
    ["Cephe", unit.facing ?? "—"],
    ["Liste Fiyatı", formatCurrency(unit.listPrice, unit.currency)],
  ];

  const canSellNow = unit.status === "AVAILABLE" || unit.status === "BLOCKED";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {unit.unitNo}
            <span className={`text-xs px-2 py-0.5 rounded-full ${unitStatusSoft[unit.status]}`}>
              {unitStatusLabel[unit.status]}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-1.5 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
          {unit.description && (
            <p className="text-sm text-muted-foreground pt-2">{unit.description}</p>
          )}
        </div>

        {activeSale && (
          <>
            <Separator className="my-4" />
            <div className="rounded-lg border p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Aktif İşlem</span>
                <Badge variant="secondary">{saleStatusLabel[activeSale.status]}</Badge>
              </div>
              <Row label="Fiyat" value={formatCurrency(activeSale.salePrice, activeSale.currency)} />
              {activeSale.clientName && <Row label="Müşteri" value={activeSale.clientName} />}
              {activeSale.agentName && <Row label="Danışman" value={activeSale.agentName} />}
              {activeSale.downPayment != null && (
                <Row label="Peşinat" value={formatCurrency(activeSale.downPayment, activeSale.currency)} />
              )}
              {canSell && (
                <Button variant="outline" size="sm" className="w-full mt-2" onClick={doCancelSale} disabled={busy}>
                  <XCircle className="size-4" /> İşlemi İptal Et
                </Button>
              )}
            </div>
          </>
        )}

        <Separator className="my-4" />

        <div className="space-y-2">
          {canSell && canSellNow && (
            <Button className="w-full" onClick={onSell} disabled={busy}>
              <Tag className="size-4" /> Sat / Rezerve Et
            </Button>
          )}

          <div className="grid grid-cols-2 gap-2">
            {canManage && unit.status !== "AVAILABLE" && !activeSale && (
              <Button variant="outline" size="sm" onClick={() => setStatus("AVAILABLE")} disabled={busy}>
                <Check className="size-4" /> Müsait Yap
              </Button>
            )}
            {canManage && unit.status !== "BLOCKED" && !activeSale && (
              <Button variant="outline" size="sm" onClick={() => setStatus("BLOCKED")} disabled={busy}>
                <Ban className="size-4" /> Bloke Et
              </Button>
            )}
          </div>

          {canManage && (
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={onEdit} disabled={busy}>
                <Pencil className="size-4" /> Düzenle
              </Button>
              <Button variant="outline" size="sm" onClick={remove} disabled={busy || !!activeSale}>
                <Trash2 className="size-4 text-red-500" /> Sil
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-medium text-sm">{value}</span>
    </div>
  );
}
