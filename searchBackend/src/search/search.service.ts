import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SearchService {
    private historyFile = path.join(process.cwd(), 'src', 'search-history.json');


    constructor() {

        if (!fs.existsSync(this.historyFile)) {
            fs.writeFileSync(this.historyFile, JSON.stringify([]));
        }
    }

    async searchDuckDuckGo(query: string, limit: number, offset: number) {
        const apiUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;

        try {
            const response = await axios.get(apiUrl);

            let results = response.data.RelatedTopics
                .filter((item: any) => item.FirstURL && item.Text)
                .map((item: any) => ({
                    title: item.Text,
                    url: item.FirstURL,
                }));

            results = results.slice(offset, offset + limit);

            this.saveSearchQuery(query);

            return results.length ? results : [{ title: 'No results found', url: '#' }];
        } catch (error) {
            throw new Error('Error fetching search results');
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
