import { Class, ICommand, ApplicationBuilder, Application } from '@chaika/application';
import { ConfigFactory, ConfigFileChain, LogConfig, PostgresConfig } from '@chaika/config';
import { CommandLauncher, LoggerFactory, TypeOrmLogger, TypeOrmConnector } from '@chaika/app-components';
import { configDir } from './configDir';

export const buildConsoleApp = async (commands: Class<ICommand>[]): Promise<Application> => {
    const builder = await new ApplicationBuilder(CommandLauncher)
        .addComponent(new ConfigFileChain(configDir, process.env.SM_ENV as string))
        .buildComponent(ConfigFactory, { args: ['configFileChain'] })
        .buildConfigs([LogConfig, PostgresConfig]);

    const app = builder
        .buildComponent(LoggerFactory, { args: ['logConfig'] })
        .setParameter('loggerCategory', 'app')
        .addFactory('loggerFactory', 'logger', ['loggerCategory'])
        .buildComponent(TypeOrmLogger)
        .buildComponent(TypeOrmConnector)
        .buildCommands(commands)
        .create();

    return app;
};
