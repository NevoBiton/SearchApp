import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {SearchResult} from "@/type.ts";


interface SearchState {
    query: string;
    results: SearchResult[];
}

const initialState: SearchState = {
    query: "",
    results: [],
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setResults: (state, action: PayloadAction<SearchResult[]>) => {
            state.results = action.payload;
        },
    },
});

export const { setQuery, setResults } = searchSlice.actions;
export default searchSlice.reducer;
