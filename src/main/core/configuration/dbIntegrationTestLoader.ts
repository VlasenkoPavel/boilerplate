import { Container } from 'inversify';
import { Loader } from './Loader';

export class DbIntegrationTestLoader extends Loader {
    public load(container: Container) {
        /** integration tests */
        // container.bind(BudgetItemQueryServiceTester).toSelf();
    }
}
