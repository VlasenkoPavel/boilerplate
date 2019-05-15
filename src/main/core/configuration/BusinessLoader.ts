import { Container } from 'inversify';
import { Loader } from './Loader';
import { CreateUser } from '@use-cases/user';

export class BusinessLoader extends Loader {
    public load(container: Container) {
        /** use-cases */
        container.bind(CreateUser).toSelf();
    }
}
