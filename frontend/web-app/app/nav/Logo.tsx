"use client";

import React from "react";
import { useParamsStore } from "@/hooks/useParamsStore";
import { IoCarSportSharp } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

export default function Logo() {
    const router = useRouter();
    const pathName = usePathname();
    const reset = useParamsStore((state) => state.reset);

    function doReset() {
        if (pathName !== "/") router.push("/");
        reset();
    }

    return (
        <div
            onClick={doReset}
            className="flex items-center gap-2 text-3xl font-semibold text-red-500 cursor-pointer"
        >
            <IoCarSportSharp size={34} />
            <div>Carsties Auctions</div>
        </div>
    );
}
