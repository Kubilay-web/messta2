"use client";

import { useState, useEffect } from "react";

const PROPERTIES = [
  { name: "Goethestraße 14",  addr: "35578 Wetzlar", we: "6 Wohneinheiten" },
  { name: "Schillerplatz 3",  addr: "35578 Wetzlar", we: "4 Wohneinheiten" },
  { name: "Lahnauenweg 28",   addr: "35578 Wetzlar", we: "8 Wohneinheiten" },
  { name: "Bahnhofstraße 7",  addr: "35578 Wetzlar", we: "3 Wohneinheiten" },
  { name: "Altstadtgasse 12", addr: "35578 Wetzlar", we: "2 Wohneinheiten" },
];

/* shared button styles */
const BTN_NEXT = "flex items-center gap-2 bg-[#111] text-white border-none px-7 py-[14px] rounded-full text-[14px] font-[700] cursor-pointer hover:bg-[#1D9E75] transition-colors";
const BTN_BACK = "flex items-center gap-[6px] bg-transparent border-none text-[#555] text-[14px] font-[700] cursor-pointer py-3 hover:text-[#111] transition-colors";

type Props = {
  open: boolean;
  onClose: () => void;
  onDashboard: () => void;
  showToast: (t: string, s: string) => void;
};

export default function OnboardingOverlay({ open, onClose, onDashboard, showToast }: Props) {
  const [step, setStep]               = useState(1);
  const [role, setRole]               = useState<"owner" | "manager">("owner");
  const [checked, setChecked]         = useState(PROPERTIES.map(() => true));

  /* body scroll lock */
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const checkedCount = checked.filter(Boolean).length;
  const toggleProp   = (i: number) => setChecked(p => p.map((v, j) => j === i ? !v : v));
  const toggleAll    = () => { const all = checked.every(Boolean); setChecked(checked.map(() => !all)); };
  const pct          = Math.round((step / 5) * 100);

  const ArrowRight = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
  const ArrowLeft = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
  const Check = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" width="16" height="16">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <div
      className="fixed inset-0 z-[9999] bg-white overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onbTitle"
    >
      {/* close button */}
      <button
        onClick={onClose}
        aria-label="Schließen"
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#f5f5f5] border-none cursor-pointer flex items-center justify-center hover:bg-[#e8e8e8] transition-colors z-10"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" width="18" height="18">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="max-w-[720px] mx-auto min-h-screen flex flex-col">

        {/* progress */}
        {step < 5 && (
          <div className="px-8 pt-8 pb-4 max-md:px-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[12px] text-[#888] font-[700]">Schritt {step} von 5</span>
              <span className="text-[12px] text-[#888]">{pct}%</span>
            </div>
            <div className="h-1 bg-[#f0f0f0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1D9E75] rounded-full transition-all duration-400"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {/* ── STEP 1: Consent ── */}
        {step === 1 && (
          <div className="px-8 py-12 max-md:px-5 max-md:py-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#1D9E75]" />
              <span className="text-[12px] font-[700] text-[#1D9E75] uppercase tracking-[.12em]">Bevor wir loslegen</span>
            </div>
            <h1 id="onbTitle" className="text-[36px] font-[800] text-[#111] mb-4 leading-[1.2] tracking-[-0.02em] max-md:text-[28px]">
              Kurz zu Ihrem Datenschutz.
            </h1>
            <p className="text-[16px] text-[#555] leading-[1.6] mb-8 max-w-[540px]">
              Sie sind seit 2019 unser Kunde — wir kennen Ihre Häuser. Damit wir diese Daten auch im neuen Portal nutzen dürfen, brauchen wir Ihr Einverständnis.
            </p>
            <div className="bg-[#fafafa] border border-[#e8edf2] rounded-[12px] p-6 mb-6">
              {[
                { b: "Was wir nutzen:", t: "Ihre Adressen, Wohnungs-Anzahl und Eigentümer-Daten.", n: "Keine Verbrauchsdaten, keine Mieter-Daten." },
                { b: "Wofür:", t: "Damit Sie Ihre Häuser verwalten können, ohne sie neu einzutippen.", n: "Wir verkaufen niemals Daten an Dritte." },
                { b: "Ihr Recht:", t: "Sie können diese Verbindung jederzeit widerrufen — ein Klick.", n: "Ihre Heizkostenabrechnung läuft davon unberührt weiter." },
              ].map((item) => (
                <div key={item.b} className="flex gap-4 py-5 border-b border-[#e8edf2] last:border-none last:pb-0 first:pt-0">
                  <div className="w-7 h-7 rounded-[6px] bg-[#d1f5e9] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#085041" strokeWidth="3" strokeLinecap="round" width="16" height="16">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[15px] text-[#111] leading-[1.5]"><strong>{item.b}</strong> {item.t}</div>
                    <div className="text-[13px] text-[#888] mt-[6px]">{item.n}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-[#888] mb-8 leading-[1.7]">
              Speicherort: Deutschland (Frankfurt). Verantwortlich: Messtech Mittelhessen GmbH.<br />
              Mehr in unserer{" "}
              <button onClick={() => showToast("Datenschutz","Öffnet…")} className="text-[#1D9E75] underline bg-transparent border-none cursor-pointer p-0 text-[12px]">Datenschutzerklärung</button>
              {" "}und den{" "}
              <button onClick={() => showToast("AGB","Öffnet…")} className="text-[#1D9E75] underline bg-transparent border-none cursor-pointer p-0 text-[12px]">AGB</button>.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={onClose} className="bg-transparent border-none text-[#555] text-[14px] font-[700] cursor-pointer py-3 hover:text-[#111] transition-colors">
                Nein, manuell starten
              </button>
              <button onClick={() => setStep(2)} className={BTN_NEXT}>Ja, einverstanden <ArrowRight /></button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Welcome ── */}
        {step === 2 && (
          <div className="px-8 py-12 max-md:px-5 max-md:py-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#1D9E75]" />
              <span className="text-[12px] font-[700] text-[#1D9E75] uppercase tracking-[.12em]">Willkommen</span>
            </div>
            <h1 className="text-[clamp(28px,5vw,44px)] font-[800] text-[#111] mb-4 leading-[1.15] tracking-[-0.02em]">
              Schön, dass Sie da sind, <span className="text-[#1D9E75]">Herr Köhler</span>.
            </h1>
            <p className="text-[17px] text-[#555] leading-[1.6] mb-10 max-w-[540px]">
              Wir richten alles für Sie ein. Sie müssen nichts eintippen — wir kennen Ihre Häuser bereits.
            </p>
            <div className="flex gap-[10px] flex-wrap mb-10">
              {["Heizkostenabrechnung seit 2019","5 Immobilien","23 Wohneinheiten"].map(p => (
                <div key={p} className="bg-[#d1f5e9] rounded-full px-[18px] py-[10px] flex items-center gap-2">
                  <Check />
                  <span className="text-[14px] text-[#085041] font-[700]">{p}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setStep(1)} className={BTN_BACK}><ArrowLeft /> Zurück</button>
              <button onClick={() => setStep(3)} className={BTN_NEXT}>Los geht&apos;s <ArrowRight /></button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Role ── */}
        {step === 3 && (
          <div className="px-8 py-12 max-md:px-5 max-md:py-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#1D9E75]" />
              <span className="text-[12px] font-[700] text-[#1D9E75] uppercase tracking-[.12em]">Ihre Rolle</span>
            </div>
            <h1 className="text-[36px] font-[800] text-[#111] mb-3 leading-[1.2] tracking-[-0.02em] max-md:text-[28px]">Wie nutzen Sie messta?</h1>
            <p className="text-[16px] text-[#555] leading-[1.6] mb-10">Bitte wählen Sie Ihre Rolle. Sie können das später ändern.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {(["owner","manager"] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`border rounded-[16px] p-[28px_24px] text-left cursor-pointer relative transition-all ${role === r ? "border-2 border-[#1D9E75]" : "border border-[#e8edf2] bg-white hover:border-[#bbb]"}`}
                >
                  {role === r && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#1D9E75] flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" width="14" height="14">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center mb-5 ${role === r ? "bg-[#d1f5e9]" : "bg-[#f5f5f5]"}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={role === r ? "#085041" : "#555"} strokeWidth="2" strokeLinecap="round" width="24" height="24">
                      {r === "owner"
                        ? <><circle cx="8" cy="15" r="4"/><line x1="10.85" y1="12.15" x2="19" y2="4"/></>
                        : <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>
                      }
                    </svg>
                  </div>
                  <div className="text-[17px] font-[800] text-[#111] mb-2">{r === "owner" ? "Als Eigentümer" : "Als Verwalter"}</div>
                  <div className="text-[13px] text-[#555] leading-[1.5]">
                    {r === "owner"
                      ? "Sie besitzen die Häuser und vermieten selbst. Verbräuche, Abrechnungen und Mieterverwaltung."
                      : "Sie verwalten Häuser für andere Eigentümer und können für alle Mandanten abrechnen."
                    }
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setStep(2)} className={BTN_BACK}><ArrowLeft /> Zurück</button>
              <button onClick={() => setStep(4)} className={BTN_NEXT}>Weiter <ArrowRight /></button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Properties ── */}
        {step === 4 && (
          <div className="px-8 py-12 max-md:px-5 max-md:py-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#1D9E75]" />
              <span className="text-[12px] font-[700] text-[#1D9E75] uppercase tracking-[.12em]">Ihre Häuser</span>
            </div>
            <h1 className="text-[36px] font-[800] text-[#111] mb-3 leading-[1.2] tracking-[-0.02em] max-md:text-[28px]">Wir kennen diese 5 Häuser.</h1>
            <p className="text-[16px] text-[#555] leading-[1.6] mb-6">Wählen Sie, welche Häuser Sie ins Portal übernehmen möchten.</p>
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#e8edf2]">
              <span className="text-[14px] text-[#555]"><strong className="text-[#111]">{checkedCount} von {PROPERTIES.length}</strong> ausgewählt</span>
              <button onClick={toggleAll} className="text-[#1D9E75] bg-transparent border-none text-[13px] font-[700] cursor-pointer">
                {checked.every(Boolean) ? "Alle abwählen" : "Alle auswählen"}
              </button>
            </div>
            <div className="flex flex-col gap-[10px] mb-8">
              {PROPERTIES.map((prop, i) => (
                <button
                  key={prop.name}
                  onClick={() => toggleProp(i)}
                  className={`border rounded-[12px] p-[16px_20px] flex items-center gap-4 cursor-pointer text-left transition-colors ${checked[i] ? "border-[#1D9E75]" : "border-[#e8edf2] bg-white hover:border-[#bbb]"}`}
                >
                  <div className={`w-6 h-6 rounded-[6px] flex items-center justify-center flex-shrink-0 transition-colors ${checked[i] ? "bg-[#1D9E75]" : "bg-[#f0f0f0]"}`}>
                    {checked[i] && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" width="14" height="14">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-[8px] bg-[#d1f5e9] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" width="20" height="20">
                      <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="9" y1="22" x2="9" y2="18" /><line x1="15" y1="22" x2="15" y2="18" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-[800] text-[#111]">{prop.name}</div>
                    <div className="text-[13px] text-[#888] mt-[2px]">{prop.addr}</div>
                  </div>
                  <div className="text-[13px] text-[#555] flex-shrink-0">{prop.we}</div>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setStep(3)} className={BTN_BACK}><ArrowLeft /> Zurück</button>
              <button
                onClick={() => setStep(5)}
                disabled={checkedCount === 0}
                className={`${BTN_NEXT} disabled:bg-[#ccc] disabled:cursor-not-allowed`}
              >
                {checkedCount} {checkedCount === 1 ? "Haus" : "Häuser"} übernehmen <ArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 5: Success ── */}
        {step === 5 && (
          <div className="px-8 py-16 text-center max-md:px-5 flex flex-col items-center">
            <div className="w-[88px] h-[88px] rounded-full bg-[#d1f5e9] flex items-center justify-center mx-auto mb-8">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round" width="44" height="44">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#1D9E75]" />
              <span className="text-[12px] font-[700] text-[#1D9E75] uppercase tracking-[.12em]">Alles fertig</span>
              <div className="w-8 h-[2px] bg-[#1D9E75]" />
            </div>
            <h1 className="text-[clamp(28px,5vw,44px)] font-[800] text-[#111] mb-5 leading-[1.15] tracking-[-0.02em]">
              Herzlich willkommen bei messta.
            </h1>
            <p className="text-[17px] text-[#555] leading-[1.6] max-w-[480px] mx-auto mb-12">
              Ihr Portal ist eingerichtet. Sie können jetzt Zählerstände erfassen, Abrechnungen erstellen und Ihre Mieter verwalten.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-[540px] mx-auto mb-12 w-full">
              {[{n:"5",l:"Immobilien"},{n:"23",l:"Wohneinheiten"},{n:"2019",l:"Kunde seit"}].map(s => (
                <div key={s.l} className="bg-[#fafafa] rounded-[12px] py-5 px-4 text-center">
                  <div className="text-[28px] font-[800] text-[#1D9E75] leading-[1]">{s.n}</div>
                  <div className="text-[12px] text-[#555] mt-[6px]">{s.l}</div>
                </div>
              ))}
            </div>
            <button
              onClick={onDashboard}
              className="inline-flex items-center gap-[10px] bg-[#111] text-white border-none px-9 py-[18px] rounded-full text-[16px] font-[700] cursor-pointer hover:bg-[#1D9E75] transition-colors"
            >
              Zum Portal
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="18" height="18">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <p className="text-[13px] text-[#888] mt-8">
              Tipp: In den nächsten Tagen senden wir Ihnen eine E-Mail mit den drei wichtigsten Funktionen.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
