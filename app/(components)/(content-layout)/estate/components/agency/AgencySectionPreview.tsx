"use client";

import { MapPin, Phone, Mail, Clock, Building2, Wrench, Star, Users } from "lucide-react";

type Props = {
  sectionType: string;
  title:       string;
  subtitle:    string;
  settings:    Record<string, any>;
};

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border bg-white overflow-hidden shadow-sm">{children}</div>
);

const SectionLabel = ({ text }: { text: string }) => (
  <div className="bg-blue-50 border-b px-4 py-2 text-xs font-semibold text-blue-600 uppercase tracking-widest">
    Önizleme — {text}
  </div>
);

/* ── LOGO NAVIGATION ── */
function LogoPreview({ title, s }: { title: string; s: any }) {
  return (
    <Wrap>
      <SectionLabel text="Logo & Navigasyon" />
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <div className="flex items-center gap-3">
          {s.logoUrl
            ? <img src={s.logoUrl} alt="logo" className="h-10 object-contain" />
            : <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">L</div>
          }
          <div>
            <p className="font-bold text-sm">{title || "Ofis Adı"}</p>
            {s.tagline && <p className="text-xs text-muted-foreground">{s.tagline}</p>}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {s.phone && <span className="hidden sm:block">{s.phone}</span>}
          {s.ctaText && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium">
              {s.ctaText}
            </span>
          )}
        </div>
      </div>
    </Wrap>
  );
}

/* ── HERO ── */
function HeroPreview({ title, subtitle, s }: { title: string; subtitle: string; s: any }) {
  return (
    <Wrap>
      <SectionLabel text="Hero Bölümü" />
      <div
        className="relative min-h-[220px] flex items-center justify-center text-white text-center p-8"
        style={{
          background: s.backgroundImage
            ? `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)) center/cover, url('${s.backgroundImage}')`
            : "linear-gradient(135deg,#1e3a8a,#2563eb)",
        }}
      >
        <div className="space-y-3 max-w-lg">
          <h2 className="text-2xl font-extrabold">{s.heading || title || "Ana Başlık"}</h2>
          {(s.subheading || subtitle) && (
            <p className="text-sm text-white/80">{s.subheading || subtitle}</p>
          )}
          <div className="flex gap-2 justify-center flex-wrap pt-1">
            {s.ctaText && (
              <span className="bg-white text-blue-700 px-4 py-1.5 rounded-lg text-xs font-semibold">{s.ctaText}</span>
            )}
            {s.secondaryText && (
              <span className="border border-white text-white px-4 py-1.5 rounded-lg text-xs font-semibold">{s.secondaryText}</span>
            )}
          </div>
        </div>
      </div>
    </Wrap>
  );
}

/* ── ABOUT ── */
function AboutPreview({ title, s }: { title: string; s: any }) {
  const stats = [
    { label: "Yıl",      value: s.yearsActive  },
    { label: "Satış",    value: s.totalSales   },
    { label: "Danışman", value: s.totalAgents  },
    { label: "Şehir",    value: s.totalCities  },
  ].filter((st) => st.value);

  return (
    <Wrap>
      <SectionLabel text="Hakkımızda" />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {s.image && (
          <img src={s.image} alt="about" className="rounded-xl w-full h-40 object-cover" />
        )}
        <div className="space-y-3">
          <h3 className="text-xl font-bold">{title || "Hakkımızda"}</h3>
          {s.description && <p className="text-sm text-muted-foreground line-clamp-3">{s.description}</p>}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {stats.map(({ label, value }) => (
                <div key={label} className="text-center bg-blue-50 rounded-lg p-2">
                  <p className="text-lg font-extrabold text-blue-600">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Wrap>
  );
}

/* ── FEATURED PROPERTIES ── */
function FeaturedPreview({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Wrap>
      <SectionLabel text="Öne Çıkan Mülkler" />
      <div className="p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold">{title || "Öne Çıkan Mülkler"}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border overflow-hidden">
              <div className="bg-gray-100 h-28 flex items-center justify-center text-gray-400">
                <Building2 className="w-8 h-8" />
              </div>
              <div className="p-3 space-y-1">
                <p className="font-semibold text-sm">Örnek Mülk {i}</p>
                <p className="text-xs text-muted-foreground">İstanbul / Kadıköy</p>
                <p className="text-sm font-bold text-blue-600">₺ 2.500.000</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrap>
  );
}

/* ── SERVICES ── */
function ServicesPreview({ title, subtitle, s }: { title: string; subtitle: string; s: any }) {
  const services = [1, 2, 3, 4]
    .map((n) => ({ title: s[`service${n}Title`], desc: s[`service${n}Desc`] }))
    .filter((sv) => sv.title);

  return (
    <Wrap>
      <SectionLabel text="Hizmetler" />
      <div className="p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold">{title || "Hizmetler"}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.length > 0 ? services.map((sv, i) => (
            <div key={i} className="border rounded-xl p-4 space-y-1">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Wrench className="w-4 h-4 text-blue-600" />
              </div>
              <p className="font-semibold text-sm">{sv.title}</p>
              {sv.desc && <p className="text-xs text-muted-foreground line-clamp-2">{sv.desc}</p>}
            </div>
          )) : (
            <p className="text-sm text-muted-foreground col-span-2 text-center py-6">Hizmet bilgisi girilmedi.</p>
          )}
        </div>
      </div>
    </Wrap>
  );
}

/* ── TESTIMONIALS ── */
function TestimonialsPreview({ title, subtitle, s }: { title: string; subtitle: string; s: any }) {
  const refs = [1, 2, 3]
    .map((n) => ({ name: s[`ref${n}Name`], role: s[`ref${n}Role`], comment: s[`ref${n}Comment`], image: s[`ref${n}Image`] }))
    .filter((r) => r.name);

  return (
    <Wrap>
      <SectionLabel text="Referanslar" />
      <div className="p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold">{title || "Müşteri Görüşleri"}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {refs.length > 0 ? refs.map((r, i) => (
            <div key={i} className="border rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                {r.image
                  ? <img src={r.image} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                  : <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">{r.name[0]}</div>
                }
                <div>
                  <p className="font-semibold text-sm">{r.name}</p>
                  {r.role && <p className="text-xs text-muted-foreground">{r.role}</p>}
                </div>
              </div>
              {r.comment && (
                <p className="text-xs text-muted-foreground italic line-clamp-3">"{r.comment}"</p>
              )}
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          )) : (
            <p className="text-sm text-muted-foreground col-span-3 text-center py-6">Referans bilgisi girilmedi.</p>
          )}
        </div>
      </div>
    </Wrap>
  );
}

/* ── TEAM ── */
function TeamPreview({ title, subtitle, s }: { title: string; subtitle: string; s: any }) {
  const members = [1, 2, 3, 4]
    .map((n) => ({ name: s[`member${n}Name`], role: s[`member${n}Role`], image: s[`member${n}Image`], phone: s[`member${n}Phone`] }))
    .filter((m) => m.name);

  return (
    <Wrap>
      <SectionLabel text="Ekip" />
      <div className="p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold">{title || "Ekibimiz"}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {members.length > 0 ? members.map((m, i) => (
            <div key={i} className="border rounded-xl p-3 text-center space-y-1">
              {m.image
                ? <img src={m.image} alt={m.name} className="w-16 h-16 rounded-full object-cover mx-auto" />
                : <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl mx-auto">{m.name[0]}</div>
              }
              <p className="font-semibold text-sm">{m.name}</p>
              {m.role && <p className="text-xs text-muted-foreground">{m.role}</p>}
              {m.phone && <p className="text-xs text-blue-600">{m.phone}</p>}
            </div>
          )) : (
            <p className="text-sm text-muted-foreground col-span-4 text-center py-6">Ekip bilgisi girilmedi.</p>
          )}
        </div>
      </div>
    </Wrap>
  );
}

/* ── CONTACT ── */
function ContactPreview({ title, subtitle, s }: { title: string; subtitle: string; s: any }) {
  return (
    <Wrap>
      <SectionLabel text="İletişim" />
      <div className="p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold">{title || "İletişim"}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: Phone, label: "Telefon",    value: s.phone        },
            { icon: Mail,  label: "E-posta",    value: s.email        },
            { icon: MapPin,label: "Adres",      value: s.address      },
            { icon: Clock, label: "Çalışma",    value: s.workingHours },
          ].filter((c) => c.value).map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 border rounded-xl p-3">
              <Icon className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrap>
  );
}

/* ── FOOTER ── */
function FooterPreview({ title, s }: { title: string; s: any }) {
  const socials = ["instagram","facebook","twitter","linkedin","youtube"].filter((k) => s[k]);
  return (
    <Wrap>
      <SectionLabel text="Alt Bilgi" />
      <div className="bg-gray-900 text-white p-6 text-center space-y-3">
        <p className="font-bold">{title || "Ofis Adı"}</p>
        {s.description && <p className="text-gray-400 text-sm max-w-xs mx-auto">{s.description}</p>}
        {socials.length > 0 && (
          <div className="flex gap-3 justify-center">
            {socials.map((k) => (
              <span key={k} className="text-gray-400 text-xs capitalize hover:text-white">{k}</span>
            ))}
          </div>
        )}
        <p className="text-gray-500 text-xs">
          {s.copyright || `© ${new Date().getFullYear()} ${title || "Ofis Adı"}. Tüm hakları saklıdır.`}
        </p>
      </div>
    </Wrap>
  );
}

/* ── ANA PREVIEW BİLEŞENİ ── */
export default function AgencySectionPreview({ sectionType, title, subtitle, settings: s }: Props) {
  switch (sectionType) {
    case "LOGO_NAVIGATION":     return <LogoPreview         title={title} s={s} />;
    case "HERO":                return <HeroPreview         title={title} subtitle={subtitle} s={s} />;
    case "ABOUT":               return <AboutPreview        title={title} s={s} />;
    case "FEATURED_PROPERTIES": return <FeaturedPreview     title={title} subtitle={subtitle} />;
    case "SERVICES":            return <ServicesPreview     title={title} subtitle={subtitle} s={s} />;
    case "TESTIMONIALS":        return <TestimonialsPreview title={title} subtitle={subtitle} s={s} />;
    case "TEAM":                return <TeamPreview         title={title} subtitle={subtitle} s={s} />;
    case "CONTACT":             return <ContactPreview      title={title} subtitle={subtitle} s={s} />;
    case "FOOTER":              return <FooterPreview       title={title} s={s} />;
    default:                    return <div className="p-6 text-muted-foreground text-sm">Önizleme mevcut değil.</div>;
  }
}
