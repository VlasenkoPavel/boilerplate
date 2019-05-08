import { DbConfig } from '@c7s/config';
import { Connection, createConnection, Logger } from 'typeorm';
import { IConnector } from '@core/types';

export class DbConnector implements IConnector {
    private config: DbConfig;
    private connection!: Connection;
    private logger?: Logger;

    constructor(config: DbConfig, logger?: Logger) {
        this.config = config;
        this.logger = logger;
    }

    public async connect(): Promise<void> {
        this.connection = await createConnection({
            ...this.config,
            logger: this.logger
        });
    }

    public async closeConnection(): Promise<void> {
        await this.connection.close();
    }
}
