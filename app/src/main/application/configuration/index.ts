import { ComponentCache, WebAppContext, mergeContexts, createInjectDecorator } from '@chaika/core';
import { InfrastructureContext } from './infrastructureContext';

export const context = new Proxy(mergeContexts(new WebAppContext(), new InfrastructureContext()), new ComponentCache());
export const inject = createInjectDecorator(context);
