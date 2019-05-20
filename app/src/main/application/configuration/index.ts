import { AppLoader } from './loaders/AppLoader';
import { BusinessLoader } from './loaders/BusinessLoader';
import { InfrastructureLoader } from './loaders/InfrastructureLoader';
import { ConsoleAppLoader } from './loaders/ConsoleAppLoader';
import { MockLoader } from './loaders/MockLoader';

export * from './types';
export * from './Type';
export * from './context';

const baseLoader = [
    new BusinessLoader(),
    new InfrastructureLoader(),
];

export const appLoaders = [
    ...baseLoader,
    new AppLoader(),
];

export const consoleAppLoaders = [
    ...baseLoader,
    new ConsoleAppLoader(),
];

export const businessTestLoader = [
    new ConsoleAppLoader(),
    new BusinessLoader(),
    new MockLoader(),
];
