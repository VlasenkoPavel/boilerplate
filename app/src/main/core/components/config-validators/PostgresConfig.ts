import { injectable } from 'inversify';
import { Config } from '@c7s/config';
import { IsString, IsArray, Matches, IsNotEmpty } from 'class-validator';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@injectable()
export class PostgresConfig extends Config implements PostgresConnectionOptions {
    public type: 'postgres' = 'postgres';

    @IsNotEmpty()
    public host!: string;

    @IsNotEmpty()
    @IsString()
    public database!: string;

    @IsNotEmpty()
    @IsString()
    public username!: string;

    @IsNotEmpty()
    @IsString()
    public password!: string;

    @IsString({ each: true })
    @Matches(/^(([a-z0-9]*)|(\.\/)|((\.\.\/)*))(\/*([a-z0-9]+\/)*)/, { each: true })
    @IsArray()
    public entities: string[];

    @IsString({ each: true })
    @Matches(/^(([a-z0-9]*)|(\.\/)|((\.\.\/)*))(\/*([a-z0-9]+\/)*)/, { each: true })
    @IsArray()
    public migrations: string[];

    public async validate() {
        super.validate();
        super.validateIpOrHostname(this.host, 'host');
    }

    public getName(): string {
        return 'db';
    }
}
