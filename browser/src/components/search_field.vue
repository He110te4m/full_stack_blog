<template>
    <div class="search-field">
        <el-input v-model="keyword"
                  :size="size"
                  :placeholder="placeholder"
                  @keyup.enter.native="onSearch()">
            <template slot="prefix">
                <slot name="prefix"></slot>
            </template>
            <template slot="suffix">
                <slot name="suffix">
                    <i class="el-input__icon el-icon-close"
                       :class="{ 'hand': !!keyword }"
                       slot="suffix"
                       @click="onClear()"></i>
                    <i class="el-input__icon hand el-icon-search"
                       slot="suffix"
                       @click="onSearch()"></i>
                </slot>
            </template>
        </el-input>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

export enum Size {
    small = 'mini',
    medium = 'small',
    large = 'medium'
}

@Component
export default class Nav extends Vue {
    @Prop({ type: String, default: '请输入内容' })
    public readonly placeholder!: string;

    @Prop({ type: String, default: Size.small })
    public readonly size!: Size;

    @Prop({ type: String, default: '' })
    public readonly value!: string;

    private keyword = '';

    @Watch('keyword')
    private onChange (): void {
        this.$emit('input', this.keyword);
        this.$emit('change', this.keyword);
    }

    @Watch('value')
    private onInput (): void {
        this.keyword = this.value;
    }

    created (): void {
        this.keyword = this.value || '';
    }

    private onClear (): void {
        this.$emit('clear');
    }

    private onSearch (): void {
        this.$emit('search', this.keyword);
    }
}
</script>
