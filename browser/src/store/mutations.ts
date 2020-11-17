import { Article, Category, Link, SiteInfo, Social } from '@/common/api_interface';
import { format } from 'date-fns';
import { DEFAULT_FILTER, DEFAULT_LIMIT } from '.';
import { GlobalMutations } from './mutations_name';
import { RootState } from './type';

function resetPage (state: RootState): void {
    state.pager.limit = DEFAULT_LIMIT;
    state.pager.page = 1;
}

export const MUTATIONS = {
    [GlobalMutations.UPDATE_SITE_INFO] (state: RootState, siteInfo: SiteInfo): void {
        Object.assign(state.info, siteInfo);
    },
    [GlobalMutations.UPDATE_LINK_LIST] (state: RootState, list: Link[] = []): void {
        state.links = list;
    },
    [GlobalMutations.UPDATE_SOCIAL_LIST] (state: RootState, list: Social[] = []): void {
        state.socials = list;
    },
    [GlobalMutations.UPDATE_FILTER] (state: RootState, filter: RootState['filter']): void {
        state.filter = Object.assign({}, DEFAULT_FILTER, filter);
    },
    [GlobalMutations.UPDATE_ARTICLE_LIST] (state: RootState, list: Article[] = []): void {
        state.originArticles = list;
        resetPage(state);
    },
    [GlobalMutations.UPDATE_CURRENT_ARTICLE_LIST] (state: RootState): void {
        state.articles = state.originArticles.filter((article: Article): boolean => {
            const keyword = state.filter.keyword.toLowerCase();
            const title = article.title.toLowerCase();
            if (keyword && !title.includes(keyword)) {
                return false;
            }

            const date = state.filter.date.toLowerCase();
            const createDate = format(article.createdAt * 1000, 'yyyy-MM');
            if (date && createDate !== date) {
                return false;
            }

            const category = state.filter.category.toLowerCase();
            const key = article.categoryKey.toLowerCase();
            if (category && category !== key.toLowerCase()) {
                return false;
            }

            return true;
        });
        resetPage(state);
    },
    [GlobalMutations.UPDATE_CATEGORY_LIST] (state: RootState, list: Category[] = []): void {
        state.categories = list;
    },
    [GlobalMutations.UPDATE_CURRENT_PAGE] (state: RootState, page: number = 0): void {
        state.pager.page = page;
    },
    [GlobalMutations.UPDATE_CURRENT_LIMIT] (state: RootState, limit: number = 0): void {
        state.pager.limit = limit;
    }
};
