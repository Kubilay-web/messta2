import { Country } from "@prisma/client";
import { Info } from "lucide-react";

export default function CountryNote({ country }: { country: string }) {
  return (
    <div className="flex w-full items-center rounded bg-green-100 p-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-green-200">
        <Info className="stroke-green-300" />
      </div>
      <div className="w-full pl-3">
        <div className="flex items-center justify-between">
          <p className="text-sm leading-none text-blue-700">
            Shipping fees are calculated based on your current country (
            {country}). <br />
            shipping fees will always automatically update to reflect your
            delivery destination.
          </p>
        </div>
      </div>
    </div>
  );
}
