import 'reflect-metadata';
import { interfaces } from 'inversify';
import { mockLoader, testLoader, ConsoleAppLoader, DependencyLoader } from '@core/configuration';
import { Context, IDependencyLoader } from '@core/index';

export abstract class Tester {
    private context: Context;

    constructor(
        loaders: IDependencyLoader[] = [new ConsoleAppLoader(), new DependencyLoader(), mockLoader, testLoader]
    ) {
        this.context = Context.getInstance();
        this.context.load(...loaders);
    }

    public abstract run(): void;

    public getComponent<T>(identifier: interfaces.ServiceIdentifier<T>): T {
        return this.context.getComponent(identifier);
    }
}
