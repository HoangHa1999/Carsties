"use client";

import { getAuction } from "@/app/actions/auctionActions";
import AuctionCreatedToast from "@/app/components/AuctionCreatedToast";
import AuctionFinishedToast from "@/app/components/AuctionFinishedToast";
import { useAuctionStore } from "@/hooks/useAuctionStore";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, AuctionFinished, Bid } from "@/types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { User } from "next-auth";
import React from "react";
import toast from "react-hot-toast";

type Props = {
    children: React.ReactNode;
    user: User | null;
};

export default function SignalRProvider({ children, user }: Props) {
    const [connection, setConnection] = React.useState<HubConnection | null>(
        null
    );
    const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
    const addBid = useBidStore((state) => state.addBid);

    React.useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${process.env.NEXT_PUBLIC_NOTIFY_URL}`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    React.useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    console.log("Connected to notifications hub");
                    connection.on("BidPlaced", (bid: Bid) => {
                        if (bid.bidStatus.includes("Accepted")) {
                            setCurrentPrice(bid.auctionId, bid.amount);
                            addBid(bid);
                        }
                    });

                    connection.on("AuctionCreated", (auction: Auction) => {
                        if (user?.username !== auction.seller) {
                            return toast(
                                <AuctionCreatedToast auction={auction} />,
                                { duration: 10000 }
                            );
                        }
                    });

                    connection.on(
                        "AuctionFinished",
                        (finishedAuction: AuctionFinished) => {
                            const auction = getAuction(
                                finishedAuction.auctionId
                            );
                            return toast.promise(
                                auction,
                                {
                                    loading: "Loading auction...",
                                    success: (auction) => (
                                        <AuctionFinishedToast
                                            finishedAuction={finishedAuction}
                                            auction={auction}
                                        />
                                    ),
                                    error: (err) =>
                                        `Could not load auction: ${err}`,
                                },
                                { success: { duration: 10000, icon: null } }
                            );
                        }
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        return () => {
            connection?.stop();
        };
    }, [connection, setCurrentPrice, addBid, user?.username]);

    return children;
}
