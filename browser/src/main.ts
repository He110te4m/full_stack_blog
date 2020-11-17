import { Button, Input, Loading, Message, MessageBox, Pagination } from 'element-ui';
import Vue from 'vue';
import VueMarkdown from 'vue-markdown';
import App from './app.vue';
import './directives';
import './filters';
import router from './router';
import store from './store';
import { GlobalActions } from './store/actions_name';

function initUtil (): void {
  Vue.config.productionTip = false;

  Vue.component('vue-markdown', VueMarkdown);

  Vue.use(Button);
  Vue.use(Input);
  Vue.use(Pagination);

  Vue.prototype.$loading = window.$loading = Loading.service;
  Vue.prototype.$ok = window.$ok = Message.success;
  Vue.prototype.$showErr = window.$showErr = MessageBox.alert;

  Vue.prototype.$state = store.state;
  Vue.prototype.$commit = store.commit;
  Vue.prototype.$getters = store.getters;
  Vue.prototype.$dispatch = store.dispatch;
}

function mountApp (): Vue {
  return new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount('#app');
}

async function initRemoteData (): Promise<void> {
  await Promise.all([
    store.dispatch(GlobalActions.LOAD_SITE_INFO)
  ]);
}

async function init (): Promise<void> {
  initUtil();
  await initRemoteData();
  mountApp();
}

init();
