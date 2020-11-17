import { ElLoadingComponent, LoadingServiceOptions } from "element-ui/types/loading";
import { ElMessageComponent } from "element-ui/types/message";
import { ElMessageBoxShortcutMethod } from "element-ui/types/message-box";

declare global {
    type SafeAny = any;

    interface ApiReturn {
        code: number;
        msg: string;
        data?: SafeAny;
    }

    interface Window {
        $loading: (config: LoadingServiceOptions) => ElLoadingComponent;
        $ok: (text: string) => ElMessageComponent;
        $showErr: ElMessageBoxShortcutMethod;
    }
}
