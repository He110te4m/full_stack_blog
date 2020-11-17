import { list as getArticles } from '@/apis/article';
import { list as getCategories } from '@/apis/category';
import { getSiteInfo } from '@/apis/home';
import { list as getLinks } from '@/apis/link';
import { list as getSocials } from '@/apis/social';
import { GlobalActions } from './actions_name';
import { GlobalMutations } from './mutations_name';
import { ActionContext, Getters, RootState } from './type';

type Context = ActionContext<RootState, Getters>;

export const ACTIONS = {
    async [GlobalActions.LOAD_SITE_INFO] ({ commit }: Context): Promise<void> {
        const { code, msg, data } = await getSiteInfo();
        if (code) {
            window.$showErr(msg || '服务器无法连接，请稍后再试');
            return;
        }

        commit(GlobalMutations.UPDATE_SITE_INFO, data);
    },
    async [GlobalActions.LOAD_LINK_LIST] ({ commit }: Context): Promise<void> {
        const { code, msg, data } = await getLinks();
        if (code) {
            window.$showErr(msg || '服务器无法连接，请稍后再试');
            return;
        }

        commit(GlobalMutations.UPDATE_LINK_LIST, data?.list);
    },
    async [GlobalActions.LOAD_SOCIAL_LIST] ({ commit }: Context): Promise<void> {
        const { code, msg, data } = await getSocials();
        if (code) {
            window.$showErr(msg || '服务器无法连接，请稍后再试');
            return;
        }

        commit(GlobalMutations.UPDATE_SOCIAL_LIST, data?.list);
    },
    async [GlobalActions.LOAD_ARTICLE_LIST] ({ commit }: Context): Promise<void> {
        const { code, msg, data } = await getArticles();
        if (code) {
            window.$showErr(msg || '服务器无法连接，请稍后再试');
            return;
        }

        commit(GlobalMutations.UPDATE_ARTICLE_LIST, data?.list);
        commit(GlobalMutations.UPDATE_CURRENT_ARTICLE_LIST);
    },
    async [GlobalActions.LOAD_CATEGORY_LIST] ({ commit }: Context): Promise<void> {
        const { code, msg, data } = await getCategories();
        if (code) {
            window.$showErr(msg || '服务器无法连接，请稍后再试');
            return;
        }

        commit(GlobalMutations.UPDATE_CATEGORY_LIST, data?.list);
    }
};
