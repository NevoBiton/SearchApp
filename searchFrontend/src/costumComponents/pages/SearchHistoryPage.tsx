import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Trash2, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
                {/* 🔹 Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-primary font-bold text-xl">Search History</h1>
                    {searchHistory.length > 0 && (
                        <Button className="cursor-pointer" variant="destructive" size="sm" onClick={handleClearHistory}>
                            <Trash2 className="w-4 h-4 mr-2" /> Clear History
                        </Button>
                    )}
                </div>

                <Separator className="mb-4" />

                {/* 🔹 Search History List */}
                {searchHistory.length === 0 ? (
                    <p className="text-muted-foreground text-center text-sm">No recent searches.</p>
                ) : (
                    <ul className="space-y-2">
                        {searchHistory.map((query, index) => (
                            <div key={index}>
                                <li
                                    onClick={() => handleSearchRedirect(query)}
                                    className="flex items-center p-2 cursor-pointer hover:bg-muted rounded-md transition-all text-sm"
                                >
                                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                                    <span className="flex-1">{query}</span>
                                </li>
                                {/* Separator line between history items */}
                                {index !== searchHistory.length - 1 && <Separator />}
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchHistoryPage;
