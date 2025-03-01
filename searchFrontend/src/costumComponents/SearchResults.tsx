import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SearchSkeletons from "./SearchSkeletons";
import HighlightSearch from "./HighlightSearch";

interface SearchResultsProps {
    loading: boolean;
    searchHighlight: string;
    setWordCount: (count: number) => void;
}

const SearchResults = ({ loading, searchHighlight, setWordCount }: SearchResultsProps) => {
    const searchResults = useSelector((state: RootState) => state.search.results);
    const [_, setTotalMatches] = useState(0);

    useEffect(() => {
        if (!searchResults || !searchHighlight.trim()) {
            setWordCount(0);
            return;
        }

        let matchCount = 0;
        searchResults.forEach((item) => {
            const titleMatches = (item.title.match(new RegExp(searchHighlight, "gi")) || []).length;
            matchCount += titleMatches;
        });

        setWordCount(matchCount);
        setTotalMatches(matchCount);
    }, [searchHighlight, searchResults, setWordCount]);


    if (loading) {
        return <SearchSkeletons />;
    }

    if (!searchResults) {
        return null;
    }

    return (
        <div className="mt-4 space-y-2">
            {searchResults.length === 0 ? (
                <p className="text-gray-500 text-center mt-4">No results found.</p>
            ) : (
                searchResults.map((item) => (
                    <div key={item.url} className="p-4 border rounded-md">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-medium">
                            <HighlightSearch text={item.title} searchQuery={searchHighlight} />
                        </a>
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchResults;
