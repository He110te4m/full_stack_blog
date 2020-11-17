import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

const Info = require('./info.json');
const ArticleInfo = require('./article.json');

const ARTICLES_PATH = path.join(__dirname, './articles');

export type EnvConfig = Record<string, string>;
export interface Server {
    port: number;
};

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
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test', 'provision')
                .default('development'),

            SERVER_PORT: Joi.number().default(3000)
        });

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    public get server (): Server {
        return {
            port: Number(this.envConfig.SERVER_PORT),
        };
    }

    public get links (): Link[] {
        return Info.links;
    }

    public get socials (): Social[] {
        return Info.socials;
    }

    public get site (): SiteInfo {
        return Info.site;
    }

    public get categories (): Category[] {
        return Object.values(ArticleInfo.category);
    }

    public get articles (): Article[] {
        return ArticleInfo.articles;
    }

    public getArticleContent (id: string): string {
        let filename = path.join(ARTICLES_PATH, `./${id}.md`);

        let isExists = fs.existsSync(filename);
        if (!isExists) {
            return '';
        }

        return String(fs.readFileSync(filename));
    }

    public getCategory (key: string): string {
        return ArticleInfo.category[key]?.title || '';
    }
}
