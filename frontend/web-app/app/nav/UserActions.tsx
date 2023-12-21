"use client";

import { Dropdown } from "flowbite-react";
import { HiUser, HiLogout, HiCog } from "react-icons/hi";
import { AiFillCar, AiFillTrophy } from "react-icons/ai";
import React from "react";
import { User } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";

type Props = {
    user: Partial<User>;
};

export default function UserActions({ user }: Props) {
    return (
        <Dropdown inline label={`Welcome ${user.name}`}>
            <Dropdown.Item icon={HiUser}>
                <Link href="/">My auctions</Link>
            </Dropdown.Item>
            <Dropdown.Item icon={AiFillTrophy}>
                <Link href="/">Auctions won</Link>
            </Dropdown.Item>
            <Dropdown.Item icon={AiFillCar}>
                <Link href="/">Sell my car</Link>
            </Dropdown.Item>
            <Dropdown.Item icon={HiCog}>
                <Link href="/session">Session (dev only)</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout} onClick={()=>signOut({callbackUrl: "/"})}>Sign out</Dropdown.Item>
        </Dropdown>
    );
}
