"use client";

// React, Next.js
import { useState } from "react";

// Icons
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { ChevronDown } from "lucide-react";

// Types
import { Country, SelectMenuOption } from "@/app/lib/types";

// Country selector
import CountrySelector from "@/app/projects/components/shared/country-selector";

// countries data
import countries from "@/app/data/countries.json";
import { useRouter } from "next/navigation";

export default function CountryLanguageCurrencySelector({
  userCountry,
}: {
  userCountry: Country;
}) {
  // Router hook for navigation
  const router = useRouter();

  // State to manage countries dropdown visibility
  const [show, setshow] = useState(false);

  const handleCountryClick = async (country: string) => {
    // Find the country data based on the selected country name
    const countryData = countries.find((c) => c.name === country);

    if (countryData) {
      const data: Country = {
        name: countryData.name,
        code: countryData.code,
        city: "",
        region: "",
      };
      try {
        // Send a POST request to your API endpoint to set the cookie
        const response = await fetch("/api/setUserCountryInCookies", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ userCountry: data }),
        });
        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  return (
    <div className="group relative inline-block">
      {/* Trigger */}
      <div>
        <div className="flex h-11 cursor-pointer items-center px-2 py-0">
          <span className="mr-0.5 grid h-[33px] place-items-center">
            <span className={`fi fi-${userCountry.code.toLowerCase()}`} />
          </span>
          <div className="ml-1">
            <span className="mt-2 block text-xs leading-3 text-white">
              {userCountry.name}/EN/
            </span>
            <b className="text-xs font-bold text-white">
              USD
              <span className="inline-block scale-[60%] align-middle text-white">
                <ChevronDown />
              </span>
            </b>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="absolute top-0 hidden cursor-pointer group-hover:block">
        <div className="relative z-50 -ml-32 mt-12 w-[300px] rounded-[24px] bg-white px-6 pb-6 pt-2 text-main-primary shadow-lg">
          {/* Triangle */}
          <div className="absolute -top-1.5 right-24 h-0 w-0 border-b-[10px] border-l-[10px] border-r-[10px] border-white border-l-transparent border-r-transparent" />
          <div className="mt-4 text-[20px] font-bold leading-6 text-black">Ship to</div>
          <div className="mt-2">
            <div className="relative rounded-lg bg-white text-main-primary">
              <CountrySelector
                id={"countries"}
                open={show}
                onToggle={() => setshow(!show)}
                onChange={(val) => handleCountryClick(val)}
                selectedValue={
                  (countries.find(
                    (option) => option.name === userCountry?.name,
                  ) as SelectMenuOption) || countries[0]
                }
              />
              <div>
                <div className="mt-4 text-[20px] font-bold leading-6 text-black">
                  Language
                </div>
                <div className="relative mt-2.5 flex h-10 cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border-[1px] border-black/20 px-3 py-0">
                  <div className="align-middle text-black">English</div>
                  <span className="absolute right-2">
                    <ChevronDown className="scale-75 text-main-primary" />
                  </span>
                </div>
              </div>
              <div>
                <div className="mt-4 text-[20px] font-bold leading-6 text-black">
                  Currency
                </div>
                <div className="relative mt-2 flex h-10 cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border-[1px] border-black/20 px-3 py-0">
                  <div className="align-middle text-black">USD (US Dollar)</div>
                  <span className="absolute right-2">
                    <ChevronDown className="scale-75 text-main-primary text-white" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
