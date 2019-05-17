import { Logger } from 'log4js';

export type Provider<T> = () => Promise<T>;
export type FactoryMethod<T> = (...args: any[]) => T;
export type ProvideLogger = (category: string) => Promise<Logger>;
