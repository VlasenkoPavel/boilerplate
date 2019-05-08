import '../bootstrap';
import { Context } from './core/Context';
import { AppLoader } from './core/configuration/AppLoader';
import { Type } from './core/Type';
import { Provider, DependencyLoader } from './core/configuration';
import { Application } from './core';
import { InfrastructureLoader } from '@core/configuration/InfrastructureLoader';

const run = async (provideApp:  Provider<Application>) => {
    const app = await provideApp();
    app.run();
};

const context = Context.getInstance();
context.load(new AppLoader(), new DependencyLoader(), new InfrastructureLoader());
const provideApp = context.getComponent<Provider<Application>>(Type.ApplicationProvider);

run(provideApp);
