import { Controller, Get, Query } from '@nestjs/common';
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
}
