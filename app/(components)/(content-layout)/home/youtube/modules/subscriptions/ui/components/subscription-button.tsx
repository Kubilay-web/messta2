import { cn } from "@/app/lib/utils";
import { Button, ButtonProps } from "../../../../components/ui/button";


interface SubscriptionButtonProps {
  onClick: ButtonProps["onClick"];
  disabled: boolean;
  isSubscribed: boolean;
  className?: string;
  size?: ButtonProps["size"];
};

export const SubscriptionButton = ({
  onClick,
  disabled,
  isSubscribed,
  className,
  size
}: SubscriptionButtonProps) => {
  return (
    <Button
      size={size}
      variant={isSubscribed ? "secondary" : "default"}
      className="rounded-full bg-slate-500 text-white"
      onClick={onClick}
      disabled={disabled}
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
};