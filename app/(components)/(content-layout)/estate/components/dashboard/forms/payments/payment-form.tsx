"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SaveAll, ArrowLeft } from "lucide-react";

import TextInput      from "../../../FormInputs/TextInput";
import TextArea       from "../../../FormInputs/TextAreaInput";
import SubmitButton   from "../../../FormInputs/SubmitButton";
import { Button }     from "../../../ui/button";
import FormSelectInput from "../../../FormInputs/FormSelectInput";

import {
  ContractPaymentProps,
  createContractPayment,
  updateContractPayment,
} from "../../../../actions/contract-payments";

const statusOptions = [
  { label: "Bekliyor",     value: "PENDING"  },
  { label: "Ödendi",       value: "PAID"     },
  { label: "Kısmi Ödeme",  value: "PARTIAL"  },
  { label: "Başarısız",    value: "FAILED"   },
  { label: "İade Edildi",  value: "REFUNDED" },
];
const methodOptions = [
  { label: "— Yöntem seçin —", value: ""         },
  { label: "Nakit",             value: "Nakit"    },
  { label: "EFT / Havale",      value: "EFT"      },
  { label: "Çek",               value: "Çek"      },
  { label: "Kredi Kartı",       value: "Kredi Kartı" },
  { label: "Kripto",            value: "Kripto"   },
];

type Contract = { id: string; contractNo: string; clientName: string; currency: string };

type Props = {
  contracts:    Contract[];
  editingId?:   string;
  initialData?: Partial<ContractPaymentProps & { id: string; contract?: Contract | null }>;
};

function fmt(d: any) {
  if (!d) return "";
  return new Date(d).toISOString().split("T")[0];
}

export default function PaymentForm({ contracts, editingId, initialData }: Props) {
  const router    = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);

  const [selStatus, setSelStatus] = useState<any>(
    statusOptions.find((o) => o.value === initialData?.status) ?? statusOptions[0]
  );
  const [selMethod, setSelMethod] = useState<any>(
    methodOptions.find((o) => o.value === (initialData?.paymentMethod ?? "")) ?? methodOptions[0]
  );
  const [selContractId, setSelContractId] = useState(
    initialData?.contractId ?? initialData?.contract?.id ?? contracts[0]?.id ?? ""
  );

  const selectedContract = contracts.find((c) => c.id === selContractId);

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<ContractPaymentProps>({
      defaultValues: {
        contractId:    initialData?.contractId    ?? contracts[0]?.id ?? "",
        title:         initialData?.title         ?? "",
        amount:        initialData?.amount        ?? undefined,
        dueDate:       fmt(initialData?.dueDate)  || new Date().toISOString().split("T")[0],
        paidDate:      fmt(initialData?.paidDate),
        receiptNo:     initialData?.receiptNo     ?? "",
        notes:         initialData?.notes         ?? "",
      } as any,
    });

  async function onSubmit(data: ContractPaymentProps) {
    if (!selContractId) { toast.error("Lütfen bir sözleşme seçin."); return; }

    const payload: ContractPaymentProps = {
      ...data,
      contractId:    selContractId,
      status:        selStatus.value,
      paymentMethod: selMethod.value || undefined,
      amount:        parseFloat(String(data.amount)),
      paidDate:      (data.paidDate as any) || undefined,
    };

    try {
      setLoading(true);
      if (isEditing) {
        await updateContractPayment(editingId!, payload);
        toast.success("Ödeme güncellendi!");
      } else {
        await createContractPayment(payload);
        toast.success("Ödeme oluşturuldu!");
        reset();
      }
      router.push("/estate/dashboard/payments");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  const selectCls   = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const selectLabel = "block text-sm font-medium text-gray-900 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
        {isEditing ? "Ödemeyi Düzenle" : "Yeni Ödeme Planı Oluştur"}
      </h2>

      {/* Sözleşme Seç */}
      <fieldset className="border rounded-lg p-4 space-y-3">
        <legend className="text-sm font-semibold px-1 text-black">Sözleşme</legend>
        <div>
          <label className={selectLabel}>Sözleşme <span className="text-red-500">*</span></label>
          <select value={selContractId} onChange={(e) => setSelContractId(e.target.value)} className={selectCls}>
            <option value="">— Sözleşme seçin —</option>
            {contracts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.contractNo} — {c.clientName}
              </option>
            ))}
          </select>
        </div>
        {selectedContract && (
          <p className="text-xs text-black">
            Para birimi: <strong>{selectedContract.currency}</strong>
          </p>
        )}
      </fieldset>

      {/* Ödeme Bilgileri */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Ödeme Bilgileri</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Başlık" name="title"
            placeholder='Örn. Peşinat, 1. Taksit, Kira - Ocak 2025' />
          <TextInput register={register} errors={errors} label="Tutar" name="amount"
            type="number" placeholder="50000" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Vade Tarihi"    name="dueDate"  type="date" />
          <TextInput register={register} errors={errors} label="Ödeme Tarihi"   name="paidDate" type="date" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelectInput label="Durum"           options={statusOptions} option={selStatus} setOption={setSelStatus} />
          <FormSelectInput label="Ödeme Yöntemi"   options={methodOptions} option={selMethod} setOption={setSelMethod} />
        </div>
        <TextInput register={register} errors={errors} label="Makbuz / Dekont No" name="receiptNo"
          placeholder="MKB-2025-0001" />
      </fieldset>

      {/* Notlar */}
      <fieldset className="border rounded-lg p-4">
        <legend className="text-sm font-semibold px-1 text-black">Notlar</legend>
        <TextArea register={register} errors={errors} label="Notlar" name="notes"
          helperText="Ödeme ile ilgili ek bilgiler." />
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton
          buttonIcon={SaveAll}
          title={isEditing ? "Güncelle" : "Ödemeyi Kaydet"}
          loading={loading}
          loadingTitle="Kaydediliyor..."
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
}
