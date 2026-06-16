"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const [state, setState] = useState("");
  const router = useRouter();

  const search = (e) => {
    e.preventDefault();
    router.push(`/news/search?value=${state}`);
    setState("");
  };

  return (
    <div className="bg-white p-4">
      <form onSubmit={search} className="flex">
        <div className="h-[45px] w-[calc(100%-45px)]">
          <input
            type="text"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="h-full w-full border border-l-slate-300 bg-slate-100 p-2 outline-none"
          />
        </div>
        <button className="flex h-[45px] w-[45px] items-center justify-center bg-blue-600 text-xl text-white outline-none hover:bg-blue-800">
          <IoSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
