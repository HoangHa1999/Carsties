"use client";

import React from "react";
import AuctionCard from "./AuctionCard";
import AppPagination from "../components/AppPagination";
import { Auction, PagedResult } from "@/types";
import { getData } from "../actions/actionAuctions";
import Filters from "./Filters";
import { useParamsStore } from "@/hooks/useParamsStore";
import { shallow } from "zustand/shallow";
import queryString from "query-string";
import EmptyFilter from "../components/EmptyFilter";

export default function Listing() {
    const [data, setData] = React.useState<PagedResult<Auction>>();
    const params = useParamsStore(
        (state) => ({
            pageNumber: state.pageNumber,
            pageSize: state.pageSize,
            searchTerm: state.searchTerm,
            orderBy: state.orderBy,
            filterBy: state.filterBy,
            seller: state.seller,
            winner: state.winner,
        }),
        shallow
    );

    const setParams = useParamsStore((state) => state.setParams);
    const url = queryString.stringifyUrl({ url: "", query: params });

    function setPageNumber(pageNumber: number) {
        setParams({ pageNumber });
    }

    React.useEffect(() => {
        getData(url).then((data) => {
            setData(data);
        });
    }, [url]);

    if (!data) return <h3>Loading...</h3>;

    return (
        <div>
            <Filters />
            {data.totalCount === 0 ? (
                <EmptyFilter showReset />
            ) : (
                <>
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                        {data.results.map((auction) => (
                            <AuctionCard auction={auction} key={auction.id} />
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <AppPagination
                            pageChanged={setPageNumber}
                            currentPage={params.pageNumber}
                            pageCount={data.pageCount}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
