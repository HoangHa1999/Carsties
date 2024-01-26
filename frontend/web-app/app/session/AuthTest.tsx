"use client";

import { Button } from "flowbite-react";
import React from "react";
import { updateAuctionTest } from "../actions/auctionActions";

export default function AuthTest() {
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState<any>();

    function doUpdate() {
        setLoading(true);
        setResult(undefined);
        updateAuctionTest()
            .then((res) => {
                setResult(res);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div className="flex items-center gap-4">
            <Button isProcessing={loading} onClick={doUpdate}>Test auth</Button>
            <div>{JSON.stringify(result, null, 2)}</div>
        </div>
    );
    
}
