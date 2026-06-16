import { MapPin } from "lucide-react";
import { FC } from "react";

interface Props {
  countryName?: string;
  countryCode?: string;
  city?: string;
}

const ShipTo: FC<Props> = ({ countryName, countryCode, city }) => {
  return (
    <div className="flex h-7 justify-between">
      <div className="mr-2 flex items-center whitespace-nowrap font-bold">
        <span>Ship to</span>
      </div>
      <div className="flex items-center overflow-hidden">
        <MapPin className="mb-1 w-4 stroke-main-primary" />
        <span className="max-w-[200px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap pl-0.5 text-sm text-main-secondary">
          {countryName},{city && `${city},`}
          {countryCode}
        </span>
      </div>
    </div>
  );
};

export default ShipTo;
