import { Input } from "@/components/ui/input";

interface SearchHighlightInputProps {
    searchHighlight: string;
    setSearchHighlight: (value: string) => void;
    wordCount: number;
}

const SearchHighlightInput = ({ searchHighlight, setSearchHighlight, wordCount }: SearchHighlightInputProps) => {
    return (
        <div className="absolute top-4 right-6 flex items-center space-x-2">
            <Input
                type="text"
                value={searchHighlight}
                onChange={(e) => setSearchHighlight(e.target.value)}
                placeholder="Find in results..."
                className="w-32 text-sm border rounded-md px-2 py-1"
            />
            {searchHighlight && (
                <span className="text-xs text-yellow-600 font-medium">{wordCount} found</span>
            )}
        </div>
    );
};

export default SearchHighlightInput;
