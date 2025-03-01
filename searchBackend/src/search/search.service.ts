import {Injectable, InternalServerErrorException} from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import {SearchResponseDto} from "./dto/search-response.dto";

@Injectable()
export class SearchService {
    private historyFile = path.join(process.cwd(), 'src', 'search-history.json');


    constructor() {

        if (!fs.existsSync(this.historyFile)) {
            fs.writeFileSync(this.historyFile, JSON.stringify([]));
        }
    }


    async searchDuckDuckGo(query: string, limit: number = 5, offset: number = 0): Promise<SearchResponseDto> {
        const apiUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;

        try {
            const response = await axios.get(apiUrl);

            if (!response.data || !response.data.RelatedTopics) {
                console.warn(`No results found for query: ${query}`);
                return { results: [], total: 0 };
            }

            const results = response.data.RelatedTopics
                .flatMap((item: any) => (item.Topics ? item.Topics : item))
                .filter((item: any) => item.Text && item.FirstURL)
                .slice(offset, offset + limit)
                .map((item: any) => ({
                    title: item.Text || 'No Title',
                    url: item.FirstURL || '#',
                }));


                this.saveSearchQuery(query);


            return {
                results,
                total: response.data.RelatedTopics.length,
            };
        } catch (error) {
            console.error('Error fetching search results:', error.message);
            throw new InternalServerErrorException('Failed to fetch search results');
        }
    }




    public saveSearchQuery(query: string) {
        try {
            let history = JSON.parse(fs.readFileSync(this.historyFile, 'utf-8'));

            if (!history.includes(query)) {
                history.push(query);
                fs.writeFileSync(this.historyFile, JSON.stringify(history, null, 2));
            }
        } catch (error) {
            console.error('Error saving search query:', error);
        }
    }

    getSearchHistory(): string[] {
        return JSON.parse(fs.readFileSync(this.historyFile, 'utf-8'));
    }

    public clearSearchHistory() {
        try {
            fs.writeFileSync(this.historyFile, JSON.stringify([]));
        } catch (error) {
            console.error('Error clearing search history:', error);
        }
    }
}
