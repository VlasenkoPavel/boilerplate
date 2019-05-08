import * as path from 'path';
import { injectable } from 'inversify';
import { IsNotEmpty, IsString } from 'class-validator';
import { ServerConfig } from '@c7s/config';

@injectable()
export class AppServerConfig extends ServerConfig {
    @IsNotEmpty()
    @IsString()
    // @Matches(/^([a-z]:)*(\/*(\.*[a-z0-9]+\/)*(\.*[a-z0-9]+))/)
    public controllers!: string;

    @IsNotEmpty()
    @IsString()
    // @Matches(/^([a-z]:)*(\/*(\.*[a-z0-9]+\/)*(\.*[a-z0-9]+))/)
    public public!: string;

    @IsNotEmpty()
    @IsString()
    public env!: string;

    public getDefaults(): Object {
        return {
            ...super.getDefaults(),
            controllers: path.resolve(__dirname, '../../application/controllers/*.js'),
        };
    }

}
