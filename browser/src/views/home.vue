<template>
    <div class="home">
        <article-list class="home__articles" />
        <sidebar class="home__sidebar" />
    </div>
</template>

<style lang="less" scoped>
.home {
    display: flex;
    max-width: 1024px;
    width: 96%;
    margin: 0 auto;

    .home__articles {
        flex: 1 1 auto;
        margin-right: 16px;
    }

    .home__sidebar {
        flex: 0 0 200px;
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ArticleList from '../components/article_list.vue';
import Sidebar from '../components/sidebar.vue';

@Component({
    components: {
        ArticleList,
        Sidebar
    }
})
export default class Home extends Vue {
}
</script>
