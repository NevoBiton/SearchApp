import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card } from "@/components/ui/card";
import {SearchResult} from "@/type.ts";

const SearchResults = () => {
    const results: SearchResult[] = useSelector((state: RootState) => state.search.results);

    if (results.length === 0) {
        return <p className="text-gray-500 text-center mt-4">No results found.</p>;
    }

    return (
        <div className="mt-4 space-y-2">
            {results.map((item) => (
                <Card key={item.url} className="p-4 border">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-medium">
                        {item.title}
                    </a>
                </Card>
            ))}
        </div>
    );
};

export default SearchResults;
