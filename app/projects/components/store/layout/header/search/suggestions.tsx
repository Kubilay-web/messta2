import { SearchResult } from "@/app/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface Props {
  suggestions: SearchResult[];
  query: string;
}

const SearchSuggestions: FC<Props> = ({ suggestions, query }) => {
  const router = useRouter();
  const highlightText = (text: string, query: string) => {
    if (!query) return text; // Return original text if query is empty

    const regex = new RegExp(`(${query})`, "gi"); // Create a regex to match the query (case insensitive)
    const parts = text.split(regex); // Split the text by the query

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <strong key={index} className="text-orange-background">
          {part}
        </strong>
      ) : (
        part
      ),
    );
  };

  const handlePush = (link: string) => {
    router.push(link);
  };
  return (
    <div className="text-main-primary absolute top-11 !z-[99] w-full overflow-hidden rounded-3xl bg-white shadow-2xl">
      <div className="py-2">
        <ul>
          {suggestions.map((sugg) => (
            <li
              key={sugg.name}
              className="flex h-20 w-full cursor-pointer items-center gap-x-2 px-6 hover:bg-[#f5f5f5]"
              onClick={() => handlePush(sugg.link)}
            >
              <Image
                src={sugg.image}
                alt=""
                width={100}
                height={100}
                className="h-16 w-16 rounded-md object-cover"
              />
              <div>
                <span className="my-1.5 line-clamp-2 text-sm leading-6 sm:line-clamp-none">
                  {highlightText(sugg.name, query)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchSuggestions;
