import 'reflect-metadata';
import { interfaces } from 'inversify';
import { Context, IDependencyLoader, IRunnable } from '@core/index';

export abstract class Tester implements IRunnable {
    private context: Context;

    constructor(loaders: IDependencyLoader[] = []) {
        this.context = Context.getInstance();
        this.context.load(...loaders);
    }

    public abstract run(): void;

    public getComponent<T>(identifier: interfaces.ServiceIdentifier<T>): T {
        return this.context.getComponent(identifier);
    }
}
