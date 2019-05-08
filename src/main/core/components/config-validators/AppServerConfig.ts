import { injectable } from 'inversify';
import { IsNotEmpty, Matches } from 'class-validator';
import { ServerConfig } from '@c7s/config';

@injectable()
export class AppServerConfig extends ServerConfig {
    @IsNotEmpty()
    @Matches(/^(([a-z0-9]*)|(\.\/)|((\.\.\/)*))(\/*([a-z0-9]+\/)*)/)
    public controllers!: string;

    @IsNotEmpty()
    @Matches(/^(([a-z0-9]*)|(\.\/)|((\.\.\/)*))(\/*([a-z0-9]+\/)*)/)
    public public!: string;

    // @IsNotEmpty()
    // @IsString()
    // public env!: string;

    // public getDefaults(): Object {
    //     return {
    //         ...super.getDefaults(),
    //         controllers: path.resolve(__dirname, '../../application/controllers/*.js'),
    //     };
    // }
}
