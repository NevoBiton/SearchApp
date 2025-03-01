import { Controller, Get, Post, Body, Query, Delete } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchQueryDto } from "./dto/search-query.dto";
import { SaveQueryDto } from "./dto/save-query.dto";
import { SearchResultDto } from "./dto/search-result.dto";

@Controller("search")
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    async getResults(@Query() queryDto: SearchQueryDto): Promise<SearchResultDto[]> {
        return this.searchService.searchDuckDuckGo(queryDto.query, queryDto.limit, queryDto.offset);
    }

    @Post()
    saveQuery(@Body() body: SaveQueryDto) {
        this.searchService.saveSearchQuery(body.query);
        return { message: "Search query saved successfully" };
    }

    @Get("history")
    getHistory() {
        return this.searchService.getSearchHistory();
    }

    @Delete("history")
    clearHistory() {
        this.searchService.clearSearchHistory();
        return { message: "Search history cleared successfully" };
    }
}
