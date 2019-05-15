import '../bootstrap';
import { Context } from './core/Context';
import { Type } from './core/Type';
import { Provider, appLoaders } from './core/configuration';
import { Application } from './core';

const run = async (provideApp:  Provider<Application>) => {
    const app = await provideApp();
    app.run();
};

const context = Context.getInstance();
context.load(...appLoaders);
const provideApp = context.getComponent<Provider<Application>>(Type.ApplicationProvider);

run(provideApp);
