"use client";

/* ─── types ─────────────────────────────────────────────────────────────── */
type Feat = { name: string; desc: string; tag: string; tT: "std" | "usp" | "gap"; p: string };
type Cat  = { num: string; title: string; sub: string; feats: Feat[] };

/* ─── data ───────────────────────────────────────────────────────────────── */
const STATS = [
  { num: "30+",      lbl: "Funktionen" },
  { num: "5.000+",   lbl: "Wohneinheiten" },
  { num: "Seit 2003",lbl: "Branchenerfahrung" },
  { num: "DE/AT/CH", lbl: "DSGVO-konform" },
];

const CATS: Cat[] = [
  {
    num:"1", title:"Heizkosten & Abrechnung", sub:"Rechtskonform nach HKVO, CO2KostAufG und EED",
    feats:[
      { name:"Heizkostenabrechnung HKVO",   desc:"Rechtssichere Verteilung, automatische Warmwasser-Trennung.",            tag:"Standard",       tT:"std", p:"M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4 4 0 1 0 5 0z" },
      { name:"CO₂-Aufteilung BEHG",         desc:"Automatisches 10-Stufen-Modell (Pflicht seit 2023).",                    tag:"Standard",       tT:"std", p:"M3 11l18-5v12L3 14v-3z" },
      { name:"PDF-Bescheide",               desc:"Rechtssichere Mieter-Bescheide auf Knopfdruck. Vorlagen-Editor.",        tag:"Standard",       tT:"std", p:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" },
      { name:"Monatliche Verbrauchsinfo",   desc:"EED-konforme UVI — automatisch per E-Mail oder im Portal.",              tag:"Standard",       tT:"std", p:"M3 3v18h18M9 17V9M14 17v-5M19 17V7" },
      { name:"Zählerverwaltung",            desc:"HKV, Wärme- und Wasserzähler, Eichgültigkeit, Austausch-Historie.",     tag:"Standard",       tT:"std", p:"M3 3h18v18H3z" },
      { name:"Mieterwechsel-Assistent",     desc:"Tagesgenau anteilige Abrechnung bei Aus- und Einzug.",                  tag:"Standard",       tT:"std", p:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" },
    ],
  },
  {
    num:"2", title:"Mieter & Verwaltung", sub:"Vom Mietvertrag bis zur Reparatur — alles digital",
    feats:[
      { name:"Mieter-Stammdaten",       desc:"Mieter anlegen, Einzugs- und Auszugsdaten, Kontaktinformationen.",          tag:"Standard",       tT:"std", p:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
      { name:"Digitale Mietverträge",   desc:"Vorlagen, elektronische Unterschrift, automatische Verlängerung.",          tag:"Standard",       tT:"std", p:"M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12s4.03-9 9-9" },
      { name:"Ticket-System",           desc:"Mieter melden Defekte, Handwerker werden direkt beauftragt.",               tag:"Marktlücke DE",  tT:"gap", p:"M22 12h-4l-3 9L9 3l-3 9H2" },
      { name:"Mahnwesen automatisch",   desc:"Mietrückstände erkennen, Mahnstufen, gerichtsfeste Vorlagen.",              tag:"Standard",       tT:"std", p:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" },
      { name:"Dokumenten-Archiv",       desc:"Verträge, Belege, Korrespondenz — sicher gespeichert, auffindbar.",         tag:"Standard",       tT:"std", p:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" },
      { name:"WEG-Verwaltung",          desc:"Eigentümerversammlungen, Beschluss-Sammlungen, Hausgeld-Abrechnung.",       tag:"Standard",       tT:"std", p:"M3 4h18v18H3zM16 2v4M8 2v4M3 10h18" },
    ],
  },
  {
    num:"3", title:"Finanzen & Steuer", sub:"Banking, Buchhaltung und Förderungen vernetzt",
    feats:[
      { name:"Banking-Anbindung",           desc:"Mieteingänge automatisch erkennen, Zahlungen zuordnen.",                tag:"Standard",       tT:"std", p:"M2 5h20v14H2zM2 10h20" },
      { name:"Steuer-Export DATEV/EÜR",     desc:"EÜR pro Liegenschaft. Direkt an den Steuerberater.",                   tag:"Standard",       tT:"std", p:"M9 11H1l8-8 8 8h-8v8" },
      { name:"KfW-Förderungen verwalten",   desc:"Förderanträge stellen, Status verfolgen, Bescheide archivieren.",       tag:"Marktlücke",     tT:"gap", p:"M12 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" },
      { name:"Versicherungs-Übersicht",     desc:"Gebäude-, Hausrat-, Haftpflicht. Erinnerung, Beleg-Archiv.",           tag:"Standard",       tT:"std", p:"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
      { name:"Rendite-Dashboard",           desc:"Cashflow pro Objekt, Auslastung, Marktmiete, Steuer-Vorschau.",         tag:"Standard",       tT:"std", p:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
      { name:"Mietpreis-Check",             desc:"Mietspiegel-Vergleich, Mietpreisbremse, Mieterhöhungs-Rechner.",       tag:"Standard",       tT:"std", p:"M20 7l-3-3-3 3M17 4v8a4 4 0 0 1-8 0V4M20 21H4" },
    ],
  },
  {
    num:"4", title:"Community & Kommunikation", sub:"Das hat kein anderer Anbieter",
    feats:[
      { name:"Vermieter-Community",     desc:"Klarnamen-Feed mit verifizierten Eigentümern. Echter Austausch.",           tag:"messta exklusiv",tT:"usp", p:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
      { name:"Themen-Gruppen",          desc:"Mietrecht, Steuer, Energie, Renovierung. Moderierte Bereiche.",             tag:"messta exklusiv",tT:"usp", p:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
      { name:"Frage & Antwort",         desc:"Reddit-Style mit Klarnamen — keine Trolle, verifizierteMitglieder.",       tag:"messta exklusiv",tT:"usp", p:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" },
      { name:"News & Trends",           desc:"Gesetzes-Änderungen, BGH-Urteile, Marktentwicklung.",                      tag:"messta exklusiv",tT:"usp", p:"M22 12h-4l-3 9L9 3l-3 9H2" },
      { name:"Direkt-Chat mit Mieter",  desc:"Alle Nachrichten dokumentiert, durchsuchbar, sicher.",                     tag:"Keine DE-Lösung",tT:"gap", p:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" },
      { name:"Handwerker-Marketplace",  desc:"Verifizierte Handwerker buchen — über Plentific-Partnerschaft.",           tag:"messta exklusiv",tT:"usp", p:"M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01 9 11.01" },
    ],
  },
];

const COMPARE: [string,string,string,string,string,string][] = [
  ["Heizkostenabrechnung",     "✓","✓","—","—","—"],
  ["Mieterverwaltung",         "✓","—","✓","✓","✓"],
  ["Ticket-System",            "✓","—","—","~","✓"],
  ["Finanz-Dashboard",         "✓","—","✓","✓","✓"],
  ["Banking-API",              "✓","—","~","—","✓"],
  ["Community-Feed",           "✓","—","—","—","—"],
  ["Klarnamen-Verifikation",   "✓","—","—","—","—"],
  ["Themen-Gruppen + Q&A",     "✓","—","—","—","—"],
  ["Mieter-App (Mobile)",      "✓","Web","—","—","✓"],
  ["Handwerker-Marketplace",   "✓","—","—","—","✓"],
  ["KfW-Förderungen",          "✓","—","—","—","—"],
  ["DSGVO + Hosting DE",       "✓","✓","✓","✓","US"],
];

const USPS = [
  { name:"Klarnamen-Community", desc:"Jedes Mitglied ist verifiziert. Keine Trolle — echter Austausch zwischen Vermietern.",  light:false },
  { name:"Alles in einer Plattform", desc:"Heizkosten, Verwaltung, Finanzen, Community. Ein Login, ein Datenbestand.",       light:true  },
  { name:"Datensouveränität",   desc:"Hosting ausschließlich Frankfurt. DSGVO ab Tag eins. Daten gehören Ihnen.",            light:false },
  { name:"Lokal in Mittelhessen",desc:"Persönlicher Ansprechpartner aus Wetzlar — in 24h vor Ort.",                         light:true  },
];

/* ─── helpers ────────────────────────────────────────────────────────────── */
function CmpCell({ v }: { v: string }) {
  if (v === "✓") return <span className="text-[#1D9E75] text-xl font-bold">✓</span>;
  if (v === "—") return <span className="text-gray-300 text-xl">—</span>;
  if (v === "~") return <span className="text-amber-400 text-xl font-bold">~</span>;
  return <span className="text-gray-500 text-sm font-semibold">{v}</span>;
}

const TAG_CLS = {
  std: "bg-[#f0f0f0] text-[#666]",
  usp: "bg-[#1D9E75] text-white",
  gap: "bg-[#fef3c7] text-[#92400e]",
};

/* ─── component ──────────────────────────────────────────────────────────── */
export default function OwnerSection({ showToast }: { showToast: (t: string, s: string) => void }) {
  return (
    <section className="py-20 px-8 bg-[#fafafa] border-t border-[#e8edf2] max-md:px-4 max-md:py-10" id="fuer-eigentuemer">
      <div className="max-w-[1160px] mx-auto">

        {/* ── HERO ── */}
        <div className="text-center mb-16 max-md:mb-10">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-[#1D9E75]" />
            <span className="text-[16px] font-[800] text-[#1D9E75] uppercase tracking-[.12em]">Für Eigentümer &amp; Verwalter</span>
            <div className="w-8 h-[2px] bg-[#1D9E75]" />
          </div>
          <h2 className="text-[clamp(28px,4vw,47px)] font-[800] text-[#111] leading-[1.15] tracking-[-0.025em] mb-5 max-w-[860px] mx-auto">
            Alles für Ihre Immobilien —{" "}
            <span className="text-[#1D9E75]">vereint in einer Plattform</span>.
          </h2>
          <p className="text-[17px] sm:text-[21px] text-[#555] leading-[1.6] max-w-[680px] mx-auto mb-9">
            Heizkostenabrechnung, Mieterverwaltung, Finanzen, Community. Was sonst fünf Tools brauchen, finden Sie bei messta in einer Anwendung.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[14px] max-w-[780px] mx-auto">
            {STATS.map(s => (
              <div key={s.lbl} className="bg-white border border-[#e8edf2] rounded-[14px] py-[22px] px-4 text-center">
                <div className="text-[33px] font-[800] text-[#1D9E75] leading-[1]">{s.num}</div>
                <div className="text-[15px] text-[#666] mt-2 font-[600]">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CATEGORIES ── */}
        {CATS.map(cat => (
          <div key={cat.num} className="mb-[72px] max-md:mb-10">
            <div className="flex items-center gap-[14px] mb-7">
              <div className="w-11 h-11 rounded-[12px] bg-[#d1f5e9] text-[#085041] flex items-center justify-center text-[23px] font-[800] flex-shrink-0">
                {cat.num}
              </div>
              <div>
                <div className="text-[27px] font-[800] text-[#111] tracking-[-0.02em] max-md:text-[20px]">{cat.title}</div>
                <div className="text-[17px] text-[#666] mt-[2px] max-md:text-[14px]">{cat.sub}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
              {cat.feats.map(f => (
                <div key={f.name} className="bg-white border border-[#e8edf2] rounded-[14px] p-[22px_20px] transition-colors duration-200 hover:border-[#1D9E75]">
                  <div className="w-10 h-10 rounded-[10px] bg-[#d1f5e9] flex items-center justify-center mb-[14px]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                      <path d={f.p} />
                    </svg>
                  </div>
                  <div className="text-[19px] font-[800] text-[#111] mb-[6px]">{f.name}</div>
                  <div className="text-[15px] text-[#555] leading-[1.5] mb-3">{f.desc}</div>
                  <span className={`inline-block text-[14px] font-[700] px-[9px] py-[3px] rounded-[6px] ${TAG_CLS[f.tT]}`}>{f.tag}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ── COMPARISON TABLE ── */}
        <div className="bg-white border border-[#e8edf2] rounded-[20px] p-[48px_40px] mb-[72px] max-md:p-[24px_16px] max-md:mb-10">
          <h3 className="text-[clamp(22px,3vw,31px)] font-[800] text-[#111] text-center tracking-[-0.02em] mb-2">messta im Vergleich</h3>
          <p className="text-[16px] sm:text-[18px] text-[#666] text-center mb-8">Eine Plattform, die alles kann — statt fünf Tools.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-[16px] font-[700] text-[#666] px-2 py-[14px] border-b-2 border-[#e8edf2]">Funktion</th>
                  <th className="text-center text-[16px] font-[800] text-[#085041] px-2 py-[14px] border-b-2 border-[#e8edf2] bg-[#d1f5e9] rounded-t-[8px]">messta</th>
                  {["Casameta","Vermietet.de","ImmoCloud","AppFolio"].map(h => (
                    <th key={h} className="text-center text-[16px] font-[800] text-[#111] px-2 py-[14px] border-b-2 border-[#e8edf2]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([feat, m, c, v, i, a]) => (
                  <tr key={feat}>
                    <td className="text-left text-[15px] font-[700] text-[#111] px-2 py-[14px] border-b border-[#f0f0f0]">{feat}</td>
                    <td className="text-center px-2 py-[14px] border-b border-[#f0f0f0] bg-[#f0fdf8]"><CmpCell v={m} /></td>
                    <td className="text-center px-2 py-[14px] border-b border-[#f0f0f0]"><CmpCell v={c} /></td>
                    <td className="text-center px-2 py-[14px] border-b border-[#f0f0f0]"><CmpCell v={v} /></td>
                    <td className="text-center px-2 py-[14px] border-b border-[#f0f0f0]"><CmpCell v={i} /></td>
                    <td className="text-center px-2 py-[14px] border-b border-[#f0f0f0]"><CmpCell v={a} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── USPs ── */}
        <div className="mb-[72px] max-md:mb-10">
          <h3 className="text-[clamp(24px,3vw,35px)] font-[800] text-[#111] text-center tracking-[-0.02em] mb-3">Was uns besser macht</h3>
          <p className="text-[17px] sm:text-[19px] text-[#666] text-center mb-10">Vier Gründe, warum 5.000+ Eigentümer messta wählen</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
            {USPS.map(u => (
              <div key={u.name} className={`rounded-[18px] p-[32px_28px] ${u.light ? "bg-[#d1f5e9] text-[#085041]" : "bg-[#085041] text-white"}`}>
                <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center mb-5 ${u.light ? "bg-[#1D9E75]" : "bg-white/15"}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className={`text-[23px] font-[800] mb-[10px] leading-[1.3] ${u.light ? "text-[#085041]" : "text-white"}`}>{u.name}</div>
                <div className={`text-[17px] leading-[1.6] ${u.light ? "text-[#085041]/90" : "text-white/95"}`}>{u.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="bg-[#1D9E75] rounded-[24px] p-[56px_48px] text-center text-white max-md:p-[32px_20px]">
          <h3 className="text-[clamp(24px,3vw,35px)] font-[800] tracking-[-0.02em] mb-4 leading-[1.2]">
            Bereit, alles in einer Plattform zu haben?
          </h3>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] opacity-95 max-w-[540px] mx-auto mb-7">
            30 Tage kostenlos testen. Keine Kreditkarte. Migration aus Ihrem aktuellen System inklusive.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => showToast("Kostenlos testen", "Anmeldung wird vorbereitet…")}
              className="bg-white text-[#1D9E75] border-none px-8 py-[16px] rounded-full text-[18px] font-[800] cursor-pointer hover:bg-[#f0f0f0] transition-colors"
            >
              30 Tage kostenlos testen
            </button>
            <button
              onClick={() => showToast("Demo", "Termin wird vereinbart…")}
              className="bg-transparent text-white border-2 border-white/40 px-[30px] py-[14px] rounded-full text-[18px] font-[800] cursor-pointer hover:bg-white/10 transition-colors"
            >
              Demo vereinbaren
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
