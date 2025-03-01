import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationControls = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const totalResults = useSelector((state: RootState) => state.search.total);
    const query = searchParams.get("query") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 5;
    const totalPages = Math.ceil(totalResults / limit);

    const goToPage = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setSearchParams({ query, page: newPage.toString() });
        }
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center space-x-4 mt-6">
            <Button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                variant="outline"
                className="cursor-pointer flex items-center gap-1"
            >
                <ChevronLeft className="w-4 h-4" />
                Previous
            </Button>

            <span className="text-sm font-medium text-muted-foreground">
                Page <span className="text-primary font-semibold">{page}</span> of {totalPages}
            </span>

            <Button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                variant="outline"
                className="cursor-pointer flex items-center gap-1"
            >
                Next
                <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default PaginationControls;
