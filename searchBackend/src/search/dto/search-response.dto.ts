import { SearchResultDto } from "./search-result.dto";

export class SearchResponseDto {
    results: SearchResultDto[];
    total: number;
}