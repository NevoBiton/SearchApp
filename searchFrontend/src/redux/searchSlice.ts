import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    query: string;
    results: { title: string; url: string }[];
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
        setResults: (state, action: PayloadAction<{ title: string; url: string }[]>) => {
            state.results = action.payload;
        },
    },
});

export const { setQuery, setResults } = searchSlice.actions;
export default searchSlice.reducer;
