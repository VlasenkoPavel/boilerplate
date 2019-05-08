import { Container } from 'inversify';
import { Loader } from './Loader';

export class MockLoader extends Loader {
    public load(container: Container) {
        /** mock repositories */
        /** other */
    }
}
