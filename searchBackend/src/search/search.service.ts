import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SearchService {
    async searchDuckDuckGo(query: string) {
        const apiUrl = `http://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;

        try {
            const response = await axios.get(apiUrl);
            const results = response.data.RelatedTopics.map((item: any) => ({
                title: item.Text || 'No Title',
                url: item.FirstURL || '#',
            }));

            return results;
        } catch (error) {
            throw new Error('Error fetching search results');
        }
    }
}
