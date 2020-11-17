import { Article, Category, Link, Social } from '@/common/api_interface';
import Vue from 'vue';
import Vuex from 'vuex';
import { ACTIONS } from './actions';
import { GETTERS } from './getters';
import { MUTATIONS } from './mutations';

Vue.use(Vuex);

export const DEFAULT_LIMIT = 10;
export const DEFAULT_FILTER = {
    category: '',
    keyword: '',
    date: ''
};

export const ROOT_STATE = {
    info: {
        name: 'He110\'s Blog',
        author: 'He110',
        desc: '',
        case_info: ''
    },
    filter: Object.assign({}, DEFAULT_FILTER),
    pager: {
        page: 1,
        limit: DEFAULT_LIMIT
    },
    categories: [] as Category[],
    originArticles: [] as Article[],
    articles: [] as Article[],
    links: [] as Link[],
    socials: [] as Social[]
};

export default new Vuex.Store({
    state: ROOT_STATE,
    mutations: MUTATIONS,
    actions: ACTIONS,
    getters: GETTERS,
    modules: {
    }
});
