<template>
    <p class="copyright">
        <span class="copyright__text">Copyright</span>
        <span class="copyright__text">©</span>
        <span class="copyright__text">
            <router-link class="h-link" to="/">{{ siteName }}</router-link>
        </span>
        <span class="copyright__text">
            <a class="h-link"
               href="http://www.beian.miit.gov.cn/"
               target="_blank">{{ caseInfo }}</a>
        </span>
    </p>
</template>

<style lang="less">
.copyright {
    display: flex;

    .copyright__text + .copyright__text {
        margin-left: 10px;
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export default class Footer extends Vue {
    private get siteName (): string {
        return this.$state.info.name;
    }

    private get caseInfo (): string {
        return this.$state.info.case_info;
    }
}
</script>
