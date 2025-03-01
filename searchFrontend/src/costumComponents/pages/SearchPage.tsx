import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQuery, setResults } from "@/redux/searchSlice";
import api from "@/lib/api";
import SearchBar from "@/costumComponents/SearchBar.tsx";
import SearchResults from "@/costumComponents/SearchResults.tsx";
import PaginationControls from "@/costumComponents/PaginationControls.tsx";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const queryFromUrl = searchParams.get("query");
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    const [loading, setLoading] = useState(false);
    const limit = 5;

    useEffect(() => {
        if (queryFromUrl) {
            dispatch(setQuery(queryFromUrl));
            fetchSearchResults(queryFromUrl, pageFromUrl);
        }
    }, [queryFromUrl, pageFromUrl]);

    const fetchSearchResults = async (query: string, page: number) => {
        try {
            setLoading(true);
            const offset = (page - 1) * limit;
            const response = await api.get(`/search?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`);
            dispatch(setResults(response.data));
        } catch (error) {
            console.error("Error fetching search results:", error);
            dispatch(setResults({ results: [], total: 0 }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
            <div className="w-full max-w-2xl bg-card shadow-lg rounded-lg p-6">
                <h1 className="text-primary font-bold text-3xl text-center mb-4">
                    Search
                </h1>
                <SearchBar setLoading={setLoading} />
                <SearchResults loading={loading} />
                <PaginationControls />
            </div>
        </div>
    );
};

export default SearchPage;