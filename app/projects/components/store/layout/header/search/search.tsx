"use client";
import { SearchResult } from "@/app/lib/types";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";
import SearchSuggestions from "./suggestions";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { push, replace } = useRouter();

  const search_query_url = params.get("search");

  const [searchQuery, setSearchQuery] = useState<string>(
    search_query_url || "",
  );
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (pathname !== "/browse") {
      push(`/home/shop/browse?search=${searchQuery}`);
    } else {
      if (!searchQuery) {
        params.delete("search");
      } else {
        params.set("search", searchQuery);
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Eğer browse sayfasında değilseniz ve input 2 karakterden fazla ise arama yapıyoruz
    if (pathname === "/browse") return;

    if (value.length >= 2) {
      try {
        const res = await fetch(`/api/search-products?search=${value}`);
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (search_query_url) {
      setSearchQuery(search_query_url);
    }
  }, [search_query_url]);

  return (
    <div className="relative flex-1 lg:w-full">
      <form
        onSubmit={handleSubmit}
        className="relative flex h-10 rounded-3xl border-none bg-white"
      >
        <input
          type="text"
          placeholder="Search..."
          className="m-2.5 flex-1 border-none bg-white pl-2.5 text-black outline-none"
          value={searchQuery}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <SearchSuggestions suggestions={suggestions} query={searchQuery} />
        )}
        <button
          type="submit"
          className="to mb-0 ml-0 mr-1 mt-1 grid h-8 w-[56px] cursor-pointer place-items-center rounded-[20px] border-[1px] bg-slate-600 bg-gradient-to-r from-slate-500"
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
