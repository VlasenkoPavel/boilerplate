import { Class, ICommand, ApplicationBuilder, Application } from '@chaika/application';
import { ConfigFactory, ConfigFileChain, LogConfig, PostgresConfig } from '@chaika/config';
import { CommandLauncher, LoggerFactory, TypeOrmLogger, TypeOrmConnector } from '@chaika/app-components';
import { configDir } from './configDir';

export const buildConsoleApp = async (commands: Class<ICommand>[]): Promise<Application> => {
    const configFactory = new ConfigFactory(new ConfigFileChain(configDir, process.env.SM_ENV as string));
    const logConfig = await configFactory.create(LogConfig);
    const loggerFactory = new LoggerFactory(logConfig);
    const logger = loggerFactory.create('app');

    const builder = new ApplicationBuilder(CommandLauncher);
    await builder.buildConfigs(configFactory, [PostgresConfig]);

    const app =
        builder
            .buildComponent(logger)
            .buildComponent(TypeOrmLogger)
            .buildComponent(TypeOrmConnector)
            .buildCommands(commands)
            .create();

    await app.init();

    return app;
};
