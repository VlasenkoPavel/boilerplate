import { Connection, createConnection, Logger } from 'typeorm';
import { IConnector } from '@core/types';
import { PostgresConfig } from './config-validators/PostgresConfig';

export class DbConnector implements IConnector {
    private config: PostgresConfig;
    private connection!: Connection;
    private logger?: Logger;

    constructor(config: PostgresConfig, logger?: Logger) {
        this.config = config;
        this.logger = logger;
    }

    public async connect(): Promise<void> {
        this.connection = await createConnection({
            ...this.config,
            logger: this.logger
        });
    }

    public async disconnect(): Promise<void> {
        await this.connection.close();
    }
}
