import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery, setResults } from "@/redux/searchSlice";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

const LastSearches = () => {
    const dispatch = useDispatch();
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get("/search/history");
                setSearchHistory(response.data);
            } catch (error) {
                console.error("Error fetching search history:", error);
            }
        };

        fetchHistory();
    }, []);

    const handleSearchAgain = async (query: string) => {
        dispatch(setQuery(query));

        try {
            const response = await api.get(`/search?query=${encodeURIComponent(query)}`);
            dispatch(setResults(response.data));
        } catch (error) {
            console.error("Error fetching search results:", error);
            dispatch(setResults([]));
        }
    };

    return (
        <div className="mt-4">
            <h2 className="text-md font-semibold text-foreground">Search History</h2>
            <div className="mt-2 space-y-2">
                {searchHistory.length === 0 ? (
                    <p className="text-muted-foreground">No recent searches.</p>
                ) : (
                    searchHistory.map((query, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className="w-full text-left"
                            onClick={() => handleSearchAgain(query)}
                        >
                            {query}
                        </Button>
                    ))
                )}
            </div>
        </div>
    );
};

export default LastSearches;
