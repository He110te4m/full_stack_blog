import { Module } from '@nestjs/common';
import { ArticleController } from './controller';
import { ArticleService } from './service';

@Module({
    controllers: [ ArticleController ],
    providers: [ ArticleService ]
})
export class ArticleModule {
}
