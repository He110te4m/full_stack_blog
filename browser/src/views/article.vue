<template>
    <div class="article">
        <article class="article__container">
            <header class="container__title">{{ article.title }}</header>
            <div class="container__info">
                <span class="info__item">
                    <span class="info__label">
                        发布于：
                    </span>
                    <time class="info__value">{{ article.createdAt | renderDate }}</time>
                </span>
            </div>
            <section class="container__content article__content">
                <vue-markdown v-code :source="article.content" />
            </section>
            <footer class="container__copyright"></footer>
        </article>
    </div>
</template>

<style lang="less" scoped>
.article {
    max-width: 1024px;
    width: 96%;
    margin: 0 auto;
    position: relative;
    margin-bottom: 32px;

    .article__container {
        padding: 32px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 0.4rem 0.8rem -0.1rem rgba(0, 32, 128, 0.1),0 0 0 1px #f0f2f7;

        .container__title {
            font-size: 42px;
            font-weight: 400;
            color: #333;
            line-height: 50px;
            margin: 20px 0;
        }

        .container__info {
            color: #999;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            margin: 20px 0;

            .info__item + .info__item {
                margin-left: 20px;
            }
        }
    }
}
</style>

<script lang="ts">
import { get } from '@/apis/article';
import { Article } from '@/common/api_interface';
import { Component, Vue, Watch } from 'vue-property-decorator';

const DEFAULT_ARTICLE: Article = {
    id: '',
    title: '',
    desc: '',
    cover: '',
    content: '',
    createdAt: 0,
    category: '',
    categoryKey: ''
};

@Component
export default class Articles extends Vue {
    private article: Article = Object.assign({}, DEFAULT_ARTICLE);

    private get articleID (): number {
        return Number(this.$route.query.id);
    }

    @Watch('articleID', { immediate: true })
    private async loadArticle (): Promise<void> {
        const loading = this.$loading({});
        const { code, msg, data } = await get(this.articleID);
        loading.close();
        if (code) {
            this.$showErr(msg || '获取文章内容失败');
            return;
        }

        this.article = Object.assign({}, DEFAULT_ARTICLE, data);
    }
}
</script>
