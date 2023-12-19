"use client";

import React from "react";
import { useParamsStore } from "@/hooks/useParamsStore";
import { IoCarSportSharp } from "react-icons/io5";

export default function Logo() {
    const reset = useParamsStore((state) => state.reset);
    return (
        <div
            onClick={reset}
            className="flex items-center gap-2 text-3xl font-semibold text-red-500 cursor-pointer"
        >
            <IoCarSportSharp size={34} />
            <div>Carsties Auctions</div>
        </div>
    );
}