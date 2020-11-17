import { Controller, Get, Query } from '@nestjs/common';
import { CodeStatus, generateApiReturn } from 'src/util/status';
import { ArticleService } from './service';

@Controller('article')
export class ArticleController {
    constructor(private readonly service: ArticleService) {
    }

    @Get()
    public getArticle (@Query('id') id: string): ApiReturn {
        return generateApiReturn(CodeStatus.SUCCESS, this.service.getArticleByID(id));
    }

    @Get('list')
    public getAllArticle (): ApiReturn {
        return generateApiReturn(CodeStatus.SUCCESS, {
            list: this.service.getArticleList()
        });
    }

    @Get('categories')
    public getAllCategory (): ApiReturn {
        return generateApiReturn(CodeStatus.SUCCESS, {
            list: this.service.getCategoryList()
        });
    }
}
