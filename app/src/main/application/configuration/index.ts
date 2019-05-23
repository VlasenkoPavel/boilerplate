import { ComponentCache, WebAppContext, createInjectDecorator, createInjectedDecorator } from '@chaika/core';
import { InfrastructureContext } from './infrastructureContext';

export const context = new Proxy(
    new WebAppContext().merge(new InfrastructureContext()),
    new ComponentCache()
);

export const inject = createInjectDecorator(context);
export const injected = createInjectedDecorator(context);
