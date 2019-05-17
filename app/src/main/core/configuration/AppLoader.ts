import { Container, interfaces } from 'inversify';

import { Type } from '../Type';
import { ServerConfig } from '../components/config-validators/ServerConfig';
import { Application } from '../Application';
import { ExpressServer } from '../components/ExpressServer';
import { Provider, ProvideLogger } from './types';
import { ErrorHandlingMiddleware } from '@core/components/middlewares/ErrorHandlingMiddleware';
import { ConfigFactory } from '@c7s/config';
import { CommonAppLoader } from './CommonAppLoader';
import { IConnector } from '@core/types';

export class AppLoader extends CommonAppLoader {
    public load(container: Container) {
        super.load(container);

        /** middleware */
        container.bind(ErrorHandlingMiddleware).toSelf();

        container.bind<Provider<ServerConfig>>(Type.ServerConfigProvider).toProvider<ServerConfig>(
            (context: interfaces.Context) => async() =>
                await this.getComponent<ConfigFactory>(context, Type.ConfigFactory)
                    .create<ServerConfig>(ServerConfig)
        );

        container
            .bind<Provider<ExpressServer>>(Type.ServerProvider)
            .toProvider<ExpressServer>((context: interfaces.Context) => async () => {
                const logger = await this.getComponent<ProvideLogger>(context, Type.LoggerProvider)('app');
                const config = await this.getComponent<Provider<ServerConfig>>(context, Type.ServerConfigProvider)();
                context.container.bind(Type.Logger).toConstantValue(logger);
                const middlewares = [ErrorHandlingMiddleware];
                const server = new ExpressServer(config, middlewares, logger, context.container);

                return server;
            });

        container.bind<Provider<Application>>(Type.ApplicationProvider).toProvider<Application>(
            (context: interfaces.Context) => async () => {
                const sever: ExpressServer
                    = await this.getComponent<Provider<ExpressServer>>(context, Type.ServerProvider)();
                const connector: IConnector
                    = await this.getComponent<Provider<IConnector>>(context, Type.ProvideConnector)();

                return new Application(connector, sever);
            });
    }
}
