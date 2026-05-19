"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    // You can do something with searchKeyword here
    console.log("Searching for:", searchKeyword);
  };

  return (
    <div className="relative w-[200]">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchKeyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="
          w-full
          h-12
          rounded-xl
          border
          border-gray-200
          bg-[#fafafa]
          pl-4
          pr-11
          text-sm
          text-black
          placeholder:text-gray-400
          outline-none
          transition
          focus:border-gray-400
          focus:bg-white
        "
      />

      {/* Search icon clickable */}
      <div
        onClick={handleSearch}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          cursor-pointer
          text-gray-400
        "
      >
        <Search size={18} />
      </div>
    </div>
  );
};

export default SearchBar;