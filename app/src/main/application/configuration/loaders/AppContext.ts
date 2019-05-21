import { ExpressServer, ErrorHandlingMiddleware, Application, ConsoleApp, IContainer } from 'core';
import { ServerConfig, LogConfig, PostgresConfig } from '@chaika/config';
import { CommonAppContext } from './CommonAppContext';
import { UserController } from '@application/controllers/UserController';

export class AppContext extends CommonAppContext implements IContainer {
    protected configs: {
        log: LogConfig,
        postgres: PostgresConfig,
        server: ServerConfig
    };

    protected components: Map<any, any> = new Map();

    /** for routing-controllers */
    public get(identifier: any): any {
        return this.components.get(identifier);
    }

    get expressServer(): ExpressServer {
        const server = new ExpressServer(
            this.configs.server,
            [ErrorHandlingMiddleware],
            this.loggerFactory.create('app'),
            this
        );

        return server;
    }

    get consoleApp(): ConsoleApp {
        return new ConsoleApp(this.dbConnector);
    }

    get application(): Application {
        return new Application(this.dbConnector, this.expressServer);
    }

    get postgresConfig(): PostgresConfig {
        return this.configs.postgres;
    }

    public async configure(): Promise<void> {
        await super.configure();
        this.setRoutingControllersComponents();
        this.configs.server = await this.configFactory.create(ServerConfig);
    }

    /** for routing-controllers */
    private setRoutingControllersComponents() {
        this.components.set(UserController, new UserController());
        this.components.set(ErrorHandlingMiddleware, new ErrorHandlingMiddleware(this.loggerFactory.create('app')));
    }
}
