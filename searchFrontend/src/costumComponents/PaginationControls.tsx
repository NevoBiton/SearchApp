import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";

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

    return (
        <div className="flex justify-center space-x-2 mt-4">
            <Button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                variant="outline"
            >
                Previous
            </Button>
            <span className="text-lg font-semibold">{page} / {totalPages}</span>
            <Button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                variant="outline"
            >
                Next
            </Button>
        </div>
    );
};

export default PaginationControls;

