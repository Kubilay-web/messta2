"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SaveAll, ArrowLeft } from "lucide-react";

import TextInput    from "../../../FormInputs/TextInput";
import SubmitButton from "../../../FormInputs/SubmitButton";
import { Button }   from "../../../ui/button";

import {
  DepartmentProps,
  createAgencyDepartment,
  updateAgencyDepartment,
} from "../../../../actions/agencyDepartments";
import { AgencyDepartment } from "../../../../types/types";

type Props = {
  agencyId:    string;
  editingId?:  string;
  initialData?: Partial<AgencyDepartment>;
  agents?:     { id: string; firstName: string; lastName: string; designation: string }[];
};

export default function DepartmentForm({ agencyId, editingId, initialData, agents = [] }: Props) {
  const router    = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } =
    useForm<DepartmentProps>({
      defaultValues: {
        agencyId,
        name:             initialData?.name             ?? "",
        managerId:        initialData?.managerId        ?? "",
        managerName:      initialData?.managerName      ?? "",
        managerStartDate: initialData?.managerStartDate
          ? new Date(initialData.managerStartDate).toISOString().split("T")[0]
          : "",
        budget:    initialData?.budget    ?? undefined,
        budgetYear: initialData?.budgetYear ?? "",
      },
    });

  function handleAgentSelect(agentId: string) {
    const agent = agents.find((a) => a.id === agentId);
    setValue("managerId",   agentId);
    setValue("managerName", agent ? `${agent.firstName} ${agent.lastName}` : "");
  }

  async function onSubmit(data: DepartmentProps) {
    data.budget = data.budget ? parseFloat(String(data.budget)) : undefined;

    try {
      setLoading(true);
      if (isEditing) {
        await updateAgencyDepartment(editingId!, data);
        toast.success("Departman güncellendi!");
      } else {
        await createAgencyDepartment(data);
        toast.success("Departman oluşturuldu!");
        reset();
      }
      router.push("/estate/dashboard/users/departments");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
          {isEditing ? "Departmanı Düzenle" : "Yeni Departman Ekle"}
        </h2>
      </div>

      {/* Temel Bilgiler */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Departman Bilgileri</legend>
        <TextInput
          register={register} errors={errors}
          label="Departman Adı"
          name="name"
          placeholder="Örn. Satış, Kiralama, Hukuk"
        />
      </fieldset>

      {/* Yönetici */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Departman Yöneticisi</legend>

        {agents.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Yönetici Danışman Seç
            </label>
            <select
              defaultValue={initialData?.managerId ?? ""}
              onChange={(e) => handleAgentSelect(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">— Seçin —</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.firstName} {a.lastName} — {a.designation}
                </option>
              ))}
            </select>
            <p className="text-xs text-black mt-1">
              Seçim yapıldığında yönetici adı otomatik dolar.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            register={register} errors={errors}
            label="Yönetici Adı"
            name="managerName"
            placeholder="Ahmet Yılmaz"
          />
          <TextInput
            register={register} errors={errors}
            label="Yöneticilik Başlangıcı"
            name="managerStartDate"
            type="date"
            placeholder="2024-01-01"
          />
        </div>
      </fieldset>

      {/* Bütçe */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Bütçe</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            register={register} errors={errors}
            label="Yıllık Bütçe (₺)"
            name="budget"
            type="number"
            placeholder="500000"
          />
          <TextInput
            register={register} errors={errors}
            label="Mali Yıl"
            name="budgetYear"
            placeholder="2025"
          />
        </div>
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Geri
        </Button>
        <SubmitButton
          buttonIcon={SaveAll}
          title={isEditing ? "Güncelle" : "Departman Kaydet"}
          loading={loading}
          loadingTitle="Kaydediliyor..."
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
}
