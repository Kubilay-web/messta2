import { Building2 } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

interface WelcomeBannerProps {
  userName:   string;
  agencyName: string;
  userRole:   string;
}

export function WelcomeBanner({ userName, agencyName, userRole }: WelcomeBannerProps) {
  const hour   = new Date().getHours();
  const greeting =
    hour < 12 ? "Günaydın" :
    hour < 18 ? "İyi günler" :
                "İyi akşamlar";

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-none shadow-lg">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2.5 rounded-full shrink-0">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {greeting}, {userName}!
            </h2>
            <p className="text-blue-100 text-sm mt-0.5">
              {userRole}
              {agencyName && <> · <span className="font-medium">{agencyName}</span></>}
            </p>
          </div>
          <div className="ml-auto text-right hidden sm:block shrink-0">
            <p className="text-white/70 text-xs">
              {new Date().toLocaleDateString("tr-TR", {
                weekday: "long", day: "numeric", month: "long",
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
