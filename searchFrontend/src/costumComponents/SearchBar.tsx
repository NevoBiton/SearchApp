import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, setResults } from "@/redux/searchSlice";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";

const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storedQuery = useSelector((state: RootState) => state.search.query);
    const [localQuery, setLocalQuery] = useState(storedQuery);

    useEffect(() => {
        setLocalQuery(storedQuery); // Update input when query updates
    }, [storedQuery]);

    const handleSearch = async () => {
        if (!localQuery.trim()) return;

        dispatch(setQuery(localQuery));

        navigate(`/search?query=${encodeURIComponent(localQuery)}`);

        try {
            const response = await api.get(`/search?query=${encodeURIComponent(localQuery)}`);
            dispatch(setResults(response.data));
        } catch (error) {
            console.error("Error fetching search results:", error);
            dispatch(setResults([]));
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <Input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search for something..."
                className="w-full border-gray-300 rounded-md p-2"
            />
            <Button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
                Search
            </Button>
        </div>
    );
};

export default SearchBar;

