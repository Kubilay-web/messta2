"use client";

import { useEffect } from "react";

type Props = { open: boolean; onClose: () => void; showToast: (t: string, s: string) => void };

const NAV_ITEMS = [
  { label:"Home",        icon:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10", active:true,  badge:0 },
  { label:"Immobilien",  icon:"M3 3h18v18H3z",                                                active:false, badge:0 },
  { label:"Heizkosten",  icon:"M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4 4 0 1 0 5 0z",        active:false, badge:0 },
  { label:"Mieter",      icon:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", active:false, badge:0 },
  { label:"Tickets",     icon:"M22 12h-4l-3 9L9 3l-3 9H2",                                    active:false, badge:3 },
  { label:"Finanzen",    icon:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",        active:false, badge:0 },
  { label:"Dokumente",   icon:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",  active:false, badge:0 },
  { label:"Nachrichten", icon:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", active:false, badge:3 },
  { label:"Einkauf",     icon:"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z",          active:false, badge:0 },
  { label:"Einstellungen",icon:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",                         active:false, badge:0 },
];

const KPIS = [
  { dot:"bg-[#1D9E75]", lbl:"Nettomieteinnahmen Mai",  val:"+18.760 €", pos:true,  sub:"Gegenüber April +340 €" },
  { dot:"bg-[#eab308]", lbl:"Offene Mieten",           val:"4.940 €",   pos:false, sub:"4 Mieter offen, 1 in Verzug" },
  { dot:"bg-[#3b82f6]", lbl:"Portfolio-Auslastung",    val:"95,6 %",    pos:true,  sub:"22 von 23 Wohneinheiten vermietet" },
];

const RENT_ROWS = [
  { name:"Goethestr. 14 · Whg 1 · Müller",   st:"ok",   amt:"980 €" },
  { name:"Goethestr. 14 · Whg 2 · Schmidt",  st:"ok",   amt:"1.150 €" },
  { name:"Schillerplatz 3 · Whg A · Weber",  st:"open", amt:"820 €" },
  { name:"Bahnhofstr. 7 · Whg 4 · Bauer",   st:"late", amt:"760 €" },
  { name:"Lahnauenweg 28 · Whg 6 · Klein",   st:"ok",   amt:"1.090 €" },
  { name:"Altstadtgasse 12 · Whg 2 · Becker",st:"ok",  amt:"875 €" },
];

const STATUS_MAP: Record<string,{label:string;cls:string}> = {
  ok:   { label:"OK",     cls:"text-[#1D9E75]" },
  open: { label:"Offen",  cls:"text-[#eab308]" },
  late: { label:"Verzug", cls:"text-[#e53935]" },
};

export default function DashboardOverlay({ open, onClose, showToast }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f5f6fa] overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] min-h-screen">

        {/* ── SIDEBAR ── */}
        <aside className="hidden lg:flex flex-col bg-white border-r border-[#e8edf2] p-5 h-screen sticky top-0 overflow-y-auto">
          <div className="text-[27px] font-[800] text-[#111] tracking-[-0.03em] px-2 pb-5 mb-3 border-b border-[#f0f0f0]">
            messta<span className="text-[#1D9E75]">.</span>
          </div>
          <div className="text-[14px] font-[800] text-[#999] uppercase tracking-[.1em] px-2 py-2">Hauptbereich</div>
          {NAV_ITEMS.slice(0, 7).map(item => (
            <button
              key={item.label}
              onClick={() => !item.active && showToast(item.label, "Öffnet…")}
              className={`flex items-center gap-3 px-3 py-[11px] rounded-[10px] mb-[2px] cursor-pointer border-none text-left w-full transition-colors ${item.active ? "bg-[#d1f5e9]" : "bg-transparent hover:bg-[#f5f6fa]"}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={item.active ? "#085041" : "#555"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d={item.icon} />
              </svg>
              <span className={`text-[17px] font-[700] flex-1 ${item.active ? "text-[#085041]" : "text-[#111]"}`}>{item.label}</span>
              {item.badge > 0 && (
                <span className="bg-[#e53935] text-white text-[14px] font-[800] min-w-[20px] h-5 rounded-[10px] flex items-center justify-center px-[6px]">{item.badge}</span>
              )}
            </button>
          ))}
          <div className="text-[14px] font-[800] text-[#999] uppercase tracking-[.1em] px-2 py-2 mt-2">Mehrwert</div>
          {NAV_ITEMS.slice(7, 9).map(item => (
            <button key={item.label} onClick={() => showToast(item.label,"Öffnet…")}
              className="flex items-center gap-3 px-3 py-[11px] rounded-[10px] mb-[2px] cursor-pointer border-none bg-transparent hover:bg-[#f5f6fa] text-left w-full transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d={item.icon} />
              </svg>
              <span className="text-[17px] font-[700] text-[#111] flex-1">{item.label}</span>
            </button>
          ))}
          <div className="mt-auto pt-4 border-t border-[#f0f0f0]">
            <button onClick={onClose}
              className="flex items-center gap-3 px-3 py-[11px] rounded-[10px] cursor-pointer border-none bg-transparent hover:bg-[#f5f6fa] text-left w-full transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
              <span className="text-[17px] font-[700] text-[#111]">Abmelden</span>
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="flex flex-col min-w-0">

          {/* top bar */}
          <div className="bg-white border-b border-[#e8edf2] px-4 py-3 flex items-center gap-4 sticky top-0 z-10">
            <div className="flex-1 max-w-[480px] flex items-center gap-[10px] bg-[#f5f6fa] rounded-full px-[18px] py-[10px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" width="16" height="16">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" placeholder="Suchen…" className="flex-1 bg-transparent border-none outline-none text-[17px] text-[#333] font-[inherit] placeholder:text-[#888]" />
            </div>
            <div className="flex-1" />
            <button onClick={() => showToast("Nachrichten","5 neu")} className="relative w-10 h-10 rounded-full bg-[#f5f6fa] border-none cursor-pointer flex items-center justify-center hover:bg-[#e8edf2] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" width="18" height="18">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="absolute top-0 right-0 bg-[#e53935] text-white text-[13px] font-[800] min-w-[18px] h-[18px] rounded-[9px] flex items-center justify-center px-[5px] border-2 border-white">5</span>
            </button>
            <div onClick={() => showToast("Profil","Öffnet…")} className="flex items-center gap-[10px] pl-2 pr-[14px] py-[6px] rounded-full bg-[#f5f6fa] cursor-pointer hover:bg-[#e8edf2] transition-colors">
              <div className="w-[30px] h-[30px] rounded-full bg-[#1D9E75] flex items-center justify-center text-white font-[800] text-[15px]">HK</div>
              <span className="text-[16px] font-[800] text-[#111] hidden sm:block">Herr Köhler</span>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 bg-transparent border-none cursor-pointer hover:text-[#1D9E75] text-[#333]" aria-label="Schließen">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="22" height="22">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* main */}
          <div className="p-4 sm:p-6 flex flex-col gap-4 max-w-[1200px] w-full">

            {/* greeting */}
            <div className="bg-white border border-[#e8edf2] rounded-[14px] p-[22px_26px] flex justify-between items-center gap-5 flex-wrap">
              <div>
                <div className="text-[16px] text-[#888]">Willkommen zurück</div>
                <div className="text-[25px] font-[800] text-[#111] tracking-[-0.02em] mt-[2px]">
                  Guten Morgen, <span className="text-[#1D9E75]">Herr Köhler</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[33px] font-[800] text-[#1D9E75] leading-[1] tracking-[-0.02em]">18 / 23</div>
                <div className="text-[16px] text-[#666] mt-[6px] font-[600]">Mieten Mai eingegangen · 78 %</div>
              </div>
            </div>

            {/* live bar */}
            <div className="bg-gradient-to-r from-[#faf5ff] to-[#fdf2f8] border border-[#f3e8ff] rounded-[14px] p-[14px_18px] flex items-center gap-3 flex-wrap">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg">⭐</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[14px] font-[800] text-[#6b21a8] uppercase tracking-[.08em]">Heute · 11.05.2026</span>
                <span className="inline-flex items-center gap-1 bg-[#d1f5e9] text-[#085041] text-[14px] font-[800] px-[10px] py-[3px] rounded-full">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#1D9E75] inline-block" />Live
                </span>
              </div>
              <button onClick={() => showToast("Mahnung Bauer","Öffnet…")} className="inline-flex items-center gap-2 border-2 border-[#fca5a5] bg-[#fef2f2] text-[#991b1b] rounded-full px-[14px] py-2 text-[15px] font-[700] cursor-pointer hover:bg-[#fee2e2] transition-colors">
                <span className="text-[11px] font-[800] bg-[#dc2626] text-white px-[9px] py-[3px] rounded-full">Heute fällig</span>
                Mahnung Bauer
              </button>
              <button onClick={() => showToast("Eichung Goethestr. 14","Öffnet…")} className="inline-flex items-center gap-2 border-2 border-[#fcd34d] bg-[#fffbeb] text-[#78350f] rounded-full px-[14px] py-2 text-[15px] font-[700] cursor-pointer hover:bg-[#fef3c7] transition-colors">
                <span className="text-[11px] font-[800] bg-[#d97706] text-white px-[9px] py-[3px] rounded-full">In 3 Tagen</span>
                Eichung Goethestr. 14
              </button>
              <button onClick={() => showToast("Mietspiegel Wetzlar","Öffnet…")} className="inline-flex items-center gap-2 border-2 border-[#6ee7b7] bg-[#f0fdf8] text-[#064e3b] rounded-full px-[14px] py-2 text-[15px] font-[700] cursor-pointer hover:bg-[#d1f5e9] transition-colors">
                <span className="text-[11px] font-[800] bg-[#085041] text-white px-[9px] py-[3px] rounded-full">Chance</span>
                Mietspiegel +3,2 %
                <span className="text-[13px] font-[600] opacity-85">~ 540 €/Monat</span>
              </button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[14px]">
              {KPIS.map(k => (
                <div key={k.lbl} className="bg-white border border-[#e8edf2] rounded-[14px] p-[18px_20px]">
                  <div className="flex items-center gap-[10px] mb-[10px]">
                    <span className={`w-[10px] h-[10px] rounded-full flex-shrink-0 ${k.dot}`} />
                    <span className="text-[16px] text-[#666] font-[700]">{k.lbl}</span>
                  </div>
                  <div className={`text-[25px] font-[800] tracking-[-0.02em] ${k.pos ? "text-[#1D9E75]" : "text-[#111]"}`}>{k.val}</div>
                  <div className="text-[15px] text-[#888] mt-1">{k.sub}</div>
                </div>
              ))}
            </div>

            {/* rent status */}
            <div className="bg-white border border-[#e8edf2] rounded-[14px] p-[18px_20px]">
              <div className="flex justify-between items-center mb-[14px]">
                <span className="text-[18px] font-[800] text-[#111]">Mieteingänge Mai</span>
                <button onClick={() => showToast("Mieteingänge","Alle 23")} className="text-[16px] text-[#1D9E75] font-[700] bg-transparent border-none cursor-pointer hover:underline">Alle anzeigen →</button>
              </div>
              <div className="flex flex-col">
                {RENT_ROWS.map(r => {
                  const s = STATUS_MAP[r.st];
                  return (
                    <div key={r.name} className="flex items-center justify-between py-[10px] border-b border-[#f0f0f0] last:border-none gap-2">
                      <span className="text-[15px] text-[#333] flex-1 min-w-0 truncate">{r.name}</span>
                      <span className={`text-[15px] font-[700] flex-shrink-0 mx-2 ${s.cls}`}>{s.label}</span>
                      <span className="text-[15px] font-[800] text-[#111] min-w-[70px] text-right flex-shrink-0">{r.amt}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* promo card */}
            <div className="bg-[#085041] text-white rounded-[14px] p-[18px_24px] flex items-center gap-4 flex-wrap">
              <div className="w-12 h-12 rounded-[12px] bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" width="24" height="24">
                  <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                </svg>
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="text-[19px] font-[800]">KfW-Förderung: Frist endet bald</div>
                <div className="text-[16px] opacity-85 mt-[3px] leading-[1.4]">BEG-Sanierungsförderung bis 35 % — Antrag für Goethestr. 14 möglich.</div>
              </div>
              <button onClick={() => showToast("KfW-Förderung","Mehr erfahren…")} className="bg-white text-[#085041] border-none px-[22px] py-[10px] rounded-full text-[17px] font-[800] cursor-pointer hover:bg-[#e0e0e0] transition-colors flex-shrink-0">
                Mehr erfahren
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
