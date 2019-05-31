import { createInjectDecorator, Class } from '@chaika/application';
import { context } from './context';

export * from './context';
export { context };
export const inject = createInjectDecorator(context);

export const createUseCase = (useCaseClass: Class, params: Object) => {
    return new useCaseClass(context.with({ params }));
};

export const ctx = <T extends Object>(params: T) => {
    return context.with({ params });
};
