import { Context, IRunnable } from '@core/.';
import { ConsoleApp } from '@core/ConsoleApp';
import { Type } from '@core/Type';
import { Provider, consoleAppLoaders } from '@core/configuration';

export const runScript = async (runnable: IRunnable): Promise<void> => {
    const context = Context.getInstance();
    context.load(...consoleAppLoaders);
    const provide: Provider<ConsoleApp> = context.getComponent<Provider<ConsoleApp>>(Type.ApplicationProvider);
    const app = await provide();

    await app.run(runnable);
};
