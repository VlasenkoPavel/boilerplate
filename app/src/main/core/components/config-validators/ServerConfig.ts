import { injectable } from 'inversify';
import { IsNotEmpty, Matches } from 'class-validator';
import { ServerConfig as BaseServerConfig } from '@c7s/config';

@injectable()
export class ServerConfig extends BaseServerConfig {
    @IsNotEmpty()
    @Matches(/^(([a-z0-9]*)|(\.\/)|((\.\.\/)*))(\/*([a-z0-9]+\/)*)/)
    public controllers!: string;

    @IsNotEmpty()
    @Matches(/^(([a-z0-9]*)|(\.\/)|((\.\.\/)*))(\/*([a-z0-9]+\/)*)/)
    public public!: string;
}
