<template>
    <nav class="nav">
        <div class="nav__left">
            <h1 class="left__title">
                <router-link class="h-link title__link" to="/">{{ siteName }}</router-link>
            </h1>
            <dl class="left__list">
                <dd class="list__nav"
                    v-for="(nav, navIdx) in navList"
                    :key="`nav-${navIdx}`">
                    <router-link class="h-link nav__link" :to="nav.href">{{ nav.title }}</router-link>
                </dd>
            </dl>
        </div>
        <div class="nav__right">
            <div class="right__toolbar">
                <search-field v-model="keyword"
                              @clear="onClear()"
                              @search="onSearch" />
            </div>
        </div>
    </nav>
</template>

<style lang="less">
.nav {
    display: flex;
    height: 80px;
    align-items: center;
    justify-content: space-between;

    .nav__left {
        display: flex;
        align-items: center;

        .left__title {
            font-size: 24px;
            margin: 0;

            .title__link {
                font-weight: bold;
            }
        }

        .left__list {
            display: flex;
            align-items: center;
            margin: 0;

            .list__nav {
                margin-left: 32px;

                .nav__link {
                    font-size: 14px;
                }
            }
        }
    }
}
</style>

<script lang="ts">
import { Category } from '@/common/api_interface';
import { GlobalActions } from '@/store/actions_name';
import { Component, Vue, Watch } from 'vue-property-decorator';
import SearchField from './search_field.vue';

interface NavItem {
    href: string;
    title: string;
}

@Component({
    components: {
        SearchField
    }
})
export default class Nav extends Vue {
    private keyword = '';

    private get siteName (): string {
        return this.$state.info.name;
    }

    private get navList (): NavItem[] {
        return this.$state.categories.map((item: Category): NavItem => ({
            title: item.title,
            href: `/home?category=${item.key}`
        }));
    }

    @Watch('$route.query.keyword')
    private onSearchQueryChange (): void {
        this.keyword = String(this.$route.query.keyword || '');
    }

    created (): void {
        this.keyword = String(this.$route.query.keyword || '');
    }

    mounted (): void {
        this.loadData();
    }

    private async loadData (): Promise<void> {
        const loading = this.$loading({});
        await this.$dispatch(GlobalActions.LOAD_CATEGORY_LIST);
        loading.close();
    }

    private onClear (): void {
        if (!!this.keyword) {
            this.$router.push('/');
        }
    }

    private onSearch (keyword: string): void {
        if (!keyword) {
            this.onClear();
            return;
        }

        this.$router.push(`/home?keyword=${keyword}`);
    }
}
</script>
