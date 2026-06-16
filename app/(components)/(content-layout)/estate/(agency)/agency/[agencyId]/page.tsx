import { getAgencyByIdOrSlug } from "../../../actions/agencies";
import { getAllAgencySections } from "../../../actions/agency-site";
import { getFeaturedListings } from "../../../actions/listings";
import { getPublicGalleryImages } from "../../../actions/agency-gallery";
import { getPublicAgencyNews } from "../../../actions/agency-news";
import { getPublicAgencyEvents } from "../../../actions/agency-events";
import { notFound } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { MapPin, Phone, Mail, Clock, Star, Building2, Users, Home, Quote, ArrowRight, Images, Newspaper, CalendarDays } from "lucide-react";
import Link from "next/link";

const listingTypeLabel: Record<string, string> = {
  SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem",
};

const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Müstakil Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

function getSettings(sections: any[], type: string): Record<string, any> {
  const s = sections.find((s) => s.type === type);
  return (s?.settings as Record<string, any>) ?? {};
}

function isActive(sections: any[], type: string): boolean {
  return sections.find((s) => s.type === type)?.isActive ?? false;
}

export default async function AgencyPublicPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  const agency = await getAgencyByIdOrSlug(agencyId);
  const [sections] = await Promise.all([
    agency ? getAllAgencySections(agency.id) : Promise.resolve([]),
  ]);

  if (!agency) return notFound();

  if (!agency.siteEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-center p-8">
        <Building2 className="w-12 h-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Site Henüz Yayında Değil</h1>
        <p className="text-muted-foreground max-w-sm">
          Bu emlak ofisinin web sitesi şu anda yapım aşamasında.
        </p>
      </div>
    );
  }

  const logo    = getSettings(sections, "LOGO_NAVIGATION");
  const hero    = getSettings(sections, "HERO");
  const about   = getSettings(sections, "ABOUT");
  const feat    = getSettings(sections, "FEATURED_PROPERTIES");
  const svc     = getSettings(sections, "SERVICES");
  const team    = getSettings(sections, "TEAM");
  const test    = getSettings(sections, "TESTIMONIALS");
  const contact = getSettings(sections, "CONTACT");
  const footer  = getSettings(sections, "FOOTER");

  const services = [1, 2, 3, 4]
    .map((n) => ({ title: svc[`service${n}Title`], desc: svc[`service${n}Desc`] }))
    .filter((s) => s.title);

  const teamMembers = [1, 2, 3, 4]
    .map((n) => ({
      name:  team[`member${n}Name`],
      role:  team[`member${n}Role`],
      image: team[`member${n}Image`],
      phone: team[`member${n}Phone`],
    }))
    .filter((m) => m.name);

  const testimonials = [1, 2, 3]
    .map((n) => ({
      name:    test[`ref${n}Name`],
      role:    test[`ref${n}Role`],
      image:   test[`ref${n}Image`],
      comment: test[`ref${n}Comment`],
    }))
    .filter((t) => t.name && t.comment);

  const [featuredListings, galleryImages, newsItems, events] = await Promise.all([
    isActive(sections, "FEATURED_PROPERTIES")
      ? getFeaturedListings(agency.id, {
          count:      Number(feat.count) || 6,
          filterType: feat.filterType,
        })
      : Promise.resolve([]),
    getPublicGalleryImages(agency.id),
    getPublicAgencyNews(agency.id),
    getPublicAgencyEvents(agency.id),
  ]);

  const fmtEventDate = (d: Date | string) =>
    new Date(d).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">

      {/* ── HEADER ── */}
      <header className="top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {logo.logoUrl && (
              <img src={logo.logoUrl} alt={agency.name} className="h-10 object-contain" />
            )}
            <div>
              <p className="font-bold text-lg">{agency.name}</p>
              {logo.tagline && <p className="text-xs text-muted-foreground">{logo.tagline}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {logo.phone && (
              <a href={`tel:${logo.phone}`} className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-600">
                <Phone className="w-3.5 h-3.5" />{logo.phone}
              </a>
            )}
            {logo.ctaText && logo.ctaLink && (
              <Button asChild size="sm">
                <Link href={logo.ctaLink}>{logo.ctaText}</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      {isActive(sections, "HERO") && (
        <section
          className="relative min-h-[480px] flex items-center justify-center text-white text-center px-4"
          style={{
            background: hero.backgroundImage
              ? `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)) center/cover, url('${hero.backgroundImage}')`
              : "linear-gradient(135deg,#1e3a8a,#2563eb)",
          }}
        >
          <div className="max-w-3xl space-y-5">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              {hero.heading || agency.name}
            </h1>
            {hero.subheading && (
              <p className="text-base sm:text-xl text-white/85">{hero.subheading}</p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {hero.ctaText && hero.ctaLink && (
                <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  <Link href={hero.ctaLink}>{hero.ctaText}</Link>
                </Button>
              )}
              {hero.secondaryText && hero.secondaryLink && (
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  <Link href={hero.secondaryLink}>{hero.secondaryText}</Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT ── */}
      {isActive(sections, "ABOUT") && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {about.image && (
              <img src={about.image} alt="Hakkımızda" className="rounded-2xl w-full object-cover max-h-80" />
            )}
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl font-bold">
                {sections.find((s) => s.type === "ABOUT")?.title || "Hakkımızda"}
              </h2>
              {about.description && (
                <p className="text-muted-foreground leading-relaxed">{about.description}</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {[
                  { label: "Yıl",      value: about.yearsActive  },
                  { label: "Satış",    value: about.totalSales   },
                  { label: "Danışman", value: about.totalAgents  },
                  { label: "Şehir",    value: about.totalCities  },
                ].filter((s) => s.value).map(({ label, value }) => (
                  <div key={label} className="text-center p-3 bg-white rounded-xl border">
                    <p className="text-2xl font-extrabold text-blue-600">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              {about.ctaText && about.ctaLink && (
                <Button asChild><Link href={about.ctaLink}>{about.ctaText}</Link></Button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── ÖNE ÇIKAN MÜLKLER ── */}
      {isActive(sections, "FEATURED_PROPERTIES") && featuredListings.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
              {sections.find((s) => s.type === "FEATURED_PROPERTIES")?.title || "Öne Çıkan Mülkler"}
            </h2>
            {sections.find((s) => s.type === "FEATURED_PROPERTIES")?.subtitle && (
              <p className="text-center text-muted-foreground mb-10">
                {sections.find((s) => s.type === "FEATURED_PROPERTIES")?.subtitle}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {featuredListings.map((l) => {
                const p     = l.property;
                const cover = p?.images?.[0]?.url;
                return (
                  <Link key={l.id} href={`/estate/agency/${agencyId}/ilanlar/${l.id}`} className="border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col bg-white">
                    <div className="relative h-48 w-full bg-gray-100">
                      {cover ? (
                        <img src={cover} alt={l.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Home className="w-10 h-10 text-gray-300" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        {listingTypeLabel[l.listingType] ?? l.listingType}
                      </span>
                    </div>
                    <div className="p-5 space-y-2 flex-1 flex flex-col">
                      <h3 className="font-bold line-clamp-2">{l.title}</h3>
                      {p && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          {p.neighborhood && `${p.neighborhood}, `}{p.district}, {p.city}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {p?.propertyType && <span className="bg-gray-100 px-2 py-0.5 rounded">{propertyTypeLabel[p.propertyType] ?? p.propertyType}</span>}
                        {p?.roomCount && <span className="bg-gray-100 px-2 py-0.5 rounded">{p.roomCount}</span>}
                        {p?.grossArea && <span className="bg-gray-100 px-2 py-0.5 rounded">{p.grossArea} m²</span>}
                      </div>
                      <p className="text-xl font-extrabold text-blue-600 mt-auto pt-2">
                        {l.askingPrice.toLocaleString("tr-TR")} {l.currency}
                        {l.monthlyRent && (
                          <span className="text-xs font-normal text-muted-foreground"> · {l.monthlyRent.toLocaleString("tr-TR")}/ay</span>
                        )}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-10">
              <Button asChild size="lg">
                <Link href={`/estate/agency/${agencyId}/ilanlar`}>
                  {feat.ctaText || "Tüm İlanları Gör"} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ── HİZMETLER ── */}
      {isActive(sections, "SERVICES") && services.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
              {sections.find((s) => s.type === "SERVICES")?.title || "Hizmetler"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <div key={i} className="border rounded-2xl p-6 hover:shadow-md transition-shadow space-y-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold">{s.title}</h3>
                  {s.desc && <p className="text-sm text-muted-foreground">{s.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── GALERİ ── */}
      {galleryImages.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <Images className="w-6 h-6 text-blue-600" /> Galeri
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {galleryImages.map((img) => (
                <div key={img.id} className="group relative aspect-square overflow-hidden rounded-2xl border bg-white">
                  <img
                    src={img.image}
                    alt={img.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-sm font-semibold line-clamp-1">{img.title}</p>
                    {img.category && (
                      <p className="text-white/80 text-xs">{img.category.name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EKİP ── */}
      {isActive(sections, "TEAM") && teamMembers.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 flex items-center justify-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              {sections.find((s) => s.type === "TEAM")?.title || "Ekibimiz"}
            </h2>
            {sections.find((s) => s.type === "TEAM")?.subtitle && (
              <p className="text-center text-muted-foreground mb-10">
                {sections.find((s) => s.type === "TEAM")?.subtitle}
              </p>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {teamMembers.map((m, i) => (
                <div key={i} className="bg-white border rounded-2xl p-6 text-center space-y-3 hover:shadow-md transition-shadow">
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-blue-50" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                      <Users className="w-10 h-10 text-blue-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold">{m.name}</p>
                    {m.role && <p className="text-sm text-muted-foreground">{m.role}</p>}
                  </div>
                  {m.phone && (
                    <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
                      <Phone className="w-3.5 h-3.5" /> {m.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REFERANSLAR ── */}
      {isActive(sections, "TESTIMONIALS") && testimonials.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
              {sections.find((s) => s.type === "TESTIMONIALS")?.title || "Müşteri Yorumları"}
            </h2>
            {sections.find((s) => s.type === "TESTIMONIALS")?.subtitle && (
              <p className="text-center text-muted-foreground mb-10">
                {sections.find((s) => s.type === "TESTIMONIALS")?.subtitle}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {testimonials.map((t, i) => (
                <div key={i} className="border rounded-2xl p-6 space-y-4 hover:shadow-md transition-shadow">
                  <Quote className="w-8 h-8 text-blue-200" />
                  <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.comment}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t">
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                        <Star className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      {t.role && <p className="text-xs text-muted-foreground">{t.role}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── HABERLER ── */}
      {newsItems.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <Newspaper className="w-6 h-6 text-blue-600" /> Haberler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {newsItems.map((n) => (
                <article key={n.id} className="bg-white border rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  {n.image && (
                    <div className="h-44 w-full bg-gray-100">
                      <img src={n.image} alt={n.title} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="p-5 space-y-2 flex-1 flex flex-col">
                    <p className="text-xs text-muted-foreground">{fmtEventDate(n.createdAt)}</p>
                    <h3 className="font-bold line-clamp-2">{n.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{n.content}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ETKİNLİKLER ── */}
      {events.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <CalendarDays className="w-6 h-6 text-blue-600" /> Yaklaşan Etkinlikler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {events.map((ev) => (
                <div key={ev.id} className="border rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  {ev.image && (
                    <div className="h-40 w-full bg-gray-100">
                      <img src={ev.image} alt={ev.title} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="p-5 space-y-2 flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                      <CalendarDays className="w-3.5 h-3.5" /> {fmtEventDate(ev.date)}
                    </div>
                    <h3 className="font-bold line-clamp-2">{ev.title}</h3>
                    {ev.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{ev.description}</p>
                    )}
                    <div className="mt-auto pt-2 space-y-1 text-xs text-muted-foreground">
                      {(ev.startTime || ev.endTime) && (
                        <p className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-600" /> {ev.startTime}{ev.endTime && ` – ${ev.endTime}`}
                        </p>
                      )}
                      {ev.location && (
                        <p className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" /> {ev.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── İLETİŞİM ── */}
      {isActive(sections, "CONTACT") && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
              {sections.find((s) => s.type === "CONTACT")?.title || "İletişim"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 p-4 bg-white rounded-2xl border hover:border-blue-300 transition-colors">
                  <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Telefon</p>
                    <p className="font-medium">{contact.phone}</p>
                  </div>
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 p-4 bg-white rounded-2xl border hover:border-blue-300 transition-colors">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">E-posta</p>
                    <p className="font-medium">{contact.email}</p>
                  </div>
                </a>
              )}
              {contact.address && (
                <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Adres</p>
                    <p className="font-medium text-sm">{contact.address}</p>
                  </div>
                </div>
              )}
              {contact.workingHours && (
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Çalışma Saatleri</p>
                    <p className="font-medium">{contact.workingHours}</p>
                  </div>
                </div>
              )}
            </div>
            {contact.mapLink && (
              <div className="mt-6 text-center">
                <Button asChild variant="outline">
                  <a href={contact.mapLink} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 w-4 h-4" /> Haritada Gör
                  </a>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-white py-10 px-4 mt-auto">
        <div className="max-w-6xl mx-auto space-y-4 text-center">
          <p className="font-bold text-lg">{agency.name}</p>
          {footer.description && (
            <p className="text-gray-400 text-sm max-w-md mx-auto">{footer.description}</p>
          )}
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { key: "instagram", label: "Instagram" },
              { key: "facebook",  label: "Facebook"  },
              { key: "twitter",   label: "Twitter"   },
              { key: "linkedin",  label: "LinkedIn"  },
              { key: "youtube",   label: "YouTube"   },
            ].filter((l) => footer[l.key]).map(({ key, label }) => (
              <a key={key} href={footer[key]} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors">
                {label}
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-xs">
            {footer.copyright || `© ${new Date().getFullYear()} ${agency.name}. Tüm hakları saklıdır.`}
          </p>
        </div>
      </footer>
    </div>
  );
}
