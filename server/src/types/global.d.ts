type SafeAny = any;
interface AnyObject {
    [key: string]: SafeAny;
}

interface ApiReturn {
    code: number;
    msg?: string;
    data?: any;
}

interface PagerParams {
    start: number;
    limit: number;
    search: string;
}
