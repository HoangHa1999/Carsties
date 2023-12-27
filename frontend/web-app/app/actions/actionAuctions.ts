"use server";

import { Auction, PagedResult } from "@/types";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { FieldValues } from "react-hook-form";
import { revalidatePath } from "next/cache";

export async function getData(query: string): Promise<PagedResult<Auction>> {
    return fetchWrapper.get(`search${query}`);
}

export async function updateAuctionTest() {
    const data = {
        mileage: Math.floor(Math.random() * 100000) + 1,
    };
    return fetchWrapper.put(
        "auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c",
        data
    );
}

export async function createAuction(data: FieldValues) {
    return fetchWrapper.post("auctions", data);
}

export async function updateAuction(id: string, data: FieldValues) {
    const res = fetchWrapper.put(`auctions/${id}`, data);
    revalidatePath(`/auctions/${id}`);
    return res;
}

export async function deleteAuction(id: string) {
    return fetchWrapper.delete(`auctions/${id}`);
}

export async function getAuction(id: string): Promise<Auction> {
    return fetchWrapper.get(`auctions/${id}`);
}
