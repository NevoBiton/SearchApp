import {Controller, Get, Post, Body, Query, Delete} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    async getResults(
        @Query('q') query: string,
        @Query('limit') limit: string = '10',   // Default to 10 results
        @Query('offset') offset: string = '0'   // Default offset to 0
    ) {
        if (!query) {
            return { error: 'Query parameter is required' };
        }

        return this.searchService.searchDuckDuckGo(query, parseInt(limit), parseInt(offset));
    }

    @Post()
    saveQuery(@Body('query') query: string) {
        if (!query) {
            return { error: 'Query is required' };
        }

        this.searchService.saveSearchQuery(query);

        return { message: 'Search query saved successfully' };
    }

    @Get('history')
    getHistory() {
        return this.searchService.getSearchHistory();
    }

    @Delete('history')
    clearHistory() {
        this.searchService.clearSearchHistory();
        return { message: 'Search history cleared successfully' };
    }
}
