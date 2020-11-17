import { Injectable } from '@nestjs/common';
import { ConfigService, Link, SiteInfo, Social } from 'src/config/service';

@Injectable()
export class InfoService {
    constructor(private readonly config: ConfigService) {}

    public getLinks (): Link[] {
        return this.config.links;
    }

    public getSocials (): Social[] {
        return this.config.socials;
    }

    public getSiteInfo (): SiteInfo {
        return this.config.site;
    }
}
