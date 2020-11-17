<template>
    <div class="article-list">
        <dl class="article-list__list">
            <dd class="list__article"
                v-for="(article, idx) in articleList"
                :key="`article-${idx}`">
                <router-link class="article__title hand"
                             tag="div"
                             :to="`article?id=${article.id}`">
                    {{ article.title }}
                </router-link>
                <router-link class="article__desc hand"
                             tag="div"
                             :to="`article?id=${article.id}`">
                    {{ article.desc }}
                </router-link>
                <div class="article__front-cover" v-if="article.cover">
                    <img class="article__front-cover--img"
                        alt=""
                        :src="article.cover" />
                </div>
                <div class="article__info">
                    <div class="info__date">{{ article.createdAt | renderDate }}</div>
                </div>
            </dd>
        </dl>

        <el-pagination class="article-list__pager"
                        background
                        hide-on-single-page
                        layout="prev, pager, next"
                        :page-size="limit"
                        :total="total"
                        @current-change="onPageChange" />
    </div>
</template>

<style lang="less">
    @titleHeight: 32px;
    @infoHeight: 20px;
    .article-list {
        .article-list__pager {
            margin-bottom: 32px;
        }

        .article-list__list {
            display: flex;
            flex-direction: column;

            .list__article {
                display: flex;
                flex-direction: column;
                padding: 16px;
                background: #ffffffe6;
                margin-bottom: 16px;
                box-shadow: 0 0.4rem 0.8rem -0.1rem rgba(0, 32, 128, 0.1),0 0 0 1px #f0f2f7;
                transition: box-shadow .3s;

                .article__title {
                    flex: 0 0 @titleHeight;
                    line-height: @titleHeight;
                    font-size: 24px;
                    margin-bottom: 20px;
                }

                .article__desc {
                    margin-bottom: 20px;
                }

                .article__front-cover {
                    margin: 20px 0;

                    .article__front-cover--img {
                        max-width: 100%;
                        height: auto;
                        box-sizing: border-box;
                    }
                }

                .article__info {
                    font-size: 14px;
                    flex: 0 0 @infoHeight;
                    line-height: @infoHeight;
                }

                &:hover {
                    box-shadow: 0 14px 25px rgba(0, 0, 0, 0.16);
                }
            }
        }
    }
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { GlobalActions } from '@/store/actions_name';
import { Article } from '@/common/api_interface';
import { GlobalMutations } from '@/store/mutations_name';
import { RootState } from '@/store/type';

@Component
export default class ArticleList extends Vue {
    private get total (): number {
        return this.$getters.articleCount;
    }

    private get limit (): number {
        return this.$state.pager.limit;
    }

    private get articleList (): Article[] {
        return this.$getters.currentPageArticles;
    }

    @Watch('$route.query.keyword')
    @Watch('$route.query.category')
    @Watch('$route.query.date')
    private onQueryParams (): void {
        this.$commit(GlobalMutations.UPDATE_FILTER, this.$route.query as RootState['filter']);
        this.$commit(GlobalMutations.UPDATE_CURRENT_ARTICLE_LIST);
    }

    created (): void {
        this.$commit(GlobalMutations.UPDATE_FILTER, this.$route.query as RootState['filter']);
    }

    mounted (): void {
        this.loadData();
    }

    public async loadData (): Promise<void> {
        const loading = this.$loading({});
        await this.$dispatch(GlobalActions.LOAD_ARTICLE_LIST);
        loading.close();
    }

    private onPageChange (page: number): void {
        this.$commit(GlobalMutations.UPDATE_CURRENT_PAGE, page);
        window.scrollTo({
            left: 0,
            top: 0
        });
    }
}
</script>
