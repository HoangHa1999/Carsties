"use client";

import { useParamsStore } from "@/hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
    const router = useRouter();
    const pathname = usePathname();
    const setParams = useParamsStore((state) => state.setParams);
    const setSearchValue = useParamsStore((state) => state.setSearchValue);
    const searchValue = useParamsStore((state) => state.searchValue);

    function onChange(event: any) {
        setSearchValue(event.target.value);
    }

    function search() {
        if (pathname !== "/") {
            router.push("/");
        }
        setParams({ searchTerm: searchValue });
    }

    return (
        <div className="flex items-center shadow-sm bg-gray-200 py-2 w-[50%] rounded-full border-2 hover:border-gray-300 focus-within:border-gray-300">
            <input
                onKeyDown={(e: any) => {
                    if (e.key === "Enter") search();
                }}
                type="text"
                value={searchValue}
                onChange={onChange}
                placeholder="Search for cars by make, model or color"
                className="bg-transparent outline-none px-4 py-1 w-full border-none focus:ring-0"
            />
            <button onClick={search}>
                <FaSearch
                    size={34}
                    className="bg-red-400 text-white px-2 rounded-full hover:bg-red-600 mx-2"
                />
            </button>
        </div>
    );
}
