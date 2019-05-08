import 'reflect-metadata';
import { Container, interfaces } from 'inversify';

export interface IDependencyLoader {
    load(container: Container): void;
}

export class Context {
    private static instance: Context;
    private container: Container;

    private constructor(option: interfaces.ContainerOptions) {
        this.container = new Container(option);
    }

    public static getInstance(option: interfaces.ContainerOptions = { defaultScope: 'Singleton' }) {
        if (!Context.instance) {
            Context.instance = new Context(option);
        }

        return Context.instance;
    }

    public load(...loaders: IDependencyLoader[]) {
        loaders.forEach(loader => loader.load(this.container));
    }

    public getComponent<T>(identifier: interfaces.ServiceIdentifier<T>): T {
        return this.container.get(identifier);
    }
}
