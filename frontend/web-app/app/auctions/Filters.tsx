import { useParamsStore } from "@/hooks/useParamsStore";
import { Button, ButtonGroup } from "flowbite-react";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill, BsFillStopwatchFill } from "react-icons/bs";
import { GiFinishLine, GiFlame } from "react-icons/gi";
import React from "react";

const pageSizeButtons = [4, 8, 12];

const orderByButtons = [
    {
        label: "Alphabetical",
        icon: AiOutlineSortAscending,
        value: "make",
    },
    {
        label: "End date",
        icon: AiOutlineClockCircle,
        value: "endingSoon",
    },
    {
        label: "Recently added",
        icon: BsFillStopCircleFill,
        value: "new",
    },
];

const filterByButtons = [
    {
        label: "Live auctions",
        icon: GiFlame,
        value: "live",
    },
    {
        label: "Ending < 6 hours",
        icon: GiFinishLine,
        value: "endingSoon",
    },
    {
        label: "Completed",
        icon: BsFillStopwatchFill,
        value: "finished",
    },
];

export default function Filters() {
    const pageSize = useParamsStore((state) => state.pageSize);
    const orderBy = useParamsStore((state) => state.orderBy);
    const filterBy = useParamsStore((state) => state.filterBy);
    const setParams = useParamsStore((state) => state.setParams);

    return (
        <div className="flex lg:justify-between lg:items-center lg:flex-row vsm:flex-col mb-4">
            <div className="lg:mb-0 vsm:mb-4">
                <span className="uppercase text-gray-500 mr-2">Filter by</span>
                <ButtonGroup>
                    {filterByButtons.map(({ label, icon: Icon, value }) => (
                        <Button
                            key={value}
                            onClick={() => setParams({ filterBy: value })}
                            color={filterBy === value ? "red" : "gray"}
                            className="focus:ring-0"
                        >
                            <Icon className="mr-3 h-4 w-4" />
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div className="lg:mb-0 vsm:mb-4">
                <span className="uppercase text-gray-500 mr-2">Order by</span>
                <ButtonGroup>
                    {orderByButtons.map(({ label, icon: Icon, value }) => (
                        <Button
                            key={value}
                            onClick={() => setParams({ orderBy: value })}
                            color={orderBy === value ? "red" : "gray"}
                            className="focus:ring-0"
                        >
                            <Icon className="mr-3 h-4 w-4" />
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div className="lg:mb-0 vsm:mb-4">
                <span className="uppercase text-gray-500 mr-2">Page size</span>
                <ButtonGroup>
                    {pageSizeButtons.map((size, i) => (
                        <Button
                            key={i}
                            color={size === pageSize ? "red" : "gray"}
                            onClick={() => setParams({ pageSize: size })}
                            className="focus:ring-0"
                        >
                            {size}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    );
}
