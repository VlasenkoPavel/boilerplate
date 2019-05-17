import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
import inversifyInjectDecorators from 'inversify-inject-decorators';

export interface IDependencyLoader {
    load(container: Container): void;
}

export class Context {
    static getComponent(IUserRepository: symbol): import("../domain/user").IUserRepository {
        throw new Error("Method not implemented.");
    }
    private static instance: Context;
    public container: Container;

    private constructor(option: interfaces.ContainerOptions) {
        this.container = new Container(option);
    }

    public static getComponentBy<T>(identifier: interfaces.ServiceIdentifier<T>): T {
        return Context.getInstance().container.get(identifier);
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
}

export const { lazyInject } = inversifyInjectDecorators(Context.getInstance().container);
export const getComponent = Context.getComponentBy;
