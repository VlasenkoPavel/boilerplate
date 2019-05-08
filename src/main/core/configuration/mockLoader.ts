import { Container } from 'inversify';
import { IDependencyLoader } from '../Context';

export const mockLoader: IDependencyLoader = {
    load: (container: Container) => {
        /** mock repositories */
        /** other */
    }
};
