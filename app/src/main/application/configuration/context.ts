import 'reflect-metadata';
import { interfaces } from 'inversify';
import inversifyInjectDecorators from 'inversify-inject-decorators';

import { Context as SuperContext } from 'infersify-context';

export class Context extends SuperContext {
    protected static instance: Context;

    public static getInstance(option: interfaces.ContainerOptions = { defaultScope: 'Singleton' }) {
        if (!Context.instance) {
            Context.instance = new Context(option);
        }

        return Context.instance;
    }

    public getLazyInject() {
        return inversifyInjectDecorators(Context.getInstance().container);
    }
}

export const context = Context.getInstance();
export const { lazyInject } = context.getLazyInject();
