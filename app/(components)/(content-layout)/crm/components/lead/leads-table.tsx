"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, ArrowUpDown, Users, Tag, Save, Bookmark, X } from "lucide-react";
import { Card, CardContent, Badge, Button, Checkbox } from "../ui";
import {
  formatCurrency, leadStatusLabel, temperatureColor, temperatureLabel, timeAgo,
} from "../../lib/labels";
import { scoreTier } from "../../lib/score";
import {
  bulkAssignLeads, bulkMoveLeadsToStage, bulkAddTag, bulkDeleteLeads, deleteLead,
} from "../../actions/leads";

type Lead = any;
type Agent = { id: string; firstName: string; lastName: string };
type Pipeline = { id: string; name: string; stages: { id: string; name: string }[] };

type SortKey = "default" | "score" | "value" | "activity";

export function LeadsTable({
  agencyId, leads, agents, pipelines,
}: { agencyId: string; leads: Lead[]; agents: Agent[]; pipelines: Pipeline[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortKey>("default");
  const [busy, setBusy] = useState(false);
  const [views, setViews] = useState<{ name: string; qs: string }[]>([]);

  useEffect(() => {
    try { setViews(JSON.parse(localStorage.getItem("crm-lead-views") || "[]")); } catch {}
  }, []);

  const sorted = useMemo(() => {
    const arr = [...leads];
    if (sort === "score") arr.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    else if (sort === "value") arr.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
    else if (sort === "activity") arr.sort((a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime());
    return arr;
  }, [leads, sort]);

  const allSelected = sorted.length > 0 && selected.size === sorted.length;
  function toggleAll() { setSelected(allSelected ? new Set() : new Set(sorted.map((l) => l.id))); }
  function toggle(id: string) {
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  const ids = () => Array.from(selected);
  async function run(fn: () => Promise<any>, ok: string) {
    try { setBusy(true); await fn(); toast.success(ok); setSelected(new Set()); router.refresh(); }
    catch (e: any) { toast.error(e?.message ?? "İşlem başarısız."); }
    finally { setBusy(false); }
  }

  function saveView() {
    const name = prompt("Görünüm adı:");
    if (!name) return;
    const qs = window.location.search;
    const next = [...views.filter((v) => v.name !== name), { name, qs }];
    localStorage.setItem("crm-lead-views", JSON.stringify(next));
    setViews(next);
    toast.success("Görünüm kaydedildi.");
  }
  function removeView(name: string) {
    const next = views.filter((v) => v.name !== name);
    localStorage.setItem("crm-lead-views", JSON.stringify(next));
    setViews(next);
  }

  const sortLabel: Record<SortKey, string> = { default: "Varsayılan", score: "Skora göre", value: "Değere göre", activity: "Aktiviteye göre" };
  const inputCls = "h-9 rounded-md border px-2 text-sm bg-background";

  return (
    <div className="space-y-3">
      {/* Kayıtlı görünümler + sıralama */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-sm">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <select className={inputCls} value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            {(["default", "score", "value", "activity"] as SortKey[]).map((k) => (
              <option key={k} value={k}>{sortLabel[k]}</option>
            ))}
          </select>
        </div>
        <Button variant="outline" className="h-9" onClick={saveView}><Save className="w-4 h-4 mr-1" /> Görünümü Kaydet</Button>
        {views.map((v) => (
          <span key={v.name} className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs">
            <button onClick={() => router.push(`/crm/agency/${agencyId}/leads${v.qs}`)} className="inline-flex items-center gap-1 hover:text-primary">
              <Bookmark className="w-3 h-3" />{v.name}
            </button>
            <button onClick={() => removeView(v.name)} className="text-muted-foreground hover:text-red-600"><X className="w-3 h-3" /></button>
          </span>
        ))}
      </div>

      {/* Toplu işlem çubuğu */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/40 p-2">
          <span className="text-sm font-medium px-1">{selected.size} seçili</span>

          <span className="inline-flex items-center gap-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <select className={inputCls} disabled={busy} defaultValue="" onChange={(e) => { const v = e.target.value; e.target.value = ""; if (v !== "") run(() => bulkAssignLeads(agencyId, ids(), v === "__none__" ? null : v), "Danışman atandı."); }}>
              <option value="" disabled>Danışman ata…</option>
              <option value="__none__" >— Atamayı kaldır —</option>
              {agents.map((a) => <option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>)}
            </select>
          </span>

          <select className={inputCls} disabled={busy} defaultValue="" onChange={(e) => { const v = e.target.value; e.target.value = ""; if (v) run(() => bulkMoveLeadsToStage(agencyId, ids(), v), "Aşama güncellendi."); }}>
            <option value="" disabled>Aşamaya taşı…</option>
            {pipelines.map((p) => (
              <optgroup key={p.id} label={p.name}>
                {p.stages.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </optgroup>
            ))}
          </select>

          <span className="inline-flex items-center gap-1">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <input className={inputCls} placeholder="Etiket ekle + Enter" disabled={busy}
              onKeyDown={(e) => { if (e.key === "Enter") { const v = (e.target as HTMLInputElement).value.trim(); if (v) { (e.target as HTMLInputElement).value = ""; run(() => bulkAddTag(agencyId, ids(), v), "Etiket eklendi."); } } }} />
          </span>

          <Button variant="destructive" className="h-9" disabled={busy}
            onClick={() => { if (confirm(`${selected.size} fırsat silinsin mi?`)) run(() => bulkDeleteLeads(agencyId, ids()), "Silindi."); }}>
            <Trash2 className="w-4 h-4 mr-1" /> Sil
          </Button>
          <Button variant="outline" className="h-9" onClick={() => setSelected(new Set())}>Temizle</Button>
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="px-3 py-3 w-8"><Checkbox checked={allSelected} onCheckedChange={toggleAll} /></th>
                  <th className="px-4 py-3 font-medium">Fırsat</th>
                  <th className="px-4 py-3 font-medium">Skor</th>
                  <th className="px-4 py-3 font-medium">Kişi</th>
                  <th className="px-4 py-3 font-medium">Aşama</th>
                  <th className="px-4 py-3 font-medium">Danışman</th>
                  <th className="px-4 py-3 font-medium text-right">Değer</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium">Son Aktivite</th>
                  <th className="px-2 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 ? (
                  <tr><td colSpan={10} className="px-4 py-12 text-center text-muted-foreground">Kayıt bulunamadı.</td></tr>
                ) : sorted.map((l) => {
                  const tier = scoreTier(l.score ?? 0);
                  return (
                    <tr key={l.id} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                      <td className="px-3 py-3"><Checkbox checked={selected.has(l.id)} onCheckedChange={() => toggle(l.id)} /></td>
                      <td className="px-4 py-3">
                        <Link href={`/crm/agency/${agencyId}/leads/${l.id}`} className="font-medium hover:text-primary">{l.title}</Link>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs text-muted-foreground">{l.pipeline?.name}</span>
                          <span className={`text-[10px] px-1.5 rounded-full ${temperatureColor[l.temperature]}`}>{temperatureLabel[l.temperature]}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="font-semibold tabular-nums" style={{ color: tier.color }}>{l.score ?? 0}</span>
                          <Badge style={{ backgroundColor: `${tier.color}1a`, color: tier.color }}>{tier.label}</Badge>
                        </span>
                      </td>
                      <td className="px-4 py-3"><p>{l.contactName}</p><p className="text-xs text-muted-foreground">{l.contactPhone ?? "—"}</p></td>
                      <td className="px-4 py-3"><span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ background: l.stage?.color }} />{l.stage?.name}</span></td>
                      <td className="px-4 py-3 text-muted-foreground">{l.agentName ?? "—"}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatCurrency(l.value, l.currency)}</td>
                      <td className="px-4 py-3"><Badge variant={l.status === "WON" ? "default" : l.status === "LOST" ? "destructive" : "secondary"}>{leadStatusLabel[l.status]}</Badge></td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{timeAgo(l.lastActivityAt)}</td>
                      <td className="px-2 py-3 text-right">
                        <button onClick={() => { if (confirm("Bu fırsat silinsin mi?")) run(() => deleteLead(l.id), "Silindi."); }} className="text-muted-foreground hover:text-red-600 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
