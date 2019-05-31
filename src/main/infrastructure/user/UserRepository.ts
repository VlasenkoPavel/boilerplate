import { EntityManager } from 'typeorm';

import { User, UserFindOption, IUserRepository } from '@domain/user';
import { UserModel } from './models/UserModel';
import { Repository, IRepositoryFactory, FindCommand, SaveCommand } from '../common';
import { FindUserCommand } from './FindUserCommand';
import { SaveUserCommand } from './UserSavingManager';

export interface Dependencies {
    userFactory: IRepositoryFactory<User, UserModel>;
}

export class UserRepository extends Repository<User, UserModel, UserFindOption> implements IUserRepository {
    constructor({ userFactory }: Dependencies) {
        super(UserModel, userFactory);
    }

    protected createFindCommand(
        findOption: UserFindOption,
        manager: EntityManager
    ): FindCommand<UserModel, UserFindOption> {
        return new FindUserCommand(manager, findOption);
    }

    protected createSaveCommand(manager: EntityManager, user: User): SaveCommand<User> {
        return new SaveUserCommand(manager, user);
    }
}
