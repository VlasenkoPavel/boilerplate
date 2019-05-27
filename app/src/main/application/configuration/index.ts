import { ComponentCache, WebAppContext, createInjectDecorator } from '@chaika/core';
import { InfrastructureContext } from './infrastructureContext';

interface Constructor extends Function { new (...args: any[]): any; }

export const createInjectedDecorator = (context: Object): ClassDecorator =>
<TFunction extends Function>(target: TFunction): any => {
    const original: Constructor = target as unknown as Constructor;

    class Alternate {
        constructor(constructor: Constructor, args: any[]) {
            const instance = new constructor(...args);
            Object.assign(this, instance);
            const keys = Object.getOwnPropertyNames(instance);
            console.log('Refl=', Reflect.ownKeys(instance));

            keys.forEach(key => {
                if (!this[key]) {
                    this[key] = context[key];
                }
            });

            (this as any).__proto__ = constructor.prototype;
        }
    }

    const newConstructor = function(...args: any[]) {
        return new Alternate(original, args);
    };

    newConstructor.prototype = original.prototype;

    return newConstructor;
};

export const context = new Proxy(
    new WebAppContext().merge(new InfrastructureContext()),
    new ComponentCache()
);

export const inject = createInjectDecorator(context);
export const injected = createInjectedDecorator(context);
