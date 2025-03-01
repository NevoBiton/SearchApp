import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, setResults } from "@/redux/searchSlice";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";

interface SearchBarProps {
    setLoading: (loading: boolean) => void;
}

const SearchBar = ({ setLoading }: SearchBarProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storedQuery = useSelector((state: RootState) => state.search.query);
    const [localQuery, setLocalQuery] = useState(storedQuery);

    useEffect(() => {
        setLocalQuery(storedQuery);
    }, [storedQuery]);

    const handleSearch = async () => {
        if (!localQuery.trim()) return;

        dispatch(setQuery(localQuery));
        setLoading(true);

        const newSearchParams = new URLSearchParams();
        newSearchParams.set("query", localQuery);
        newSearchParams.set("page", "1");

        navigate(`/search?${newSearchParams.toString()}`, { replace: true });

        try {
            const response = await api.get(`/search?query=${encodeURIComponent(localQuery)}&limit=5&offset=0`);
            dispatch(setResults(response.data));
        } catch (error) {
            console.error(error);
            dispatch(setResults({ results: [], total: 0 }));
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <Input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={handleKeyDown}
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
