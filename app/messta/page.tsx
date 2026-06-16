"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import OwnerSection from "./components/OwnerSection";
import OnboardingOverlay from "./components/OnboardingOverlay";
import DashboardOverlay from "./components/DashboardOverlay";

/* ─── constants ──────────────────────────────────────────────────────────── */

const TICKER_ITEMS = [
  { label: "NEU:",       text: "HeizkostenV 2024 – Pflicht zur monatlichen Verbrauchsinformation" },
  { label: "FÖRDERUNG:", text: "BEG 2026 – Bis zu 35% Zuschuss für Sanierungsmaßnahmen" },
  { label: "PFLICHT:",   text: "CO₂-Kostenaufteilung – 10-Stufen-Modell jetzt verpflichtend" },
  { label: "INFO:",      text: "Rauchwarnmelderpflicht gilt in allen Bundesländern" },
  { label: "TIPP:",      text: "Hydraulischer Abgleich spart bis zu 15% Heizkosten" },
  { label: "GEG 2026:",  text: "Sanierungspflicht für Klasse F & G – Jetzt handeln" },
];

const TRENDING = [
  { num: "1", text: "Sanierungspflicht 2026 – Klasse F & G",   meta: "847 Stimmen · 234 Antworten" },
  { num: "2", text: "BGH: Schönheitsreparaturen 2026",         meta: "512 Stimmen · 128 Antworten" },
  { num: "3", text: "PV-Anlage Steuerbefreiung verlängert",    meta: "389 Stimmen · 97 Antworten"  },
  { num: "4", text: "Nebenkosten: Top-10 Fehler",              meta: "276 Stimmen · 203 Antworten" },
  { num: "5", text: "AfA 2026: Jetzt 3% abschreiben",          meta: "198 Stimmen · 156 Antworten" },
];

const INFO_CARDS = [
  {
    icon: "⚖️", tag: "Neues Gesetz", label: "Neue Gesetze",
    title: "HeizkostenV 2024: Pflicht zur monatlichen Verbrauchsinformation",
    desc:  "Ab sofort müssen Vermieter mit fernablesbaren Zählern monatliche Verbrauchsinfos bereitstellen.",
  },
  {
    icon: "💰", tag: "Förderung", label: "Förderungen",
    title: "BEG-Förderung 2026: Bis zu 35% Zuschuss für Sanierungsmaßnahmen",
    desc:  "KfW und BAFA fördern energetische Sanierungen mit attraktiven Zuschüssen und zinsgünstigen Krediten.",
  },
  {
    icon: "🌱", tag: "Neuigkeit", label: "CO₂-Kostenaufteilung",
    title: "CO₂-Kostenaufteilung: 10-Stufen-Modell ab 2023 verpflichtend",
    desc:  "Vermieter und Mieter teilen die CO₂-Kosten je nach Energieeffizienz des Gebäudes. Jetzt informieren!",
  },
];

const SERVICES = [
  { icon: "🔥", name: "Heizkostenabrechnung",   desc: "Verbrauchsgenaue Abrechnung – schnell, korrekt, gesetzeskonform nach HeizkostenV."   },
  { icon: "📋", name: "Nebenkostenabrechnung",   desc: "Transparente Abrechnung aller umlagefähigen Kosten für Mieter und Eigentümer."         },
  { icon: "🚨", name: "Rauchwarnmelder-Service", desc: "Installation, jährliche Wartung und Funktionsprüfung gemäß DIN 14676."                 },
  { icon: "📜", name: "Energieausweis",          desc: "Bedarfs- und Verbrauchsausweis – pflichtgemäß und schnell ausgestellt."                },
];

const FOOTER_COLS = [
  {
    title: "Leistungen",
    links: ["Heizkostenabrechnung","Nebenkostenabrechnung","Smart Metering","CO₂-Kostenaufteilung","Rauchwarnmelder-Service","Energieausweis"],
  },
  {
    title: "Lösungen",
    links: ["Smarte Thermostate","Hydraulischer Abgleich","PV-Monitoring","ESG-Dashboard","Wärmepumpen-Monitoring","EV-Charging"],
  },
  {
    title: "Unternehmen",
    links: ["Über uns","Karriere","Wissenshub","Presse","Partner werden"],
  },
  {
    title: "Service",
    links: ["Eigentümer-Portal","Angebot anfordern","Störung melden","FAQ","Downloads","Kontakt"],
  },
];

/* ─── shared Tailwind class strings ─────────────────────────────────────── */

const CARD =
  "bg-white border-[1.5px] border-[#e8edf2] rounded-[20px] px-[22px] pt-6 pb-[22px] " +
  "text-center cursor-pointer transition-all duration-200 shadow-[0_1px_4px_rgba(0,0,0,.04)] " +
  "hover:border-[#1D9E75] hover:-translate-y-[3px] " +
  "hover:shadow-[0_0_0_3px_rgba(29,158,117,.18),0_0_28px_rgba(29,158,117,.45),0_8px_20px_rgba(29,158,117,.15)] " +
  "focus-visible:outline-[3px] focus-visible:outline-[#1D9E75] focus-visible:outline-offset-[3px]";

const DD =
  "flex absolute top-full left-0 " +
  "bg-white border border-[#e8edf2] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,.12)] " +
  "p-7 gap-8 z-[200] mt-px";

const DD_COL_TITLE =
  "text-[13px] font-[800] text-[#111] uppercase tracking-[.08em] pb-3 border-b-2 border-[#1D9E75] mb-4";

const DD_ITEM =
  "block text-[16px] font-bold text-[#111] py-[9px] border-b border-[#f5f5f5] " +
  "cursor-pointer hover:text-[#1D9E75] transition-colors duration-150 last:border-none";

const NAV_BTN =
  "text-[14px] font-bold text-[#111] px-[13px] h-[64px] border-none bg-transparent cursor-pointer " +
  "whitespace-nowrap flex items-center border-b-[3px] border-transparent " +
  "transition-colors duration-200 hover:text-[#1D9E75]";

/* ─── dropdown wrapper – hover + click ──────────────────────────────────── */

type DDWrapProps = {
  name: string;
  label: React.ReactNode;
  open: boolean;
  onOpen: (name: string) => void;
  onClose: () => void;
  btnClass?: string;
  ddClass?: string;
  children: React.ReactNode;
};

function DDWrap({ name, label, open, onOpen, onClose, btnClass = "", ddClass = "", children }: DDWrapProps) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpen(name)}
      onMouseLeave={onClose}
    >
      <button
        className={`${NAV_BTN} ${btnClass}`}
        onClick={() => (open ? onClose() : onOpen(name))}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
      </button>
      <div className={`${open ? DD : "hidden"} ${ddClass}`}>
        {children}
      </div>
    </div>
  );
}

/* ─── mobile accordion ───────────────────────────────────────────────────── */

function MobileAccordion({
  name, label, open, onToggle, children,
}: {
  name: string; label: string; open: boolean;
  onToggle: (name: string) => void; children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#f0f0f0]">
      <button
        className="w-full flex items-center justify-between py-4 text-[17px] font-bold text-[#111] bg-transparent border-none cursor-pointer"
        onClick={() => onToggle(name)}
        aria-expanded={open}
      >
        {label}
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          className={`transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="pb-5 pl-2">{children}</div>}
    </div>
  );
}

/* ─── green button ───────────────────────────────────────────────────────── */

function GreenBtn({ children, onClick, className = "" }: { children: React.ReactNode; onClick: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-[15px] font-bold text-white bg-[#1D9E75] border-none px-8 py-[14px] rounded-full cursor-pointer shadow-[0_4px_14px_rgba(29,158,117,.3)] hover:bg-[#085041] transition-all ${className}`}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  const [toastState, setToastState] = useState({ visible: false, title: "", sub: "" });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [dashOpen, setDashOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const openDD  = useCallback((name: string) => setOpenDropdown(name), []);
  const closeDD = useCallback(() => setOpenDropdown(null), []);
  const toggleMobileAccordion = useCallback(
    (name: string) => setMobileAccordion((p) => (p === name ? null : name)),
    [],
  );

  /* body scroll kilidi – mobil menü açıkken */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Escape tuşu ve nav dışı tıklamada dropdown kapanır */
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  /* toast (HTML toast() fonksiyonu karşılığı) */
  const showToast = useCallback((title: string, sub: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToastState({ visible: true, title, sub });
    timerRef.current = setTimeout(
      () => setToastState((s) => ({ ...s, visible: false })),
      2400,
    );
  }, []);

  /* openPortal (HTML openPortal() fonksiyonu karşılığı) */
  const openPortal = useCallback(
    () => showToast("Eigentümer-Portal", "Öffnet in Kürze…"),
    [showToast],
  );

  const openOnboarding = useCallback(() => {
    setOnboardingOpen(true);
    setMobileOpen(false);
  }, []);

  const openDashboard = useCallback(() => {
    setOnboardingOpen(false);
    setDashOpen(true);
  }, []);

  const closeDashboard = useCallback(() => {
    setDashOpen(false);
    showToast("Abgemeldet", "Bis bald!");
  }, [showToast]);

  /* kbCard: Enter/Space ile role="button" aktivasyonu */
  const kbCard = (fn: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); }
  };

  return (
    <>
      {/* ── Skip Link ──────────────────────────────────────────────────── */}
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>

      {/* ── TOP BAR – sadece desktop ────────────────────────────────── */}
      <div className="sticky top-0 z-[101] bg-white border-b border-[#e8edf2] h-11 items-center px-8 hidden lg:flex">
        <div className="flex flex-shrink-0">
          {["Wohnimmobilien", "Gewerbe", "Über uns", "Karriere"].map((label) => (
            <button
              key={label}
              className="text-[13px] font-bold text-[#444] px-[14px] h-11 bg-transparent border-none cursor-pointer flex items-center whitespace-nowrap transition-colors hover:text-[#1D9E75]"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN NAV ───────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className="sticky top-0 lg:top-11 z-[100] bg-white border-b border-[#e8edf2] flex items-center px-5 lg:px-8 h-16 lg:h-[64px]"
        role="navigation"
        aria-label="Hauptnavigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-[10px] cursor-pointer mr-4 lg:mr-6 flex-shrink-0">
          <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-[9px] bg-[#1D9E75] flex items-center justify-center">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true">
              <path d="M3 3v18h18" />
              <path d="M7 17l4-4 4 4 5-5" />
            </svg>
          </div>
          <div className="text-[18px] lg:text-[20px] font-[800] text-[#111] tracking-[-0.02em]">
            mess<span className="text-[#1D9E75]">ta</span>.de
          </div>
        </div>

        {/* Desktop Nav Links – sadece lg+ */}
        <div className="hidden lg:flex gap-1 flex-1">
          <DDWrap
            name="abrechnungen"
            open={openDropdown === "abrechnungen"}
            onOpen={openDD}
            onClose={closeDD}
            btnClass="text-[#1D9E75]"
            ddClass="min-w-[720px]"
            label="Abrechnungen & Services ▾"
          >
            <div className="flex-1">
              <div className={DD_COL_TITLE}>Abrechnung</div>
              {["Heizkostenabrechnung", "Nebenkostenabrechnung"].map((x) => (
                <span key={x} className={DD_ITEM}>{x}</span>
              ))}
              <span className={`${DD_ITEM} mt-2`}>Fernablesbare Messtechnik</span>
              {["Heizkostenverteiler", "Wärmezähler", "Wasserzähler"].map((x) => (
                <span key={x} className="block text-[15px] font-[500] text-[#444] py-[9px] pl-4 border-b border-[#f5f5f5] cursor-pointer hover:text-[#1D9E75] transition-colors last:border-none">
                  · {x}
                </span>
              ))}
            </div>
            <div className="flex-1">
              <div className={DD_COL_TITLE}>Immo-Services</div>
              {["Energieausweis", "Rauchwarnmelder-Service", "Unterjährige Verbrauchsinformation (UVI)", "Rauchwarnmelder"].map((x) => (
                <span key={x} className={DD_ITEM}>{x}</span>
              ))}
            </div>
          </DDWrap>

          <DDWrap
            name="loesungen"
            open={openDropdown === "loesungen"}
            onOpen={openDD}
            onClose={closeDD}
            ddClass="min-w-[320px]"
            label="Lösungen ▾"
          >
            <div className="flex-1">
              <div className={DD_COL_TITLE}>Lösungen</div>
              {["Smarte Thermostatsteuerung","Digitaler hydraulischer Abgleich","Smart Metering & Multi-Metering","CO₂-Kostenaufteilung","Smart Meter Gateway"].map((x) => (
                <span key={x} className={DD_ITEM}>{x}</span>
              ))}
            </div>
          </DDWrap>

          <DDWrap
            name="zukunft"
            open={openDropdown === "zukunft"}
            onOpen={openDD}
            onClose={closeDD}
            ddClass="min-w-[280px]"
            label="Zukunft & Smart ▾"
          >
            <div className="flex-1">
              <div className={DD_COL_TITLE}>Zukunft &amp; Smart</div>
              {["PV-Anlage Monitoring","ESG-Dashboard","Predictive Maintenance","EV-Charging","Wärmepumpen-Monitoring","Leckagedetektion"].map((x) => (
                <div key={x} className="flex items-center gap-2 py-[9px] border-b border-[#f5f5f5] cursor-pointer hover:text-[#1D9E75] last:border-none">
                  <span className="text-[10px] bg-[#f0fdf8] text-[#1D9E75] border border-[#d1f5e9] px-[7px] py-[2px] rounded-[10px] font-semibold flex-shrink-0">NEU</span>
                  <span className="text-[16px] font-bold text-[#111]">{x}</span>
                </div>
              ))}
            </div>
          </DDWrap>

          <DDWrap
            name="kontakt"
            open={openDropdown === "kontakt"}
            onOpen={openDD}
            onClose={closeDD}
            ddClass="min-w-[320px]"
            label="Kontakt & Service ▾"
          >
            <div className="flex-1">
              <div className={DD_COL_TITLE}>Kontakt</div>
              {["📞 06441 / 123 456","📧 info@messta.de","📍 Albinistr. 9, Wetzlar","Angebot anfordern","Störung melden"].map((x) => (
                <span key={x} className="block text-[15px] font-[500] text-[#444] py-[9px] border-b border-[#f5f5f5] cursor-pointer hover:text-[#1D9E75] transition-colors last:border-none">{x}</span>
              ))}
            </div>
          </DDWrap>

          <button className={NAV_BTN}>Wissenshub</button>
        </div>

        {/* Desktop Nav Right – sadece lg+ */}
        <div className="hidden lg:flex gap-2 items-center ml-auto flex-shrink-0">
          <button
            onClick={() => showToast("Suche", "Öffnet…")}
            className="flex items-center gap-1 text-[13px] font-bold text-[#111] tracking-[.04em] bg-transparent border-none cursor-pointer px-2 py-2 hover:text-[#1D9E75] transition-colors whitespace-nowrap"
            aria-label="Suchen"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            SUCHEN
          </button>
          <div className="w-px h-5 bg-[#ddd]" aria-hidden="true" />
          <button
            onClick={openOnboarding}
            className="flex items-center gap-[6px] text-[13px] font-bold text-white bg-[#1D9E75] border-none px-[14px] py-[9px] rounded-full cursor-pointer transition-all whitespace-nowrap shadow-[0_2px_10px_rgba(29,158,117,.25)] hover:bg-[#085041]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            ANMELDEN
          </button>
          <button
            onClick={openPortal}
            className="text-[13px] font-bold text-white bg-[#1D9E75] border-none px-[16px] py-[9px] rounded-full cursor-pointer transition-all whitespace-nowrap shadow-[0_2px_10px_rgba(29,158,117,.25)] hover:bg-[#085041]"
          >
            Dokumente &amp; Vorlagen
          </button>
          <button
            onClick={() => showToast("Sprache", "Öffnet…")}
            className="flex items-center gap-1 text-[12px] font-bold text-[#333] bg-transparent border-[1.5px] border-[#ddd] px-[10px] py-[7px] rounded-full cursor-pointer transition-all hover:bg-[#f5f5f5] whitespace-nowrap"
            aria-label="Sprache wechseln"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="#333" strokeWidth="1.3" />
              <ellipse cx="8" cy="8" rx="2.8" ry="6.5" stroke="#333" strokeWidth="1.3" />
              <line x1="1.5" y1="8" x2="14.5" y2="8" stroke="#333" strokeWidth="1.3" />
            </svg>
            DE ▾
          </button>
        </div>

        {/* Mobile sağ – arama + hamburger (sadece < lg) */}
        <div className="flex lg:hidden items-center gap-1 ml-auto">
          <button
            onClick={() => showToast("Suche", "Öffnet…")}
            className="p-2 text-[#111] hover:text-[#1D9E75] bg-transparent border-none cursor-pointer transition-colors"
            aria-label="Suchen"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-[#111] hover:text-[#1D9E75] bg-transparent border-none cursor-pointer transition-colors"
            aria-label="Menü öffnen"
            aria-expanded={mobileOpen}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── MOBİL MENÜ OVERLAY ─────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[200] bg-white overflow-y-auto lg:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Üst bar – logo + kapat */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-5 h-16 border-b border-[#e8edf2]">
          <div className="flex items-center gap-[10px]">
            <div className="w-8 h-8 rounded-[9px] bg-[#1D9E75] flex items-center justify-center">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true">
                <path d="M3 3v18h18" /><path d="M7 17l4-4 4 4 5-5" />
              </svg>
            </div>
            <div className="text-[18px] font-[800] text-[#111] tracking-[-0.02em]">
              mess<span className="text-[#1D9E75]">ta</span>.de
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-[#111] hover:text-[#1D9E75] bg-transparent border-none cursor-pointer transition-colors"
            aria-label="Menü schließen"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Top bar linkleri */}
        <div className="px-5 py-1 bg-[#f8fafc] border-b border-[#e8edf2]">
          {["Wohnimmobilien", "Gewerbe", "Über uns", "Karriere"].map((label) => (
            <button
              key={label}
              className="block w-full text-left py-3 text-[15px] font-semibold text-[#555] border-b border-[#f0f0f0] last:border-none bg-transparent border-x-0 border-t-0 cursor-pointer hover:text-[#1D9E75] transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Ana nav akordiyonu */}
        <div className="px-5 py-2">
          <MobileAccordion
            name="abrechnungen"
            label="Abrechnungen & Services"
            open={mobileAccordion === "abrechnungen"}
            onToggle={toggleMobileAccordion}
          >
            <div className="text-[12px] font-[800] text-[#111] uppercase tracking-[.08em] pb-2 border-b border-[#e8edf2] mb-2">Abrechnung</div>
            {["Heizkostenabrechnung", "Nebenkostenabrechnung", "Fernablesbare Messtechnik"].map((x) => (
              <span key={x} className="block text-[15px] font-bold text-[#111] py-[9px] border-b border-[#f5f5f5] cursor-pointer hover:text-[#1D9E75] transition-colors last:border-none">{x}</span>
            ))}
            {["Heizkostenverteiler", "Wärmezähler", "Wasserzähler"].map((x) => (
              <span key={x} className="block text-[14px] font-[500] text-[#555] py-[8px] pl-3 border-b border-[#f5f5f5] cursor-pointer hover:text-[#1D9E75] transition-colors last:border-none">· {x}</span>
            ))}
            <div className="text-[12px] font-[800] text-[#111] uppercase tracking-[.08em] pb-2 border-b border-[#e8edf2] mb-2 mt-4">Immo-Services</div>
            {["Energieausweis", "Rauchwarnmelder-Service", "Unterjährige Verbrauchsinformation (UVI)", "Rauchwarnmelder"].map((x) => (
              <span key={x} className="block text-[15px] font-bold text-[#111] py-[9px] border-b border-[#f5f5f5] cursor-pointer hover:text-[#1D9E75] transition-colors last:border-none">{x}</span>
            ))}
          </MobileAccordion>

          <MobileAccordion
            name="loesungen"
            label="Lösungen"
            open={mobileAccordion === "loesungen"}
            onToggle={toggleMobileAccordion}
          >
            {["Smarte Thermostatsteuerung","Digitaler hydraulischer Abgleich","Smart Metering & Multi-Metering","CO₂-Kostenaufteilung","Smart Meter Gateway"].map((x) => (
              <span key={x} className="block text-[15px] font-bold text-[#111] py-[9px] border-b border-[#f5f5f5] cursor-pointer hover:text-[#1D9E75] transition-colors last:border-none">{x}</span>
            ))}
          </MobileAccordion>

          <MobileAccordion
            name="zukunft"
            label="Zukunft & Smart"
            open={mobileAccordion === "zukunft"}
            onToggle={toggleMobileAccordion}
          >
            {["PV-Anlage Monitoring","ESG-Dashboard","Predictive Maintenance","EV-Charging","Wärmepumpen-Monitoring","Leckagedetektion"].map((x) => (
              <div key={x} className="flex items-center gap-2 py-[9px] border-b border-[#f5f5f5] cursor-pointer hover:text-[#1D9E75] last:border-none">
                <span className="text-[10px] bg-[#f0fdf8] text-[#1D9E75] border border-[#d1f5e9] px-[7px] py-[2px] rounded-[10px] font-semibold flex-shrink-0">NEU</span>
                <span className="text-[15px] font-bold text-[#111]">{x}</span>
              </div>
            ))}
          </MobileAccordion>

          <MobileAccordion
            name="kontakt"
            label="Kontakt & Service"
            open={mobileAccordion === "kontakt"}
            onToggle={toggleMobileAccordion}
          >
            {["📞 06441 / 123 456","📧 info@messta.de","📍 Albinistr. 9, Wetzlar","Angebot anfordern","Störung melden"].map((x) => (
              <span key={x} className="block text-[15px] font-[500] text-[#444] py-[9px] border-b border-[#f5f5f5] cursor-pointer hover:text-[#1D9E75] transition-colors last:border-none">{x}</span>
            ))}
          </MobileAccordion>

          <button className="w-full text-left py-4 text-[17px] font-bold text-[#111] border-b border-[#f0f0f0] bg-transparent border-x-0 border-t-0 cursor-pointer hover:text-[#1D9E75] transition-colors">
            Wissenshub
          </button>
        </div>

        {/* Mobil CTA butonları */}
        <div className="px-5 py-6 flex flex-col gap-3 mt-2 border-t border-[#e8edf2]">
          <button
            onClick={openOnboarding}
            className="w-full py-[13px] rounded-full bg-[#111] text-white text-[15px] font-bold border-none cursor-pointer transition-all hover:bg-[#1D9E75] flex items-center justify-center gap-2"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Anmelden
          </button>
          <button
            onClick={() => { setMobileOpen(false); openPortal(); }}
            className="w-full py-[13px] rounded-full bg-[#1D9E75] text-white text-[15px] font-bold border-none cursor-pointer transition-all shadow-[0_4px_14px_rgba(29,158,117,.3)] hover:bg-[#085041]"
          >
            Dokumente &amp; Vorlagen
          </button>
          <button
            onClick={() => { setMobileOpen(false); showToast("Angebot", "Öffnet…"); }}
            className="w-full py-[13px] rounded-full border-[1.5px] border-[#1D9E75] text-[#1D9E75] text-[15px] font-bold bg-transparent cursor-pointer transition-all hover:bg-[#f0fdf8]"
          >
            Angebot anfordern
          </button>
          <div className="flex justify-center pt-1">
            <button
              onClick={() => showToast("Sprache", "Öffnet…")}
              className="flex items-center gap-1.5 text-[13px] font-bold text-[#333] bg-transparent border-[1.5px] border-[#ddd] px-[14px] py-2 rounded-full cursor-pointer transition-all hover:bg-[#f5f5f5]"
              aria-label="Sprache wechseln"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke="#333" strokeWidth="1.3" />
                <ellipse cx="8" cy="8" rx="2.8" ry="6.5" stroke="#333" strokeWidth="1.3" />
                <line x1="1.5" y1="8" x2="14.5" y2="8" stroke="#333" strokeWidth="1.3" />
              </svg>
              DE ▾
            </button>
          </div>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <div
        id="main-content"
        tabIndex={-1}
        className="bg-white px-12 pt-8 pb-6 outline-none max-md:px-4 max-md:pt-6 max-md:pb-4"
      >
        <div className="max-w-[1160px] mx-auto">

          {/* Headline */}
          <div className="text-center mb-7">
            <h1 className="text-[clamp(36px,4.5vw,58px)] font-[900] text-[#1a1a1a] leading-[1.08] tracking-[-0.04em] mb-5 max-md:text-[clamp(28px,7vw,40px)] max-md:mb-4">
              Wir sind Ihr Partner für<br />
              <em className="not-italic text-[#1D9E75]">smarte Messtechnik &amp;</em><br />
              das intelligente Gebäude von morgen.
            </h1>
            <p className="text-[16px] text-[#5a6a7a] leading-[1.7] max-w-[620px] mx-auto mb-5">
              Heizkostenabrechnung, CO₂-Kostenaufteilung, ESG-Reporting &amp; Smart Metering –
              alles aus einer Hand. Digital, automatisiert und gesetzeskonform.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <GreenBtn onClick={() => showToast("Angebot", "Öffnet…")}>
                Angebot anfordern
              </GreenBtn>
              <GreenBtn onClick={() => showToast("CO₂-Rechner", "Öffnet…")}>
                CO₂-Kostenrechner
              </GreenBtn>
            </div>
          </div>

          {/* 5 Hero Cards */}
          <div className="grid grid-cols-5 gap-[18px] max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-3.5">

            {/* Community Card */}
            <div className={CARD} role="button" tabIndex={0} onClick={openPortal} onKeyDown={kbCard(openPortal)}>
              <span className="text-[48px] mx-auto mb-5 leading-none block" aria-hidden="true">🤝</span>
              <div className="text-[16px] font-bold text-[#1a1a1a] mb-2.5">Mehr Kaufkraft durch Gemeinschaft.</div>
              <div className="text-[13px] text-[#5a6a7a] leading-[1.6] mb-4">
                Rahmenverträge für Gas, Strom &amp; Gebäudeversicherung – exklusiv für messta-Kunden.
              </div>
              <div className="text-[13px] font-semibold text-[#1D9E75]">Kostenlos registrieren →</div>
            </div>

            {/* Card 1 – Smarte Thermostatsteuerung */}
            <div
              className={CARD} role="button" tabIndex={0}
              aria-label="Smarte Thermostatsteuerung"
              onClick={() => showToast("Smarte Thermostatsteuerung", "Mehr erfahren…")}
              onKeyDown={kbCard(() => showToast("Smarte Thermostatsteuerung", "Mehr erfahren…"))}
            >
              <div className="mx-auto mb-5" aria-hidden="true">
                <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: "0 auto" }}>
                  <circle cx="28" cy="28" r="26" fill="#d1f5e9" />
                  <circle cx="28" cy="28" r="17" fill="#1D9E75" />
                  <text x="28" y="30" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontFamily="-apple-system,system-ui,sans-serif" fontSize="11" fontWeight="700">21°</text>
                  <circle cx="28" cy="11" r="2" fill="#1D9E75" />
                </svg>
              </div>
              <div className="text-[16px] font-bold text-[#1a1a1a] mb-2.5">Smarte Thermostatsteuerung</div>
              <div className="text-[13px] text-[#5a6a7a] leading-[1.6] mb-4">Energiekosten und CO₂ senken durch intelligente Heizungssteuerung.</div>
              <div className="text-[13px] font-semibold text-[#1D9E75]">Mehr erfahren →</div>
            </div>

            {/* Card 2 – Digitaler hydraulischer Abgleich */}
            <div
              className={CARD} role="button" tabIndex={0}
              aria-label="Digitaler hydraulischer Abgleich"
              onClick={() => showToast("Digitaler hydraulischer Abgleich", "Mehr erfahren…")}
              onKeyDown={kbCard(() => showToast("Digitaler hydraulischer Abgleich", "Mehr erfahren…"))}
            >
              <div className="mx-auto mb-5" aria-hidden="true">
                <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: "0 auto" }}>
                  <circle cx="28" cy="28" r="26" fill="#d1f5e9" />
                  <path d="M28 12C22 22,18 28,18 34C18 40,22 44,28 44C34 44,38 40,38 34C38 28,34 22,28 12Z" fill="#1D9E75" />
                  <circle cx="28" cy="34" r="6" fill="#085041" />
                  <line x1="28" y1="34" x2="32" y2="30" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="28" cy="34" r="1.5" fill="#fff" />
                </svg>
              </div>
              <div className="text-[16px] font-bold text-[#1a1a1a] mb-2.5">Digitaler hydraulischer Abgleich</div>
              <div className="text-[13px] text-[#5a6a7a] leading-[1.6] mb-4">Gesetzlich konform, digital gelöst – schneller als herkömmliche Verfahren.</div>
              <div className="text-[13px] font-semibold text-[#1D9E75]">Mehr erfahren →</div>
            </div>

            {/* Card 3 – Geräte & Technik (pulse-ring) */}
            <div
              className={`${CARD} relative overflow-hidden`} role="button" tabIndex={0}
              aria-label="Geräte & Technik"
              onClick={() => showToast("Geräte & Technik", "Mehr erfahren…")}
              onKeyDown={kbCard(() => showToast("Geräte & Technik", "Mehr erfahren…"))}
            >
              <div className="absolute inset-0 pointer-events-none opacity-50 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div className="pulse-ring-1 absolute top-1/2 left-1/2 w-[45%] pt-[45%] rounded-full border-2 border-[#1D9E75]" />
                <div className="pulse-ring-2 absolute top-1/2 left-1/2 w-[70%] pt-[70%] rounded-full border-2 border-[#1D9E75]" />
                <div className="pulse-ring-3 absolute top-1/2 left-1/2 w-[95%] pt-[95%] rounded-full border-2 border-[#1D9E75]" />
                <div className="pulse-ring-4 absolute top-1/2 left-1/2 w-[120%] pt-[120%] rounded-full border-[1.5px] border-[#1D9E75]" />
              </div>
              <div className="relative z-[1] flex flex-col items-center">
                <div className="mx-auto mb-5" aria-hidden="true">
                  <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: "0 auto" }}>
                    <circle cx="28" cy="28" r="26" fill="#d1f5e9" />
                    <line x1="14" y1="18" x2="28" y2="28" stroke="#1D9E75" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.8" />
                    <line x1="42" y1="18" x2="28" y2="28" stroke="#1D9E75" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.8" />
                    <line x1="28" y1="42" x2="28" y2="28" stroke="#1D9E75" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.8" />
                    <circle cx="14" cy="18" r="5" fill="#1D9E75" />
                    <path d="M14 14.5C12.5 16.5,11.5 17.5,11.5 18.5C11.5 19.6,12.6 20.5,14 20.5C15.4 20.5,16.5 19.6,16.5 18.5C16.5 17.5,15.5 16.5,14 14.5Z" fill="#fff" />
                    <circle cx="42" cy="18" r="5" fill="#1D9E75" />
                    <path d="M42 14C40 16,40 18.5,42 20.5C44 18.5,44 16,42 14Z" fill="#fff" />
                    <ellipse cx="42" cy="19.5" rx="1" ry="1.5" fill="#1D9E75" />
                    <circle cx="28" cy="42" r="5" fill="#1D9E75" />
                    <path d="M28.5 38.5L26 42.5L27.8 42.5L27.5 45L30 41L28.2 41L28.5 38.5Z" fill="#fff" />
                    <line x1="20.5" y1="22.5" x2="20.5" y2="20" stroke="#085041" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="35.5" y1="22.5" x2="35.5" y2="20" stroke="#085041" strokeWidth="1.2" strokeLinecap="round" />
                    <rect x="18" y="22" width="20" height="11" rx="2" fill="#085041" />
                    <circle cx="22" cy="26" r="0.8" fill="#1D9E75" />
                    <circle cx="25" cy="26" r="0.8" fill="#1D9E75" />
                    <circle cx="28" cy="26" r="0.8" fill="#fff" />
                    <circle cx="31" cy="26" r="0.8" fill="#1D9E75" />
                    <circle cx="34" cy="26" r="0.8" fill="#1D9E75" />
                    <rect x="22" y="29" width="12" height="2" rx="0.5" fill="#1D9E75" />
                  </svg>
                </div>
                <div className="text-[16px] font-bold text-[#1a1a1a] mb-2.5">Geräte &amp; Technik</div>
                <div className="text-[13px] text-[#5a6a7a] leading-[1.6] mb-4">Moderne Messgeräte für Smart Metering und digitale Verbrauchserfassung.</div>
                <div className="text-[13px] font-semibold text-[#1D9E75]">Mehr erfahren →</div>
              </div>
            </div>

            {/* Card 4 – Eigentümer-Portal */}
            <div className={CARD} role="button" tabIndex={0} onClick={openPortal} onKeyDown={kbCard(openPortal)}>
              <div className="mx-auto mb-5" aria-hidden="true">
                <svg width="72" height="72" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: "0 auto" }}>
                  <circle cx="28" cy="28" r="26" fill="#e2e8f0" />
                  <rect x="10" y="13" width="36" height="30" rx="3" fill="#fff" />
                  <rect x="10" y="13" width="36" height="7" fill="#334155" />
                  <circle cx="14" cy="16.5" r="1" fill="#fff" />
                  <circle cx="17" cy="16.5" r="1" fill="#fff" />
                  <circle cx="20" cy="16.5" r="1" fill="#fff" />
                  <text x="28" y="29.5" textAnchor="middle" fill="#1D9E75" fontFamily="-apple-system,system-ui,sans-serif" fontSize="8" fontWeight="900">+530€</text>
                  <line x1="13" y1="32" x2="43" y2="32" stroke="#cbd5e1" strokeWidth="0.5" />
                  <circle cx="14" cy="36" r="1.3" fill="#1D9E75" />
                  <rect x="17" y="35" width="20" height="2.5" rx="1" fill="#1D9E75" />
                  <rect x="38" y="35" width="5" height="2.5" rx="1" fill="#cbd5e1" />
                  <circle cx="14" cy="40.5" r="1.3" fill="#475569" />
                  <rect x="17" y="39.5" width="12" height="2.5" rx="1" fill="#475569" />
                  <rect x="30" y="39.5" width="13" height="2.5" rx="1" fill="#cbd5e1" />
                </svg>
              </div>
              <div className="text-[16px] font-bold text-[#1a1a1a] mb-2.5">Eigentümer-Portal</div>
              <div className="text-[13px] text-[#5a6a7a] leading-[1.6] mb-4">
                Abrechnungen, Verbrauchsdaten &amp; Verwaltung – alles digital auf einer Plattform.
              </div>
              <div className="text-[13px] font-semibold text-[#1D9E75]">Zum Portal →</div>
            </div>

          </div>
        </div>
      </div>

      {/* ── TICKER ─────────────────────────────────────────────────────── */}
      <div className="bg-[#f8fafc] border-b border-[#e8edf2] h-14 overflow-hidden whitespace-nowrap mt-4" aria-hidden="true">
        <div className="inline-flex h-14 items-center animate-ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="px-8 text-[15px] text-[#555] border-r border-[#e8edf2] inline-flex items-center gap-[7px] flex-shrink-0"
            >
              <span className="w-[5px] h-[5px] rounded-full bg-[#1D9E75] flex-shrink-0 inline-block" />
              <strong className="text-[#111]">{item.label}</strong>&nbsp;{item.text}
            </span>
          ))}
        </div>
      </div>

      {/* ── TRENDING & NEWS ────────────────────────────────────────────── */}
      <div className="py-14 px-12 bg-white border-t border-[#e8edf2] max-md:py-8 max-md:px-4">
        <div className="max-w-[1160px] mx-auto grid grid-cols-[380px_1fr] gap-12 items-start max-lg:grid-cols-1 max-lg:gap-8 max-md:gap-6">

          {/* Left – Trending */}
          <div className="bg-white border-[1.5px] border-[#e8edf2] rounded-[20px] py-7 px-[26px] shadow-[0_1px_4px_rgba(0,0,0,.04)] max-md:py-5 max-md:px-[18px]">
            <div className="text-[18px] font-[800] text-[#111] mb-6 flex items-center gap-2.5">
              ⚖️ Gesetze · Pflichten · Förderungen
            </div>
            {TRENDING.map((item, i) => (
              <div
                key={item.num}
                className={`py-4 flex items-start gap-3.5 cursor-pointer transition-opacity hover:opacity-70 ${i < TRENDING.length - 1 ? "border-b border-[#f0f0f0]" : ""}`}
              >
                <div className="text-[28px] font-[900] text-[#e8edf2] min-w-[28px] leading-[1.2] flex-shrink-0">
                  {item.num}
                </div>
                <div>
                  <div className="text-[15px] font-bold text-[#111] leading-[1.4] mb-[5px]">{item.text}</div>
                  <div className="text-[13px] text-[#767676]">{item.meta}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right – Info Cards */}
          <div className="flex flex-col gap-4">
            {INFO_CARDS.map((card) => (
              <div
                key={card.label}
                className="bg-white border-[1.5px] border-[#e8edf2] rounded-2xl py-[22px] px-6 cursor-pointer transition-all duration-200 shadow-[0_1px_4px_rgba(0,0,0,.04)] flex items-start gap-4 hover:border-[#a7e9d0] hover:shadow-[0_4px_16px_rgba(29,158,117,.08)] focus-visible:outline-[3px] focus-visible:outline-[#1D9E75] focus-visible:outline-offset-[3px] max-md:py-4 max-md:gap-3"
                role="button" tabIndex={0}
                aria-label={card.label}
                onClick={() => showToast(card.label, "Öffnet…")}
                onKeyDown={kbCard(() => showToast(card.label, "Öffnet…"))}
              >
                <div className="w-11 h-11 rounded-[11px] bg-[#f0fdf8] border border-[#d1f5e9] flex items-center justify-center text-[22px] flex-shrink-0 max-md:w-[38px] max-md:h-[38px] max-md:text-[18px]" aria-hidden="true">
                  {card.icon}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#1D9E75] uppercase tracking-[.06em] mb-[5px]">{card.tag}</div>
                  <div className="text-[15px] font-bold text-[#111] mb-[5px] leading-[1.35]">{card.title}</div>
                  <div className="text-[13px] text-[#595959] leading-[1.6]">{card.desc}</div>
                  <div className="text-[13px] font-semibold text-[#1D9E75] mt-2">Mehr erfahren →</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── SERVICES SECTION ───────────────────────────────────────────── */}
      <section className="py-14 px-12 bg-white max-md:py-8 max-md:px-4">
        <div className="max-w-[1160px] mx-auto">
          <div className="mb-7 text-center">
            <div className="text-[12px] font-bold text-[#1D9E75] uppercase tracking-[.1em] mb-2">Dienstleistungen</div>
            <div className="text-[28px] font-[800] text-[#111] tracking-[-0.03em] mb-2 max-md:text-[22px]">
              Unsere Kernleistungen im Überblick
            </div>
            <div className="text-[15px] text-[#5a6a7a] leading-[1.6] max-w-[600px] mx-auto">
              Vom Rauchwarnmelder bis zum Energieausweis – alles aus einer Hand.
            </div>
          </div>
          <div className="grid grid-cols-4 gap-[18px] max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-3.5">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className={CARD} role="button" tabIndex={0}
                aria-label={s.name}
                onClick={() => showToast(s.name, "Mehr erfahren…")}
                onKeyDown={kbCard(() => showToast(s.name, "Mehr erfahren…"))}
              >
                <span className="text-[48px] mx-auto mb-5 leading-none block" aria-hidden="true">{s.icon}</span>
                <div className="text-[16px] font-bold text-[#1a1a1a] mb-2.5">{s.name}</div>
                <div className="text-[13px] text-[#5a6a7a] leading-[1.6] mb-4">{s.desc}</div>
                <div className="text-[13px] font-semibold text-[#1D9E75]">Mehr erfahren →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OWNER SECTION ──────────────────────────────────────────────── */}
      <OwnerSection showToast={showToast} />

      {/* ── PROMO BANNER ───────────────────────────────────────────────── */}
      <section className="pb-14 px-12 bg-white max-md:px-4 max-md:pb-8">
        <div className="max-w-[1160px] mx-auto grid grid-cols-2 rounded-3xl overflow-hidden bg-[#085041] min-h-[360px] shadow-[0_8px_32px_rgba(8,80,65,.18)] max-md:grid-cols-1 max-md:rounded-2xl max-md:min-h-0">

          {/* Left – Image placeholder */}
          <div
            className="relative bg-gradient-to-br from-[#2db289] via-[#1D9E75] to-[#199069] flex items-center justify-center overflow-hidden min-h-[300px] max-md:min-h-[200px]"
            aria-hidden="true"
          >
            <div className="text-center text-white/85 p-6 text-[13px] font-semibold tracking-[.05em] uppercase">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-14 h-14 mx-auto mb-3 block opacity-85" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              Bild hier einfügen
            </div>
          </div>

          {/* Right – Content */}
          <div className="px-14 py-12 flex flex-col justify-center bg-[#085041] max-md:px-6 max-md:py-8">
            <div className="text-[12px] font-bold text-[#a7e9d0] uppercase tracking-[.12em] mb-3.5">Wechselservice</div>
            <h2 className="text-[34px] font-[800] text-[#a7e9d0] tracking-[-0.02em] leading-[1.15] mb-4 max-md:text-[24px]">
              Anbieter-Wechsel ohne Aufwand.
            </h2>
            <p className="text-[16px] leading-[1.6] mb-7 max-md:text-[14px]" style={{ color: "rgba(255,255,255,0.92)" }}>
              Wir übernehmen die komplette Datenmigration von Ihrem bisherigen Dienstleister –
              ohne Geräteaustausch, ohne langwierige Übergangsphase. Persönlicher Ansprechpartner aus Wetzlar.
            </p>
            <button
              onClick={() => showToast("Wechselberatung", "Mehr erfahren…")}
              className="w-fit text-[15px] font-bold text-white bg-[#1D9E75] px-7 py-[14px] rounded-full border-none cursor-pointer transition-all shadow-[0_4px_14px_rgba(29,158,117,.4)] hover:-translate-y-[2px] hover:shadow-[0_8px_22px_rgba(29,158,117,.5)]"
            >
              Kostenlose Wechselanalyse
            </button>
          </div>

        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="bg-white pt-14 pb-6 px-12 mt-16 max-lg:px-8 max-md:px-4 max-md:pt-10 max-md:pb-5">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 mb-10 max-lg:grid-cols-2 max-lg:gap-8 max-md:grid-cols-1 max-md:gap-7 max-md:mb-7">

            {/* Brand & Contact */}
            <div>
              <div className="text-[22px] font-[800] text-black tracking-[-0.02em] mb-3">
                mess<span className="text-black">ta</span>.de
              </div>
              <p className="text-[14px] text-black font-bold leading-[1.6] mb-4 max-w-[280px]">
                Heizkostenabrechnung, CO₂-Kostenaufteilung und Smart Metering für Eigentümer,
                Verwalter und Wohnungsgesellschaften.
              </p>
              <address className="not-italic text-[17px] font-bold text-black leading-[1.9]">
                <strong className="text-black">messta GmbH</strong><br />
                Albinistraße 9<br />
                35578 Wetzlar<br /><br />
                Tel.:{" "}
                <a href="tel:+4964411234567" className="text-black no-underline font-bold hover:text-[#444] transition-colors">
                  +49 6441 / 123 456
                </a><br />
                E-Mail:{" "}
                <a href="mailto:info@messta.de" className="text-black no-underline font-bold hover:text-[#444] transition-colors">
                  info@messta.de
                </a>
              </address>
            </div>

            {/* Link Columns */}
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <div className="text-[14px] font-[800] text-black uppercase tracking-[.08em] mb-4">{col.title}</div>
                <ul className="list-none">
                  {col.links.map((link) => (
                    <li key={link} className="mb-3">
                      <a href="#" className="text-[17px] font-bold text-black no-underline hover:text-[#444] transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-[#d1d5db] pt-5 flex justify-between items-center flex-wrap gap-4 max-md:flex-col max-md:items-start max-md:gap-3">
            <div className="text-[13px] text-black font-bold">© 2026 messta GmbH · Alle Rechte vorbehalten</div>
            <div className="flex gap-5 flex-wrap">
              {[
                { href: "/impressum",   label: "Impressum" },
                { href: "/datenschutz", label: "Datenschutz" },
                { href: "/agb",         label: "AGB" },
                { href: "#",            label: "Cookie-Einstellungen", action: () => showToast("Cookie-Einstellungen", "Öffnet…") },
                { href: "/widerruf",    label: "Widerrufsrecht" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={l.action ? (e) => { e.preventDefault(); l.action!(); } : undefined}
                  className="text-[17px] text-black no-underline font-bold hover:text-[#444] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </footer>

      {/* ── TOAST ──────────────────────────────────────────────────────── */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-[9999] bg-white border-[1.5px] border-[#e8edf2] rounded-2xl py-[13px] px-[17px] flex items-center gap-2.5 shadow-[0_8px_32px_rgba(0,0,0,.08)] max-w-[300px] transition-all duration-300 ${
          toastState.visible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"
        }`}
        style={{ transitionTimingFunction: toastState.visible ? "cubic-bezier(.34,1.56,.64,1)" : "ease" }}
      >
        <div>
          <div className="text-[14px] font-semibold text-[#1a1a1a]">{toastState.title}</div>
          <div className="text-[12px] text-[#767676] mt-[2px]">{toastState.sub}</div>
        </div>
      </div>

      {/* ── ONBOARDING OVERLAY ─────────────────────────────────────────── */}
      <OnboardingOverlay
        open={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onDashboard={openDashboard}
        showToast={showToast}
      />

      {/* ── DASHBOARD OVERLAY ──────────────────────────────────────────── */}
      <DashboardOverlay
        open={dashOpen}
        onClose={closeDashboard}
        showToast={showToast}
      />
    </>
  );
}