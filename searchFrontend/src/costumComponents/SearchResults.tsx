import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SearchSkeletons from "./SearchSkeletons";

const SearchResults = ({ loading }: { loading: boolean }) => {
    const searchResults = useSelector((state: RootState) => state.search.results);

    if (loading) {
        return <SearchSkeletons />;
    }

    if (searchResults === null || searchResults === undefined) {
        return null;
    }

    if (searchResults.length === 0) {
        return <p className="text-gray-500 text-center mt-4">No results found.</p>;
    }

    return (
        <div className="mt-4 space-y-2">
            {searchResults.map((item) => (
                <div key={item.url} className="p-4 border rounded-md">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-medium">
                        {item.title}
                    </a>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
