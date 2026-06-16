import { ShieldCheck, Undo } from "lucide-react";
import { BarLoader } from "react-spinners";

export default function ReturnPrivacySecurityCard({
  returnPolicy,
  loading,
}: {
  returnPolicy?: string;
  loading: boolean;
}) {
  return (
    <div className="mt-2 space-y-2">
      <Returns returnPolicy={returnPolicy} loading={loading} />
      <SecurityPrivacyCard />
    </div>
  );
}

export const Returns = ({
  returnPolicy,
  loading,
}: {
  returnPolicy?: string;
  loading: boolean;
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          <Undo className="w-4" />
          <span className="text-sm font-bold">Return Policy</span>
        </div>
      </div>
      <div>
        <span className="ml-5 flex text-xs text-[#979797]">
          {!loading ? (
            returnPolicy
          ) : (
            <BarLoader width={180} color="#e5e5e5" className="rounded-full" />
          )}
        </span>
      </div>
    </div>
  );
};

export const SecurityPrivacyCard = () => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          <ShieldCheck className="w-4" />
          <span className="text-sm font-bold">Security & Privacy</span>
        </div>
      </div>
      <p className="ml-5 flex gap-x-1 text-xs text-[#979797]">
        Safe payments: We do not share your personal details with any third
        parties without your consent. Secure personal details: We protect your
        privacy and keep your personal details safe and secure.
      </p>
    </div>
  );
};
