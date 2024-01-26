import { numberWithCommas } from "@/app/lib/numberWithComma";
import { Bid } from "@/types";
import { format } from "date-fns";
import React from "react";

type Props = {
    bid: Bid;
};

export default function BidItem({ bid }: Props) {
    function getBidInfo() {
        let bgColor = "";
        let text = "";
        switch (bid.bidStatus) {
            case "Accepted":
                bgColor = "bg-green-300";
                text = "Bid accepted";
                break;
            case "AcceptedBelowReserve":
                bgColor = "bg-amber-300";
                text = "Reserve not met";
                break;
            case "TooLow":
                bgColor = "bg-red-300";
                text = "Bid was too low";
                break;
            default:
                bgColor = "bg-red-500";
                text = "Bid placed after auction finished";
                break;
        }
        return { bgColor, text };
    }
    return (
        <div
            className={`
        border-gray-300 border-2 rounded-lg p-2 px-3 py-2
        flex justify-between items-center mb-2
        ${getBidInfo().bgColor}
    `}
        >
            <div className="flex flex-col">
                <span>Bidder: {bid.bidder}</span>
                <span className="text-gray-700 text-sm">
                    Time: {format(new Date(bid.bidTime), 'dd/MM/yyyy HH:mm a')}
                </span>
            </div>
            <div className="flex flex-col text-right">
                <div className="text-xl font-semibold">${numberWithCommas(bid.amount)}</div>
                <div className="flex flex-row items-center">{getBidInfo().text}</div>
            </div>
        </div>
    );
}
