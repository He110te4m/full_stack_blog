import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';
import Vue from 'vue';

Vue.directive('code', (el: HTMLElement): void => {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: Element): void => {
        hljs.highlightBlock(block);
    });
});
