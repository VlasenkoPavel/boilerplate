import { Context, IRunnable } from '@core/.';
import { ConsoleApp } from '@core/ConsoleApp';
import { Type } from '@core/Type';
import { Provider, ConsoleAppLoader, DependencyLoader } from '@core/configuration';
import { InfrastructureLoader } from '@core/configuration/InfrastructureLoader';

export const runScript = async (runnable: IRunnable): Promise<void> => {
    const context = Context.getInstance();
    context.load(new ConsoleAppLoader(), new DependencyLoader(), new InfrastructureLoader());
    const provide: Provider<ConsoleApp> = context.getComponent<Provider<ConsoleApp>>(Type.ApplicationProvider);
    const app = await provide();

    await app.run(runnable);
};
