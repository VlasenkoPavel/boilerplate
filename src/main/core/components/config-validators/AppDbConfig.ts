import { injectable } from 'inversify';
import { IsBoolean } from 'class-validator';
import { DbConfig } from '@c7s/config';

@injectable()
export class AppDbConfig extends DbConfig {
    // @IsNotEmpty()
    // @Matches(/^([a-z]:)*(\/*(\.*[a-z0-9]+\/)*(\.*[a-z0-9]+))/)
    // public models!: string[];
    public entities: string[];
    public migrations: string[];
    @IsBoolean()
    public logging: boolean;

    public getDefaults(): Object {
        return {
            type: 'postgres',
            logging: 'all',
            cli: {
                migrationsDir: 'dist/main/infrastructure/migrations/*.js'
            }
        };
    }
}
