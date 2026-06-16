import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getRevenueOverview } from "../../../actions/revenue";
import { getCommissionsByYear } from "../../../actions/commissions";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp, DollarSign, Clock, CheckCircle,
  AlertTriangle, ArrowRight, FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export const metadata: Metadata = { title: "Muhasebe Portalı - EstatePro" };

function fmt(v: number, cur = "TRY") {
  return `${v.toLocaleString("tr-TR")} ${cur}`;
}

export default async function AccountantPortalPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  if (!agency) redirect("/login");

  const year = new Date().getFullYear();
  const [revenue, commissionsData] = await Promise.all([
    getRevenueOverview(agency.id, year),
    getCommissionsByYear(agency.id, year),
  ]);

  const { kpi } = revenue;
  const { totals } = commissionsData;

  const h = new Date().getHours();
  const greeting = h < 12 ? "Günaydın" : h < 18 ? "İyi günler" : "İyi akşamlar";

  const kpis = [
    { label: "Toplam Beklenen",  value: fmt(kpi.totalAll,     kpi.currency), icon: TrendingUp,    color: "bg-blue-50 text-blue-600",    href: "/estate/portal/accountant/revenue"     },
    { label: "Tahsil Edilen",    value: fmt(kpi.totalPaid,    kpi.currency), icon: CheckCircle,   color: "bg-green-50 text-green-600",  href: "/estate/portal/accountant/revenue"     },
    { label: "Bekleyen Ödeme",   value: fmt(kpi.totalPending, kpi.currency), icon: Clock,         color: "bg-amber-50 text-amber-600",  href: "/estate/portal/accountant/payments"    },
    { label: "Gecikmiş",         value: fmt(kpi.totalOverdue, kpi.currency), icon: AlertTriangle, color: "bg-red-50 text-red-600",      href: "/estate/portal/accountant/payments"    },
    { label: "Toplam Komisyon",  value: fmt(totals.totalCommission,   totals.currency), icon: DollarSign, color: "bg-purple-50 text-purple-600", href: "/estate/portal/accountant/commissions" },
    { label: "Tahsil Komisyon",  value: fmt(totals.earnedCommission,  totals.currency), icon: CheckCircle, color: "bg-teal-50 text-teal-600",   href: "/estate/portal/accountant/commissions" },
  ];

  const shortcuts = [
    { label: "Gelir Takibi",     href: "/estate/portal/accountant/revenue"     },
    { label: "Ödeme Planları",   href: "/estate/portal/accountant/payments"    },
    { label: "Komisyonlar",      href: "/estate/portal/accountant/commissions" },
    { label: "Sözleşmeler",      href: "/estate/portal/accountant/contracts"   },
  ];

  return (
    <div className="w-full p-4 sm:p-6 space-y-6">

      {/* Hoşgeldin */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-5 sm:p-6 shadow">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          {greeting}, {(user as any).firstName ?? (user as any).name ?? "Muhasebeci"}!
        </h1>
        <p className="text-blue-100 text-sm mt-1">{agency.name} · Muhasebe Portalı · {year}</p>
      </div>

      {/* KPI Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {kpis.map(({ label, value, icon: Icon, color, href }) => (
          <Link key={label} href={href}>
            <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-black uppercase tracking-wide truncate">{label}</p>
                  <p className="text-base font-extrabold text-black leading-tight">{value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Aylık Özet */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-extrabold text-black">{kpi.countAll}</p>
            <p className="text-xs text-muted-foreground mt-1">Toplam Ödeme Kaydı</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-extrabold text-black">{totals.contracts}</p>
            <p className="text-xs text-muted-foreground mt-1">Toplam Sözleşme</p>
          </CardContent>
        </Card>
      </div>

      {/* Hızlı Erişim */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-black flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" /> Hızlı Erişim
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {shortcuts.map(({ label, href }) => (
              <Link key={label} href={href}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-3 text-sm text-black hover:bg-gray-50 hover:border-blue-200 transition-colors font-medium">
                <ArrowRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
