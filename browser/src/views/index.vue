<template>
    <div class="index">
        <header class="header">
            <navbar class="content-width" />
        </header>
        <main class="main">
            <router-view />
        </main>
        <footer class="footer">
            <footerbar class="content-width" />
        </footer>
    </div>
</template>

<style lang="less" scoped>
.index {
    .header {
        box-shadow: 0 8px 12px -2px rgba(0, 32, 128, 0.1);
        margin-bottom: 16px;
        background: #ffffffe6;

        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: linear-gradient(to right, #0e88eb, #00a672);
        }
    }

    .footer {
        border-top: 1px solid #eee;
        line-height: 80px;
        background: #ffffffe6;
    }

    .content-width {
        width: 96%;
        max-width: 1024px;
        margin: 0 auto;
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from '../components/nav.vue';
import Footerbar from '../components/footer.vue';

@Component({
    components: {
        Navbar,
        Footerbar
    }
})
export default class Index extends Vue {
}
</script>
