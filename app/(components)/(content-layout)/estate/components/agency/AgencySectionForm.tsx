"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SaveAll, ToggleLeft, ToggleRight, Eye } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import ImageInput from "../FormInputs/ImageInput";
import { updateAgencySection } from "../../actions/agency-site";
import AgencySectionPreview from "./AgencySectionPreview";

export type FieldDef =
  | { key: string; label: string; type: "text" | "url" | "email" | "tel" }
  | { key: string; label: string; type: "textarea" }
  | { key: string; label: string; type: "image" };

type Props = {
  sectionId:   string;
  agencyId:    string;
  sectionType: string;
  title:       string;
  subtitle?:   string | null;
  isActive:    boolean;
  isComplete:  boolean;
  settings:    Record<string, any>;
  fields:      FieldDef[];
  sectionName: string;
};

export default function AgencySectionForm({
  sectionId, agencyId, sectionType, title, subtitle,
  isActive, isComplete, settings, fields, sectionName,
}: Props) {
  const router  = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title:    title    ?? "",
    subtitle: subtitle ?? "",
    isActive,
    settings: { ...settings },
  });

  function setField(key: string, value: string) {
    setForm((p) => ({ ...p, settings: { ...p.settings, [key]: value } }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateAgencySection(sectionId, agencyId, {
        title:      form.title,
        subtitle:   form.subtitle || undefined,
        isActive:   form.isActive,
        isComplete: true,
        settings:   form.settings,
      });
      toast.success("Bölüm kaydedildi!");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Tabs defaultValue="edit" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="edit">Düzenle</TabsTrigger>
        <TabsTrigger value="preview" className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5" /> Önizleme
        </TabsTrigger>
      </TabsList>

      {/* ── DÜZENLE ── */}
      <TabsContent value="edit">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">

          {/* Genel */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{sectionName}</CardTitle>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, isActive: !p.isActive }))}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {form.isActive
                    ? <><ToggleRight className="w-5 h-5 text-green-500" /> Aktif</>
                    : <><ToggleLeft  className="w-5 h-5 text-gray-400"  /> Pasif</>}
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Bölüm Başlığı</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Bölüm başlığı"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Alt Başlık <span className="text-muted-foreground text-xs">(opsiyonel)</span></Label>
                <Input
                  value={form.subtitle}
                  onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                  placeholder="Kısa açıklama"
                />
              </div>
            </CardContent>
          </Card>

          {/* İçerik Alanları */}
          {fields.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-base">İçerik Ayarları</CardTitle></CardHeader>
              <CardContent className="space-y-5">
                {fields.map((f) => (
                  <div key={f.key} className="space-y-1.5">
                    {f.type === "image" ? (
                      <ImageInput
                        title={f.label}
                        imageUrl={form.settings[f.key] ?? "/management/images/realestate-logo.svg"}
                        setImageUrl={(url: string) => setField(f.key, url)}
                        size="sm"
                      />
                    ) : f.type === "textarea" ? (
                      <>
                        <Label>{f.label}</Label>
                        <Textarea
                          value={form.settings[f.key] ?? ""}
                          onChange={(e) => setField(f.key, e.target.value)}
                          placeholder={f.label}
                          rows={4}
                        />
                      </>
                    ) : (
                      <>
                        <Label>{f.label}</Label>
                        <Input
                          type={f.type}
                          value={form.settings[f.key] ?? ""}
                          onChange={(e) => setField(f.key, e.target.value)}
                          placeholder={f.type === "url" ? "https://..." : f.label}
                        />
                      </>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            <SaveAll className="mr-2 w-4 h-4" />
            {loading ? "Kaydediliyor…" : "Kaydet"}
          </Button>
        </form>
      </TabsContent>

      {/* ── ÖNİZLEME ── */}
      <TabsContent value="preview">
        <AgencySectionPreview
          sectionType={sectionType}
          title={form.title}
          subtitle={form.subtitle}
          settings={form.settings}
        />
      </TabsContent>
    </Tabs>
  );
}
