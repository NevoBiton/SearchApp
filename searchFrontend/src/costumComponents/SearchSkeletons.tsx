import { Skeleton } from "@/components/ui/skeleton";

const SearchSkeletons = () => {
    return (
        <div className="space-y-4 mt-4">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="flex flex-col space-y-2 p-4 border rounded-md bg-card">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </div>
    );
};

export default SearchSkeletons;
