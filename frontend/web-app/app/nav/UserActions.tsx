"use client";

import { Dropdown } from "flowbite-react";
import { HiUser, HiLogout, HiCog } from "react-icons/hi";
import { AiFillCar, AiFillTrophy } from "react-icons/ai";
import React from "react";
import { User } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useParamsStore } from "@/hooks/useParamsStore";

type Props = {
    user: User;
};

export default function UserActions({ user }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const setParams = useParamsStore((state) => state.setParams);

    function setWinner() {
        setParams({ winner: user.username, seller: undefined });
        if (pathname !== "/") router.push("/");
    }

    function setSeller() {
        setParams({ seller: user.username, winner: undefined });
        if (pathname !== "/") router.push("/");
    }

    return (
        <Dropdown inline label={`Welcome ${user.name}`}>
            <Dropdown.Item icon={HiUser} onClick={setSeller}>
                My auctions
            </Dropdown.Item>
            <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
                Auctions won
            </Dropdown.Item>
            <Dropdown.Item icon={AiFillCar}>
                <Link href="/auctions/create">Sell my car</Link>
            </Dropdown.Item>
            <Dropdown.Item icon={HiCog}>
                <Link href="/session">Session (dev only)</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
                icon={HiLogout}
                onClick={() => signOut({ callbackUrl: "/" })}
            >
                Sign out
            </Dropdown.Item>
        </Dropdown>
    );
}
