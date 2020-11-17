import { Injectable } from '@nestjs/common';
import { Article, Category, ConfigService } from 'src/config/service';

@Injectable()
export class ArticleService {
    constructor(private readonly config: ConfigService) {}

    public getCategoryList (): Category[] {
        return this.config.categories;
    }

    public getArticleList (): Article[] {
        return this.config.articles.slice().sort((prev: Article, next: Article): number => next.createdAt - prev.createdAt);
    }

    public getArticleByID(id: string): Article | {} {
        let article = this.config.articles.find((article: Article): boolean => article.id === id);
        if (!article) {
            return {};
        }

        article.content = this.config.getArticleContent(id);
        article.category = this.config.getCategory(article.categoryKey);

        return article;
    }
}
