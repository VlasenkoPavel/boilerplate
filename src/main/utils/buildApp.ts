import { configDir } from './configDir';
import { ConfigFileChain, ConfigFactory, LogConfig, ServerConfig, PostgresConfig } from '@chaika/config';
import {
    LoggerFactory,
    ExpressLauncher,
    ExpressServer,
    TypeOrmLogger,
    TypeOrmConnector,
} from '@chaika/app-components';
import { ApplicationBuilder } from '@chaika/application';
import { buildMiddlewares } from './buildMiddlewares';

export const buildApp = async () => {
    const builder = await new ApplicationBuilder(ExpressLauncher)
        .addComponent(new ConfigFileChain(configDir, process.env.SM_ENV as string))
        .buildComponent(ConfigFactory, { args: ['configFileChain'] })
        .buildConfigs([LogConfig, ServerConfig, PostgresConfig]);

    const app = builder
        .buildComponent(LoggerFactory, { args: ['logConfig'] })
        .setParameter('loggerCategory', 'app')
        .addFactory('loggerFactory', 'logger', ['loggerCategory'])
        .addFactory(buildMiddlewares, 'middlewares')
        .buildComponent(ExpressServer)
        .buildComponent(TypeOrmLogger)
        .buildComponent(TypeOrmConnector)
        .create();

    return app;
};
