import { ExpressServer, ErrorHandlingMiddleware, Application, ConsoleApp, IContainer } from 'core';
import { ServerConfig, LogConfig, PostgresConfig } from '@chaika/config';
import { CommonAppContext } from './CommonAppContext';
import { Class } from '@domain/common';

export class AppContext extends CommonAppContext implements IContainer {
    protected configs: {
        log: LogConfig,
        postgres: PostgresConfig,
        server: ServerConfig
    };

    protected components: Map<Class<any>, object> = new Map();

    /** for routing-controllers */
    public get(identifier: any): any {
        return this.components.get(identifier);
    }

    get expressServer(): ExpressServer {
        const logger = this.loggerFactory.create('app');
        ErrorHandlingMiddleware.setLogger(logger);
        const server = new ExpressServer(this.configs.server, [ErrorHandlingMiddleware], logger);

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

    get errorHandlingMiddleware() {
        return new ErrorHandlingMiddleware();
    }

    public addComponentsAsClasses(...components: Class<any>[]): void {
        components.forEach(component => this.components.set(component, new component()));
    }

    public addComponentsAsInstances(...components: object[]): void {
        components.forEach(component => this.components.set(
            (component as any).__proto__.constructor as Class<any>, component
        ));
    }

    public async configure(): Promise<void> {
        await super.configure();
        this.configs.server = await this.configFactory.create(ServerConfig);
    }
}
