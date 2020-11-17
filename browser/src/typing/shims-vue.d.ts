import Api from '@/apis';
import { Commit, Dispatch, Getters, RootState } from '@/store/type';
import { ElLoadingComponent, LoadingServiceOptions } from 'element-ui/types/loading';
import { ElMessageComponent } from 'element-ui/types/message';
import { ElMessageBoxShortcutMethod } from 'element-ui/types/message-box';

declare module 'vue/types/vue' {
    interface Vue {
        $api: typeof Api;

        $loading: (config: LoadingServiceOptions) => ElLoadingComponent;
        $ok: (text: string) => ElMessageComponent;
        $showErr: ElMessageBoxShortcutMethod;

        $state: RootState;
        $commit: Commit;
        $dispatch: Dispatch;
        $getters: Getters;
    }
}
