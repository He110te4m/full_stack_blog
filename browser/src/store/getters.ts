import { Article, Timeline } from '@/common/api_interface';
import { format } from 'date-fns';
import { RootState } from './type';

export const GETTERS = {
    articleCount (state: RootState): number {
        return state.articles.length;
    },
    recentlyArticles (state: RootState): Timeline[] {
        const articleMap = new Map<string, number>();

        state.originArticles.forEach((article: Article): void => {
            const key = format(article.createdAt * 1000, 'yyyy-MM');

            let item = articleMap.get(key);
            if (!item) {
                articleMap.set(key, 0);
                item = 0;
            }
            item++;
            articleMap.set(key, item);
        });

        return Array.from(articleMap.entries()).map(([date, count]: [string, number]): Timeline => ({
            date,
            count
        }));
    },
    currentPageArticles (state: RootState): Article[] {
        const start = state.pager.limit * (state.pager.page - 1);

        return state.articles.slice(start, start + state.pager.limit);
    }
};
