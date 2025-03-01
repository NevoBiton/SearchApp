import React from "react";

interface HighlightSearchProps {
    text: string;
    searchQuery: string;
}

const HighlightSearch: React.FC<HighlightSearchProps> = ({ text, searchQuery }) => {
    if (!searchQuery.trim()) return <>{text}</>;

    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === searchQuery.toLowerCase() ? (
                    <span key={index} className="text-yellow-500 font-bold">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </>
    );
};

export default HighlightSearch;
