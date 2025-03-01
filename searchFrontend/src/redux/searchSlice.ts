// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {SearchResult} from "@/type.ts";
//
//
// interface SearchState {
//     query: string;
//     results: SearchResult[];
// }
//
// const initialState: SearchState = {
//     query: "",
//     results: [],
// };
//
// const searchSlice = createSlice({
//     name: "search",
//     initialState,
//     reducers: {
//         setQuery: (state, action: PayloadAction<string>) => {
//             state.query = action.payload;
//         },
//         setResults: (state, action: PayloadAction<SearchResult[]>) => {
//             state.results = action.payload;
//         },
//     },
// });
//
// export const { setQuery, setResults } = searchSlice.actions;
// export default searchSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchResult {
    title: string;
    url: string;
}

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
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setResults(state, action: PayloadAction<{ results: SearchResult[]; total: number }>) {
            state.results = action.payload.results ?? [];
            state.total = action.payload.total ?? 0;
        },
    },
});

export const { setQuery, setResults } = searchSlice.actions;
export default searchSlice.reducer;

