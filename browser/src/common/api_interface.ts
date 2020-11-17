
type TitleField = Record<'title', string>;
type UrlField = Record<'url', string>;
type DescField = Record<'desc', string>;
export type Link = TitleField & UrlField & DescField & Record<'avatar', string>;
export type Social = TitleField & UrlField & Record<'icon', string>;
export interface SiteInfo {
    author: string;
    name: string;
    desc: string;
    case_info: string;
}
export type Category = TitleField & DescField & {
    key: string;
};
export type Article = TitleField & DescField & {
    id: string;
    createdAt: number;
    categoryKey: string;
    cover: string;

    content?: string;
    category?: string;
};
export interface Timeline {
    date: string;
    count: number;
}

