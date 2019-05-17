import { Container, interfaces } from 'inversify';
import { Loader } from './Loader';
import { CreateUser } from '@use-cases/user';
import { AddUserCommand, AddUserParams } from '@use-cases/user/command-v1/CreateUserV1';
import { Type } from '@core/Type';
import { IUserRepository } from '@domain/user';
import { FactoryMethod } from './types';

export class BusinessLoader extends Loader {
    public load(container: Container) {
        /** use-cases */
        container.bind(CreateUser).toSelf();

        container.bind<FactoryMethod<AddUserCommand>>("Factory<CreateUserCommandV1>")
            .toFactory<AddUserCommand>((context: interfaces.Context) => (params: AddUserParams) => {
                const repository = this.getComponent<IUserRepository>(context, Type.IUserRepository);
                return new AddUserCommand(params, { repository });
        });
    }

}
