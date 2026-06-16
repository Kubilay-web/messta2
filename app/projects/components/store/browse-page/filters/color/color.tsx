import { cn } from "@/app/lib/utils";
import { Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ColorCircle({ color }: { color: string }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathname = usePathname();

  const { replace } = useRouter();

  // Params
  const colorQueryArray = searchParams.getAll("color");

  // Check if the current color is already in the query params
  const existed_color = colorQueryArray.includes(color);

  const handleColorChange = (color: string) => {
    if (existed_color) {
      // Remove only the specific color from params
      const newColors = colorQueryArray.filter((c) => c !== color);
      params.delete("color"); // Delete all color params
      newColors.forEach((color) => params.append("color", color)); // Add back the remaining colors
    } else {
      // Add new color to params
      params.append("color", color);
    }
    replaceParams();
  };

  const replaceParams = () => {
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        "w-5 h-5 rounded-full shadow-sm cursor-pointer border border-gray-50",
        {
          "outline-dotted outline-offset-2 outline-gray-500": existed_color,
        }
      )}
      style={{ backgroundColor: color }}
      onClick={() => handleColorChange(color)}
    ></div>
  );
}
