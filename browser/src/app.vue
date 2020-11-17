<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="less">
@import './assets/style/index.less';
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
}
</script>
