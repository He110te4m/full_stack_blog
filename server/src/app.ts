import { Module } from '@nestjs/common';
import { ArticleModule } from './article/module';
import { ConfigModule } from './config/module';
import { InfoModule } from './info/module';

@Module({
    imports: [
        ConfigModule,
        ArticleModule,
        InfoModule
    ]
})
export class GlobalModule {
}
