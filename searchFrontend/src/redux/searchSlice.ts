import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResult } from "@/type.ts";

interface SearchState {
    query: string;
    results: SearchResult[];
    total: number;
}

const initialState: SearchState = {
    query: "",
    results: [],
    total: 0,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setResults: (state, action: PayloadAction<{ results: SearchResult[]; total: number }>) => {
            state.results = action.payload.results;
            state.total = action.payload.total;
        },
    },
});

export const { setQuery, setResults } = searchSlice.actions;
export default searchSlice.reducer;
