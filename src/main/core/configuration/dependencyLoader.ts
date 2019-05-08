import { Container } from 'inversify';
import { Loader } from './Loader';
import { UserController } from '@application/controllers/UserController';
import { CreateUser } from '@use-cases/user';

export class DependencyLoader extends Loader {
    public load(container: Container) {
        /** controllers */
        container.bind(UserController).toSelf();

        /** use-cases */
        container.bind(CreateUser).toSelf();

        /** domain factories */
    }
}
