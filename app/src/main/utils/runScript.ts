import { IRunnable, ConsoleApp } from 'core';
import { Context } from 'infersify-context';
import { Type, Provider, consoleAppLoaders } from '@application/configuration';

export const runScript = async (runnable: IRunnable): Promise<void> => {
    const context = Context.getInstance();
    context.load(...consoleAppLoaders);
    const provide: Provider<ConsoleApp> = context.getComponent<Provider<ConsoleApp>>(Type.ApplicationProvider);
    const app = await provide();

    await app.run(runnable);
};
