import { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery, setResults } from "@/redux/searchSlice";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [localQuery, setLocalQuery] = useState("");

    const handleSearch = async () => {
        if (!localQuery.trim()) return;

        dispatch(setQuery(localQuery)); // Store query in Redux

        try {
            const response = await api.get(`/search?q=${encodeURIComponent(localQuery)}`);
            dispatch(setResults(response.data)); // Store API results in Redux
        } catch (error) {
            console.error("Error fetching search results:", error);
            dispatch(setResults([])); // Clear results on error
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <Input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search something..."
                className="w-full border border-gray-300 rounded-md p-2"
            />
            <Button onClick={handleSearch} className="px-4 py-2">
                Search
            </Button>
        </div>
    );
};

export default SearchBar;
