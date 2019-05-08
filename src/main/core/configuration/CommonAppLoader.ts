import { Container, interfaces } from 'inversify';
import * as path from 'path';

import { Type } from '../Type';
import { buildProviderModule } from 'inversify-binding-decorators';
import { ConfigFileChain, ConfigFactory, LogConfig } from '@c7s/config';
import { AppDbConfig } from '../components/config-validators/AppDbConfig';
import { TypeormLogger } from '../components/TypeormLogger';
import { Logger } from 'log4js';
import { LoggerFactory } from '../components/LoggerFactory';
import { Provider, ProvideLogger } from './types';
import { Loader } from './Loader';
import { DbConnector } from '@core/components/DbConnector';
import { IConnector } from '..';

export abstract class CommonAppLoader extends Loader {
    public load(container: Container) {
        container.load(buildProviderModule());
        const configSource = new ConfigFileChain(
            this.makePath('../config'), process.env.SM_ENV as string
        );

        container.bind<ConfigFactory>(Type.ConfigFactory).toConstantValue(new ConfigFactory(configSource));

        container.bind<Provider<LogConfig>>(Type.LogConfigProvider).toProvider<LogConfig>(
            (context: interfaces.Context) => async() =>
                await this.getComponent<ConfigFactory>(context, Type.ConfigFactory)
                    .create<LogConfig>(LogConfig)
        );

        container.bind<Provider<AppDbConfig>>(Type.DbConfigProvider).toProvider<AppDbConfig>(
            (context: interfaces.Context) => async() =>
                await this.getComponent<ConfigFactory>(context, Type.ConfigFactory)
                    .create<AppDbConfig>(AppDbConfig)
        );

        container.bind<Provider<LoggerFactory>>(Type.LoggerFactoryProvider).toProvider<LoggerFactory>(
            (context: interfaces.Context) => async() => {
                const config = await this.getComponent<Provider<LogConfig>>(context, Type.LogConfigProvider)();

                return new LoggerFactory(config);
            }
        );

        container.bind<ProvideLogger>(Type.LoggerProvider).toProvider<Logger>(
            (context: interfaces.Context) => async(category: string) => {
                const factory = await this.getComponent<Provider<LoggerFactory>>(context, Type.LoggerFactoryProvider)();

                return factory.create(category);
            }
        );

        container.bind<Provider<IConnector>>(Type.ProvideConnector).toProvider<IConnector>(
            (context: interfaces.Context) => async () => {
                const config = await (context.container.get(Type.DbConfigProvider) as Provider<AppDbConfig>)();
                config.entities = config.entities.map(this.makePath);
                config.migrations = config.migrations.map(this.makePath);
                const logger = await ((context.container.get(Type.LoggerProvider) as ProvideLogger))('db');

                return new DbConnector(config, new TypeormLogger(logger));
            });
    }

    protected makePath(filePath: string) {
        return path.resolve(__dirname, '../../../', filePath);
    }
}
