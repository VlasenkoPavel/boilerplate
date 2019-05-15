import { AppLoader } from './AppLoader';
import { BusinessLoader } from './BusinessLoader';
import { InfrastructureLoader } from './InfrastructureLoader';
import { ConsoleAppLoader } from './ConsoleAppLoader';
import { ControllerLoader } from './ControllerLoader';
import { MockLoader } from './MockLoader';

export * from './types';

const baseLoader = [
    new BusinessLoader(),
    new InfrastructureLoader(),
];

export const appLoaders = [
    ...baseLoader,
    new AppLoader(),
    new ControllerLoader(),
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
