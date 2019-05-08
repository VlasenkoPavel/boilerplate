import 'reflect-metadata';
import { interfaces } from 'inversify';
import { ConsoleAppLoader, DependencyLoader, DbIntegrationTestLoader, MockLoader } from '@core/configuration';
import { Context, IDependencyLoader } from '@core/index';

const defaultLoaders: IDependencyLoader[] = [
    new ConsoleAppLoader(),
    new DependencyLoader(),
    new DbIntegrationTestLoader(),
    new MockLoader(),
];

export abstract class Tester {
    private context: Context;

    constructor(loaders: IDependencyLoader[] = defaultLoaders) {
        this.context = Context.getInstance();
        this.context.load(...loaders);
    }

    public abstract run(): void;

    public getComponent<T>(identifier: interfaces.ServiceIdentifier<T>): T {
        return this.context.getComponent(identifier);
    }
}
