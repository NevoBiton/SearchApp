import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    async getResults(@Query('q') query: string) {
        if (!query) {
            return { error: 'Query parameter is required' };
        }
        return this.searchService.searchDuckDuckGo(query);
    }

    @Post()
    saveQuery(@Body('query') query: string) {
        if (!query) {
            return { error: 'Query is required' };
        }

        // Call the service function to save the query
        this.searchService.saveSearchQuery(query);

        return { message: 'Search query saved successfully' };
    }

    @Get('history')
    getHistory() {
        return this.searchService.getSearchHistory();
    }
}
