import { Module } from '@nestjs/common';
import { InfoController } from './controller';
import { InfoService } from './service';

@Module({
    controllers: [ InfoController ],
    providers: [ InfoService ]
})
export class InfoModule {
}
