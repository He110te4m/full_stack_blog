import { Controller, Get } from '@nestjs/common';
import { CodeStatus, generateApiReturn } from 'src/util/status';
import { InfoService } from './service';

@Controller('info')
export class InfoController {
    constructor(private readonly service: InfoService) {
    }

    @Get('links')
    public getLinks (): ApiReturn {
        return generateApiReturn(CodeStatus.SUCCESS, {
            list: this.service.getLinks()
        });
    }

    @Get('socials')
    public getSocials (): ApiReturn {
        return generateApiReturn(CodeStatus.SUCCESS, {
            list: this.service.getSocials()
        });
    }

    @Get('site')
    public getSiteInfo (): ApiReturn {
        return generateApiReturn(CodeStatus.SUCCESS, this.service.getSiteInfo());
    }
}
