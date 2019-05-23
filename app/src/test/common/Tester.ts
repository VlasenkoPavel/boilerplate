import 'reflect-metadata';
import { interfaces } from 'inversify';
import { Context, IDependencyLoader } from 'infersify-context';
import { IRunnable } from '@chaika/core';

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
