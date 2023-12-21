"use client";

import { useParamsStore } from "@/hooks/useParamsStore";
import React from "react";
import Heading from "./Heading";
import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";

type Props = {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    showLogin?: boolean;
    callbackUrl?: string;
};

export default function EmptyFilter({
    title = "No matches for this filter",
    subtitle = "Try changing or resetting the filter",
    showReset,
    showLogin,
    callbackUrl,
}: Props) {
    const reset = useParamsStore((state) => state.reset);

    return (
        <div className="mx-10 h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
            <Heading title={title} subtitle={subtitle} center />
            {showReset && (
                <Button onClick={reset} outline>
                    Reset filter
                </Button>
            )}
            {showLogin && (
                <Button
                    onClick={() => signIn("id-server", { callbackUrl })}
                    outline
                >
                    Login
                </Button>
            )}
        </div>
    );
}
