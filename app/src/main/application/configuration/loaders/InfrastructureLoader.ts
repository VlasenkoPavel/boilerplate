import { Container } from 'inversify';
import { Loader } from './Loader';
import { UserRepository, UserFactory } from '@infrastructure/user';
import { IUserRepository, User } from '@domain/user';
import { Type } from '@application/configuration/Type';
import { IRepositoryFactory } from '@infrastructure/common';
import { UserModel } from '@infrastructure/user/models/UserModel';
import { ObjectType } from 'typeorm';

export class InfrastructureLoader extends Loader {
    public load (container: Container) {
        /** repositories */
        container.bind<IUserRepository>(Type.IUserRepository).to(UserRepository);
        /** query-services */
        /** repository factories */
        container.bind<IRepositoryFactory<User, UserModel>>(Type.UserRepositoryFactory).to(UserFactory);
        /** models */
        container.bind<ObjectType<UserModel>>(Type.UserModel).toConstructor(UserModel);
        /** other */
    }
}
