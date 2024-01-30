import { Bid } from "@/types";
import { createWithEqualityFn } from 'zustand/traditional'

type State = {
    bids: Bid[];
    open: boolean;
};

type Actions = {
    setBids: (bids: Bid[]) => void;
    addBid: (bid: Bid) => void;
    setOpen: (value: boolean) => void;
};

const initialState: State = {
    bids: [],
    open: true,
};

export const useBidStore = createWithEqualityFn<State & Actions>((set) => ({
    ...initialState,
    setBids: (bids: Bid[]) => set(() => ({ bids })),
    addBid: (bid: Bid) =>
        set((state) => ({
            bids: !state.bids.find((b) => b.id === bid.id)
                ? [bid, ...state.bids]
                : state.bids,
        })),
    setOpen: (value: boolean) => set(() => ({ open: value })),
}));
