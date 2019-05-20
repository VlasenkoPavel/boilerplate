import * as path from 'path';

import { DbConnector, TypeormLogger, LoggerFactory } from 'core';
import { PostgresConfig, ConfigFileChain, ConfigFactory, LogConfig } from '@chaika/config';

export abstract class CommonAppContext {
    protected configs: {
        log: LogConfig,
        postgres: PostgresConfig
    }

    get configSource() {
        return new ConfigFileChain(this.makePath('../config'), process.env.SM_ENV as string);
    }

    get configFactory() {
        return new ConfigFactory(this.configSource);
    }

    get loggerFactory() {
        return new LoggerFactory(this.configs.log);
    }

    get dbLogger() {
        return new TypeormLogger(this.loggerFactory.create('db'));
    }

    get dbConnector() {
        return new DbConnector(this.configs.postgres, this.dbLogger)
    }

    public async configure(): Promise<void> {
        this.configs.log = await this.configFactory.create(LogConfig);
        await this. configurePostgres();
    }

    protected makePath(filePath: string) {
        return path.resolve(__dirname, '../../../', filePath);
    }

    private async configurePostgres() {
        this.configs.postgres = await this.configFactory.create(PostgresConfig);
        this.configs.postgres.entities = this.configs.postgres.entities.map(this.makePath);
        this.configs.postgres.migrations = this.configs.postgres.migrations.map(this.makePath);
    }
}
