"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Phone,
  Mail,
  Building2,
  MapPin,
  Pencil,
  Trash2,
  StickyNote,
  PhoneCall,
  Users,
  MessageCircle,
  Plus,
  Check,
  XCircle,
  Flag,
  Home,
  UserPlus,
  ExternalLink,
  Trophy,
  Banknote,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  timeAgo,
  leadSourceLabel,
  leadStatusLabel,
  temperatureLabel,
  temperatureColor,
  listingTypeLabel,
  propertyTypeLabel,
  activityTypeLabel,
  taskStatusLabel,
  taskPriorityLabel,
  taskPriorityColor,
} from "../../lib/labels";
import { LeadDialog } from "../pipeline/lead-dialog";
import { ConvertClientDialog } from "./convert-client-dialog";
import { ConvertOfferDialog } from "./convert-offer-dialog";
import type { FormOptions, KanbanLead } from "../pipeline/types";
import { addActivity, deleteActivity } from "../../actions/activities";
import { createTask, updateTaskStatus, deleteTask } from "../../actions/tasks";
import { moveLead, markLeadLost, deleteLead, markLeadWon } from "../../actions/leads";
import { addListingInterestFromLead } from "../../actions/matching";
import { scoreTier } from "../../lib/score";

const activityIcons: Record<string, any> = {
  NOTE: StickyNote,
  CALL: PhoneCall,
  EMAIL: Mail,
  WHATSAPP: MessageCircle,
  MEETING: Users,
  VISIT: Home,
  CREATED: Flag,
  STAGE_CHANGE: ArrowLeft,
  WON: Check,
  LOST: XCircle,
  TASK: Check,
  SMS: MessageCircle,
  FILE: StickyNote,
};

export function LeadDetail({
  agencyId,
  lead,
  options,
  matches,
}: {
  agencyId: string;
  lead: any;
  options: FormOptions;
  matches: any[];
}) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const stages = lead.pipeline.stages as any[];
  const currentStage = lead.stage;

  const handleStageChange = async (stageId: string) => {
    if (stageId === lead.stageId) return;
    try {
      await moveLead({ leadId: lead.id, toStageId: stageId, orderedLeadIds: [lead.id] });
      toast.success("Aşama güncellendi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  const handleLost = async () => {
    const reason = window.prompt("Kayıp nedeni:");
    if (reason === null) return;
    try {
      await markLeadLost(lead.id, reason || "Belirtilmedi");
      toast.success("Kaybedildi olarak işaretlendi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  const handleWin = async () => {
    try {
      await markLeadWon(lead.id);
      toast.success("Fırsat kazanıldı 🎉");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Bu fırsat silinsin mi? Bu işlem geri alınamaz.")) return;
    try {
      await deleteLead(lead.id);
      toast.success("Fırsat silindi.");
      router.push(`/crm/agency/${agencyId}/pipeline`);
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  // KanbanLead şekline indirgenmiş düzenleme nesnesi
  const editLead: KanbanLead = {
    id: lead.id,
    title: lead.title,
    contactName: lead.contactName,
    contactPhone: lead.contactPhone,
    contactEmail: lead.contactEmail,
    company: lead.company,
    source: lead.source,
    status: lead.status,
    temperature: lead.temperature,
    value: lead.value,
    currency: lead.currency,
    city: lead.city,
    district: lead.district,
    listingType: lead.listingType,
    propertyType: lead.propertyType,
    roomCount: lead.roomCount,
    tags: lead.tags ?? [],
    agentId: lead.agentId,
    agentName: lead.agentName,
    clientId: lead.clientId,
    listingId: lead.listingId,
    expectedCloseDate: lead.expectedCloseDate,
    lastActivityAt: lead.lastActivityAt,
    stageId: lead.stageId,
    position: lead.position,
    _count: { tasks: 0, activities: 0 },
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-4">
      {/* Üst bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Button asChild variant="ghost" size="icon">
            <Link href={`/crm/agency/${agencyId}/pipeline?pipeline=${lead.pipelineId}`}>
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div className="min-w-0">
            <h1 className="text-xl font-bold truncate">{lead.title}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap">
              {lead.pipeline.name} ·{" "}
              <Badge
                variant={lead.status === "WON" ? "default" : lead.status === "LOST" ? "destructive" : "secondary"}
              >
                {leadStatusLabel[lead.status]}
              </Badge>
              {(() => { const t = scoreTier(lead.score ?? 0); return (
                <Badge style={{ backgroundColor: `${t.color}1a`, color: t.color }}>Skor {lead.score ?? 0} · {t.label}</Badge>
              ); })()}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {lead.clientId ? (
            <Button asChild variant="outline" size="sm">
              <Link href={`/crm/agency/${agencyId}/clients/${lead.clientId}`}>
                <ExternalLink className="size-4" /> Müşteri Profili
              </Link>
            </Button>
          ) : (
            <Button variant="default" size="sm" onClick={() => setConvertOpen(true)}>
              <UserPlus className="size-4" /> Müşteriye Dönüştür
            </Button>
          )}
          {lead.clientId && lead.listingId && (
            <Button variant="outline" size="sm" onClick={() => setOfferOpen(true)}>
              <Banknote className="size-4" /> Teklife Çevir
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="size-4" /> Düzenle
          </Button>
          {lead.status === "OPEN" && (
            <Button variant="default" size="sm" onClick={handleWin}>
              <Trophy className="size-4" /> Kazandır
            </Button>
          )}
          {lead.status === "OPEN" && (
            <Button variant="outline" size="sm" onClick={handleLost}>
              <XCircle className="size-4" /> Kaybedildi
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash2 className="size-4 text-red-500" />
          </Button>
        </div>
      </div>

      {/* Aşama göstergesi */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {stages
              .filter((s) => !s.isLost)
              .map((s, i, arr) => {
                const reached =
                  arr.findIndex((x) => x.id === lead.stageId) >= i || lead.status === "WON";
                const isCurrent = s.id === lead.stageId;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleStageChange(s.id)}
                    className={`relative flex-1 min-w-[90px] text-xs font-medium py-2 px-2 rounded-md transition-colors ${
                      isCurrent
                        ? "text-white"
                        : reached
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                    style={isCurrent ? { background: s.color } : undefined}
                  >
                    {s.name}
                  </button>
                );
              })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Sol: bilgi */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">İletişim</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-sm">
              <InfoRow icon={Users} value={lead.contactName} />
              {lead.contactPhone && (
                <InfoRow
                  icon={Phone}
                  value={
                    <a href={`tel:${lead.contactPhone}`} className="hover:underline">
                      {lead.contactPhone}
                    </a>
                  }
                />
              )}
              {lead.contactEmail && (
                <InfoRow
                  icon={Mail}
                  value={
                    <a href={`mailto:${lead.contactEmail}`} className="hover:underline">
                      {lead.contactEmail}
                    </a>
                  }
                />
              )}
              {lead.company && <InfoRow icon={Building2} value={lead.company} />}
              {(lead.city || lead.district) && (
                <InfoRow
                  icon={MapPin}
                  value={[lead.district, lead.city].filter(Boolean).join(", ")}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Fırsat Detayı</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-sm">
              <DetailRow label="Değer" value={formatCurrency(lead.value, lead.currency)} />
              <DetailRow label="Kaynak" value={leadSourceLabel[lead.source]} />
              <DetailRow
                label="Sıcaklık"
                value={
                  <span className={`px-2 py-0.5 rounded-full text-xs ${temperatureColor[lead.temperature]}`}>
                    {temperatureLabel[lead.temperature]}
                  </span>
                }
              />
              {lead.listingType && (
                <DetailRow label="İlan Türü" value={listingTypeLabel[lead.listingType]} />
              )}
              {lead.propertyType && (
                <DetailRow label="Mülk Türü" value={propertyTypeLabel[lead.propertyType]} />
              )}
              {lead.roomCount && <DetailRow label="Oda" value={lead.roomCount} />}
              {lead.expectedCloseDate && (
                <DetailRow label="Tahmini Kapanış" value={formatDate(lead.expectedCloseDate)} />
              )}
              <DetailRow label="Danışman" value={lead.agentName ?? "Atanmadı"} />
              <DetailRow label="Aşama" value={currentStage?.name} />
              {lead.requirements && (
                <div className="pt-1">
                  <p className="text-xs text-muted-foreground mb-1">Talep</p>
                  <p className="text-sm">{lead.requirements}</p>
                </div>
              )}
              {lead.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {lead.tags.map((t: string) => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {lead.listing && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">İlgili İlan</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="font-medium">{lead.listing.title}</p>
                <p className="text-muted-foreground">İlan No: {lead.listing.listingNo}</p>
                <p className="font-semibold mt-1">
                  {formatCurrency(lead.listing.askingPrice, lead.listing.currency)}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sağ: aktivite + görev */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="timeline">
            <TabsList className="flex-wrap h-auto">
              <TabsTrigger value="timeline">Zaman Çizelgesi</TabsTrigger>
              <TabsTrigger value="tasks">
                Görevler {lead.tasks.length > 0 && `(${lead.tasks.length})`}
              </TabsTrigger>
              <TabsTrigger value="matches">
                Eşleşen İlanlar {matches.length > 0 && `(${matches.length})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-4 mt-4">
              <ActivityComposer agencyId={agencyId} leadId={lead.id} agentId={lead.agentId} />
              <Timeline activities={lead.activities} /* DELETE wired */ canManage />

            </TabsContent>

            <TabsContent value="tasks" className="mt-4">
              <TaskPanel
                agencyId={agencyId}
                leadId={lead.id}
                agentId={lead.agentId}
                tasks={lead.tasks}
              />
            </TabsContent>

            <TabsContent value="matches" className="mt-4">
              <MatchPanel
                agencyId={agencyId}
                leadId={lead.id}
                hasClient={!!lead.clientId}
                matches={matches}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <LeadDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        agencyId={agencyId}
        pipelineId={lead.pipelineId}
        options={options}
        lead={editLead}
      />

      <ConvertClientDialog
        open={convertOpen}
        onOpenChange={setConvertOpen}
        agencyId={agencyId}
        lead={lead}
      />

      <ConvertOfferDialog
        open={offerOpen}
        onOpenChange={setOfferOpen}
        lead={lead}
      />
    </div>
  );
}

function InfoRow({ icon: Icon, value }: { icon: any; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 text-muted-foreground shrink-0" />
      <span className="min-w-0 truncate">{value}</span>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

/* ---------------- Aktivite oluşturucu ---------------- */

const ACTIVITY_TYPES = [
  { type: "NOTE", label: "Not", icon: StickyNote },
  { type: "CALL", label: "Çağrı", icon: PhoneCall },
  { type: "EMAIL", label: "E-posta", icon: Mail },
  { type: "WHATSAPP", label: "WhatsApp", icon: MessageCircle },
  { type: "MEETING", label: "Toplantı", icon: Users },
  { type: "VISIT", label: "Gezi", icon: Home },
];

function ActivityComposer({
  agencyId,
  leadId,
  agentId,
}: {
  agencyId: string;
  leadId: string;
  agentId: string | null;
}) {
  const router = useRouter();
  const [type, setType] = useState("NOTE");
  const [content, setContent] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!content.trim()) {
      toast.error("İçerik giriniz.");
      return;
    }
    setSaving(true);
    try {
      await addActivity({
        agencyId,
        leadId,
        agentId,
        type: type as any,
        title: activityTypeLabel[type],
        content: content.trim(),
        dueAt: dueAt || null,
      });
      setContent("");
      setDueAt("");
      toast.success("Aktivite eklendi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-3 space-y-2.5">
        <div className="flex flex-wrap gap-1">
          {ACTIVITY_TYPES.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.type}
                onClick={() => setType(t.type)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  type === t.type
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={2}
          placeholder="Not yazın veya görüşmeyi kaydedin..."
        />
        <div className="flex items-center gap-2">
          <Input
            type="datetime-local"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
            className="w-auto text-xs"
            title="Hatırlatma / planlanan zaman (opsiyonel)"
          />
          <Button size="sm" className="ml-auto" onClick={submit} disabled={saving}>
            {saving ? "..." : "Kaydet"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Timeline({ activities, canManage }: { activities: any[]; canManage?: boolean }) {
  const router = useRouter();

  const remove = async (id: string) => {
    try {
      await deleteActivity(id);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  if (!activities.length)
    return <p className="text-sm text-muted-foreground text-center py-8">Henüz aktivite yok.</p>;

  return (
    <div className="space-y-1">
      {activities.map((a, i) => {
        const Icon = activityIcons[a.type] ?? StickyNote;
        return (
          <div key={a.id} className="flex gap-3 group">
            <div className="flex flex-col items-center">
              <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Icon className="size-4 text-muted-foreground" />
              </div>
              {i < activities.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
            </div>
            <div className="pb-4 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium">{a.title}</span>
                <Badge variant="outline" className="text-[10px]">
                  {activityTypeLabel[a.type] ?? a.type}
                </Badge>
                {a.dueAt && !a.completedAt && (
                  <Badge variant="secondary" className="text-[10px]">
                    Planlı: {formatDateTime(a.dueAt)}
                  </Badge>
                )}
                {canManage && (
                  <button
                    onClick={() => remove(a.id)}
                    className="ml-auto opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-opacity"
                    aria-label="Aktiviteyi sil"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
              {a.content && <p className="text-sm text-muted-foreground mt-0.5">{a.content}</p>}
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                {a.agentName ? `${a.agentName} · ` : ""}
                {timeAgo(a.createdAt)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Görev paneli ---------------- */

/* ---------------- Eşleşen ilanlar ---------------- */

function MatchPanel({
  agencyId,
  leadId,
  hasClient,
  matches,
}: {
  agencyId: string;
  leadId: string;
  hasClient: boolean;
  matches: any[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const addInterest = async (listingId: string) => {
    setBusy(listingId);
    try {
      await addListingInterestFromLead(leadId, listingId);
      toast.success("İlan müşterinin ilgi listesine eklendi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setBusy(null);
    }
  };

  if (!matches.length)
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          <Home className="size-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">Bu kriterlere uyan aktif ilan bulunamadı.</p>
          <p className="text-xs mt-1">Fırsatın ilan türü / şehir / bütçe alanlarını doldurun.</p>
        </CardContent>
      </Card>
    );

  const scoreColor = (s: number) =>
    s >= 75
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
      : s >= 50
      ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
      : "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-300";

  return (
    <div className="space-y-2">
      {matches.map((m) => (
        <Card key={m.id}>
          <CardContent className="p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${scoreColor(m.matchScore)}`}>
                    %{m.matchScore}
                  </span>
                  <p className="font-medium text-sm truncate">{m.title}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {m.listingNo} ·{" "}
                  {[
                    listingTypeLabel[m.listingType] ?? m.listingType,
                    m.propertyType ? propertyTypeLabel[m.propertyType] : null,
                    m.roomCount,
                    [m.district, m.city].filter(Boolean).join(", "),
                    m.grossArea ? `${m.grossArea} m²` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {m.reasons.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {m.reasons.map((r: string) => (
                      <span key={r} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        {r} ✓
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-sm">{formatCurrency(m.askingPrice, m.currency)}</p>
                <div className="flex items-center gap-1.5 mt-2 justify-end">
                  <Button asChild variant="ghost" size="sm" className="h-7 text-xs">
                    <Link href={`/estate/agency/${agencyId}/ilanlar/${m.id}`} target="_blank">
                      Görüntüle
                    </Link>
                  </Button>
                  {hasClient && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => addInterest(m.id)}
                      disabled={busy === m.id}
                    >
                      <Plus className="size-3" /> İlgi
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {!hasClient && (
        <p className="text-xs text-muted-foreground text-center pt-1">
          İlanları müşterinin ilgi listesine eklemek için fırsatı bir müşteriye bağlayın.
        </p>
      )}
    </div>
  );
}

function TaskPanel({
  agencyId,
  leadId,
  agentId,
  tasks,
}: {
  agencyId: string;
  leadId: string;
  agentId: string | null;
  tasks: any[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);

  const add = async () => {
    if (!title.trim()) {
      toast.error("Görev başlığı giriniz.");
      return;
    }
    setSaving(true);
    try {
      await createTask({
        agencyId,
        leadId,
        agentId,
        title: title.trim(),
        priority: priority as any,
        dueDate: dueDate || null,
      });
      setTitle("");
      setDueDate("");
      toast.success("Görev eklendi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (task: any) => {
    try {
      await updateTaskStatus(task.id, task.status === "DONE" ? "TODO" : "DONE");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteTask(id);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  return (
    <Card>
      <CardContent className="p-3 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Yeni görev..."
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(taskPriorityLabel).map(([v, l]) => (
                <SelectItem key={v} value={v}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full sm:w-auto"
          />
          <Button onClick={add} disabled={saving} size="icon">
            <Plus className="size-4" />
          </Button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">Görev yok.</p>
        ) : (
          <div className="space-y-1.5">
            {tasks.map((t) => {
              const overdue =
                t.dueDate && t.status !== "DONE" && new Date(t.dueDate) < new Date();
              return (
                <div
                  key={t.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg border hover:bg-muted/40 transition-colors group"
                >
                  <button
                    onClick={() => toggle(t)}
                    className={`size-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      t.status === "DONE"
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-muted-foreground/40 hover:border-primary"
                    }`}
                  >
                    {t.status === "DONE" && <Check className="size-3" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm ${
                        t.status === "DONE" ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {t.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${taskPriorityColor[t.priority]}`}
                      >
                        {taskPriorityLabel[t.priority]}
                      </span>
                      {t.dueDate && (
                        <span
                          className={`text-xs ${
                            overdue ? "text-red-500 font-medium" : "text-muted-foreground"
                          }`}
                        >
                          {formatDate(t.dueDate)}
                          {overdue && " · gecikti"}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {taskStatusLabel[t.status]}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(t.id)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-opacity"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
