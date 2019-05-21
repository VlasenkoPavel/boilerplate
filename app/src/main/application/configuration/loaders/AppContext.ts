import { ExpressServer, ErrorHandlingMiddleware, Application } from 'core';
import { ServerConfig, LogConfig, PostgresConfig } from '@chaika/config';
import { CommonAppContext } from './CommonAppContext';

export class AppContext extends CommonAppContext {
    protected configs: {
        log: LogConfig,
        postgres: PostgresConfig,
        server: ServerConfig
    };

    get expressServer(): ExpressServer {
        const server = new ExpressServer(
            this.configs.server,
            [ErrorHandlingMiddleware],
            this.loggerFactory.create('app')
        );

        return server;
    }

    get application(): Application {
        return new Application(this.dbConnector, this.expressServer);
    }

    public async configure(): Promise<void> {
        await super.configure();
        this.configs.server = await this.configFactory.create(ServerConfig);
    }
}
