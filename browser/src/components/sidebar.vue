<template>
    <aside class="sidebar">
        <dl class="sidebar__time-line">
            <dd class="time-line--item"
                v-for="(item, idx) in timelineList"
                :key="`time-line-${idx}`">
                <router-link class="time-line__date h-link" :to="`/home?date=${item.date}`">{{ item.date }}</router-link>
                <span class="time-line__count">{{ item.count | renderCount }}</span>
            </dd>
        </dl>
        <dl class="sidebar__links">
            <dd class="links__item"
                v-for="(link, idx) in linkList"
                :key="`link-${idx}`">
                <a class="h-link"
                   target="_blank"
                   :href="link.url"
                   :title="link.desc">{{ link.title }}</a>
            </dd>
        </dl>
    </aside>
</template>

<style lang="less">
    @itemHeight: 20px;

    .sidebar {
        font-size: 12px;

        .sidebar__time-line,
        .sidebar__links {
            padding: 16px;
            border-radius: 2px;
            background-color: #fff;
        }

        .sidebar__time-line {
            display: flex;
            flex-direction: column;

            .time-line--item {
                flex: 0 0 @itemHeight;
                line-height: @itemHeight;
                display: flex;
                justify-content: space-between;
            }
        }

        .sidebar__links {
            display: flex;
            flex-direction: column;

            .links__item {
                flex: 0 0 @itemHeight;
                line-height: @itemHeight;
            }
        }
    }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { format, subDays } from 'date-fns';
import { GlobalActions } from '../store/actions_name';
import { Link, Timeline } from '@/common/api_interface';

@Component({
    filters: {
        renderCount (v: number): string {
            return `${v} 篇`;
        }
    }
})
export default class Sidebar extends Vue {
    private get timelineList (): Timeline[] {
        return this.$getters.recentlyArticles;
    }

    private get linkList (): Link[] {
        return this.$state.links;
    }

    mounted (): void {
        this.init();
    }

    private async init (): Promise<void> {
        const loading = this.$loading({});
        await this.$dispatch(GlobalActions.LOAD_LINK_LIST);
        loading.close();
    }
}
</script>
