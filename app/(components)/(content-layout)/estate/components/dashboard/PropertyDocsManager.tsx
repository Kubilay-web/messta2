"use client";

import { useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Trash2, FilePlus, Loader2, ExternalLink, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { addPropertyDocument, deletePropertyDocument } from "../../actions/property-documents";

const DOC_TYPES = [
  { value: "DEED",              label: "Tapu" },
  { value: "CONTRACT",          label: "Sözleşme" },
  { value: "INSPECTION",        label: "Ekspertiz Raporu" },
  { value: "FLOOR_PLAN",        label: "Kat Planı / Vaziyet" },
  { value: "ENERGY_CERT",       label: "Enerji Kimlik Belgesi" },
  { value: "ID_PROOF",          label: "Kimlik Belgesi" },
  { value: "POWER_OF_ATTORNEY", label: "Vekaletname" },
  { value: "PHOTO",             label: "Fotoğraf" },
  { value: "OTHER",             label: "Diğer" },
];

type Doc = {
  id:         string;
  type:       string;
  title:      string;
  url:        string;
  size:       number | null;
  uploadedAt: Date | string;
};

type Props = {
  propertyId:   string;
  initialDocs:  Doc[];
};

export default function PropertyDocsManager({ propertyId, initialDocs }: Props) {
  const fileInputRef              = useRef<HTMLInputElement>(null);
  const [docs, setDocs]           = useState<Doc[]>(initialDocs);
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();
  const [selType, setSelType]     = useState("DEED");
  const [title,   setTitle]       = useState("");

  async function handleFile(file: File) {
    if (!title.trim()) { toast.error("Lütfen belge başlığını girin."); return; }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!);
      formData.append("resource_type", "auto");

      const res  = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (!data.secure_url) throw new Error("Upload başarısız.");

      const saved = await addPropertyDocument({
        propertyId,
        type:  selType,
        title: title.trim(),
        url:   data.secure_url,
        size:  data.bytes ?? null,
      });

      setDocs((prev) => [saved as Doc, ...prev]);
      setTitle("");
      toast.success("Belge eklendi.");
    } catch (e: any) {
      toast.error(e?.message ?? "Yüklenemedi.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleDelete(docId: string) {
    startTransition(async () => {
      try {
        await deletePropertyDocument(docId, propertyId);
        setDocs((prev) => prev.filter((d) => d.id !== docId));
        toast.success("Belge silindi.");
      } catch {
        toast.error("Silinemedi.");
      }
    });
  }

  const typeLabel = Object.fromEntries(DOC_TYPES.map((t) => [t.value, t.label]));

  function fmtSize(bytes: number | null) {
    if (!bytes) return null;
    if (bytes < 1024)        return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="space-y-5">
      {/* Form */}
      <div className="rounded-xl border border-gray-200 p-4 space-y-3 bg-gray-50">
        <p className="text-sm font-semibold text-black">Yeni Belge Ekle</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Belge tipi */}
          <div className="space-y-1">
            <Label className="text-xs text-black">Belge Tipi</Label>
            <select
              value={selType}
              onChange={(e) => setSelType(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {DOC_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Başlık */}
          <div className="space-y-1 sm:col-span-2">
            <Label className="text-xs text-black">Başlık <span className="text-red-500">*</span></Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn. Tapu Senedi, Kira Sözleşmesi 2025"
              className="text-sm text-black"
            />
          </div>
        </div>

        {/* Dosya yükle butonu */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <Button
            type="button"
            variant="outline"
            disabled={uploading || !title.trim()}
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto"
          >
            {uploading ? (
              <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Yükleniyor…</>
            ) : (
              <><FilePlus className="mr-2 w-4 h-4" /> Dosya Seç & Yükle</>
            )}
          </Button>
          <p className="text-xs text-gray-400 mt-1">PDF, DOC, XLS, JPG, PNG — maks. 20 MB</p>
        </div>
      </div>

      {/* Belge listesi */}
      {docs.length === 0 ? (
        <p className="text-sm text-center text-black py-4">Henüz belge yok.</p>
      ) : (
        <div className="space-y-2">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-black truncate">{doc.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-black bg-gray-100 px-1.5 py-0.5 rounded">
                      {typeLabel[doc.type] ?? doc.type}
                    </span>
                    {doc.size && (
                      <span className="text-xs text-black">{fmtSize(doc.size)}</span>
                    )}
                    <span className="text-xs text-black">
                      {new Date(doc.uploadedAt).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <Button asChild size="icon" variant="outline" className="h-8 w-8">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" title="Görüntüle">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  disabled={pending}
                  onClick={() => handleDelete(doc.id)}
                  title="Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
