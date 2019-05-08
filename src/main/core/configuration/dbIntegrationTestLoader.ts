import { Container } from 'inversify';
import { IDependencyLoader } from '../Context';

export const testLoader: IDependencyLoader = {
    load: (container: Container) => {
        /** integration tests */
        // container.bind(BudgetItemQueryServiceTester).toSelf();
    }
};
