import { Container } from 'inversify';
import { Loader } from './Loader';
import { UserController } from '@application/controllers/UserController';

export class ControllerLoader extends Loader {
    public load(container: Container) {
        container.bind(UserController).toSelf();
    }
}
