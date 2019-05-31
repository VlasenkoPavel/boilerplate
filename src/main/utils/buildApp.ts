import { configDir } from './configDir';
import { ConfigFileChain, ConfigFactory, LogConfig, ServerConfig, PostgresConfig } from '@chaika/config';
import {
    LoggerFactory,
    ExpressLauncher,
    ExpressServer,
    TypeOrmLogger,
    TypeOrmConnector,
    ErrorHandlingMiddleware
} from '@chaika/app-components';
import { ApplicationBuilder } from '@chaika/application';

export const buildApp = async () => {
    const builder = await new ApplicationBuilder(ExpressLauncher)
        .buildComponent(new ConfigFileChain(configDir, process.env.SM_ENV as string))
        .buildWithParams(ConfigFactory, ['configFileChain'])
        .buildConfigs([LogConfig, ServerConfig, PostgresConfig]);

    const app = builder
        .buildWithParams(LoggerFactory, ['logConfig'])
        .setParameter('category', 'app')
        .buildByFactory('loggerFactory', ['category'])
        .buildComponent([ErrorHandlingMiddleware], 'middlewares')
        .buildComponent(ExpressServer)
        .buildComponent(TypeOrmLogger)
        .buildComponent(TypeOrmConnector)
        .create();

    return app;
};
