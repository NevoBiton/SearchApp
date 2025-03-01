import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

const SearchHistoryPage = () => {
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await api.get("/search/history");
            setSearchHistory(response.data);
        } catch (error) {
            console.error("Error fetching search history:", error);
        }
    };


    const handleSearchRedirect = (query: string) => {
        navigate(`/search?query=${encodeURIComponent(query)}`);
    };


    const handleClearHistory = async () => {
        try {
            await api.delete("/search/history");
            setSearchHistory([]);
        } catch (error) {
            console.error("Error clearing search history:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
            <div className="w-full max-w-2xl bg-card shadow-lg rounded-lg p-6">
                <h1 className="text-primary font-bold text-3xl text-center mb-4">
                    Search History
                </h1>

                {searchHistory.length > 0 && (
                    <div className="flex justify-end mb-4">
                        <Button
                            variant="destructive"
                            onClick={handleClearHistory}
                        >
                            Clear History
                        </Button>
                    </div>
                )}

                <div className="space-y-2">
                    {searchHistory.length === 0 ? (
                        <p className="text-muted-foreground text-center">No recent searches.</p>
                    ) : (
                        searchHistory.map((query, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="w-full text-left"
                                onClick={() => handleSearchRedirect(query)}
                            >
                                {query}
                            </Button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchHistoryPage;
