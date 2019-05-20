import './bootstrap';
import { Type } from '@application/configuration/Type';
import { Provider, appLoaders } from '@application/configuration';
import { Application } from 'core';
import { context } from '@application/configuration/context';

const run = async (provideApp:  Provider<Application>) => {
    const app = await provideApp();
    app.run();
};

context.load(...appLoaders);
const provideApp = context.getComponent<Provider<Application>>(Type.ApplicationProvider);

run(provideApp);
