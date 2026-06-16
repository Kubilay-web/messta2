import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
import { useChatStore } from "@/app/chat-store/useChatSotre";

function SearchBar() {
  const [query, setQuery] = useState("");
  const searchContacts = useChatStore((state) => state.searchContacts);
  console.log(searchContacts);
  const clearContactSearch = useChatStore((state) => state.clearContactSearch);
  const searchResults = useChatStore((state) => state.searchResults);
  const setActiveChat = useChatStore((state) => state.setActiveChat);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setQuery(value);

    if (value.trim() === "") {
      clearContactSearch();
    } else {
      searchContacts(value);
    }
  };

  return (
    <div className="bg-white border-r border-gray-200 flex py-3 pl-5 items-center gap-3 h-14">
      <div className="bg-white border-r border-gray-200 flex items-center gap-5 px-3 py-1 rounded-lg flex-grow relative">
        <BiSearchAlt2 className="text-panel-header-icon text-gray-600 cursor-pointer text-lg absolute left-6" />
        <input
          type="search"
          placeholder="Search for chats..."
          className="w-full px-4 py-2 pl-10 pr-10 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600 transition-colors"
          aria-label="Search chats"
        />
      </div>
      {/* <BsFilter className="text-panel-header-icon text-white cursor-pointer text-lg pr-5 pl-3" /> */}
    </div>
  );
}

export default SearchBar;
