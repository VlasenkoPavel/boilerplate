import { ConfigFileChain, ConfigFactory, DbConfig } from '@c7s/config';
import * as path from 'path';
import { Connection, createConnection } from 'typeorm';

export class DbConnector {
    private configFactory: ConfigFactory;
    private connection!: Connection;

    constructor() {
        const configSource = new ConfigFileChain(
            path.resolve(__dirname, '../../../../config'),
            process.env.SM_ENV as string
        );
        this.configFactory = new ConfigFactory(configSource);
    }

    public async connect() {
        const config = await this.configFactory.create<DbConfig>(DbConfig);
        this.connection = await createConnection(config);
    }

    public close(): Promise<void> {
        return this.connection.close();
    }
}
