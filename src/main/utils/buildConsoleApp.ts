import { Class, ICommand, ApplicationBuilder, Application } from '@chaika/application';
import { ConfigFactory, ConfigFileChain, LogConfig, PostgresConfig } from '@chaika/config';
import { CommandLauncher, LoggerFactory, TypeOrmLogger, TypeOrmConnector } from '@chaika/app-components';
import { configDir } from './configDir';

export const buildConsoleApp = async (commands: Class<ICommand>[]): Promise<Application> => {
    const builder = await new ApplicationBuilder(CommandLauncher)
        .buildComponent(new ConfigFileChain(configDir, process.env.SM_ENV as string))
        .buildWithParams(ConfigFactory, ['configFileChain'])
        .buildConfigs([LogConfig, PostgresConfig]);

    const app =
        builder
            .buildWithParams(LoggerFactory, ['logConfig'])
            .setParameter('category', 'app')
            .buildByFactory('loggerFactory', ['category'])
            .buildComponent(TypeOrmLogger)
            .buildComponent(TypeOrmConnector)
            .buildCommands(commands)
            .create();

    return app;
};
