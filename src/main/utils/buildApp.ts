import { configDir } from './configDir';
import { ConfigFileChain, ConfigFactory, LogConfig, ServerConfig, PostgresConfig } from '@chaika/config';
import { LoggerFactory, ExpressLauncher, ExpressServer, TypeOrmLogger, TypeOrmConnector } from '@chaika/app-components';
import { ApplicationBuilder } from '@chaika/application';

export const buildApp = async () => {
    const configFactory = new ConfigFactory(new ConfigFileChain(configDir, process.env.SM_ENV as string));
    const logConfig = await configFactory.create(LogConfig);
    const loggerFactory = new LoggerFactory(logConfig);
    const logger = loggerFactory.create('app');

    const builder = new ApplicationBuilder(ExpressLauncher);
    await builder.buildConfigs(configFactory, [LogConfig, ServerConfig, PostgresConfig]);

    const app =
        builder
            .buildComponent(logConfig)
            .buildComponent(ExpressServer)
            .buildComponent(logger)
            .buildComponent(TypeOrmLogger)
            .buildComponent(TypeOrmConnector)
            .create();

    await app.init();

    return app;
};
