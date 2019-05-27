import { EntityManager } from 'typeorm';

import { User, UserFindOption, IUserRepository } from '@domain/user';
import { UserModel } from './models/UserModel';
import { Repository, IRepositoryFactory, QueryBuilder, SavingManager } from '../common';
import { UserQueryBuilder } from './QueryBuilder';
import { UserSavingManager } from './UserSavingManager';

export interface Dependencies {
    userFactory: IRepositoryFactory<User, UserModel>;
}

export class UserRepository extends Repository<User, UserModel, UserFindOption> implements IUserRepository {
    constructor({ userFactory }: Dependencies) {
        super(UserModel, userFactory);
    }

    protected createQueryBuilder(
        findOption: UserFindOption,
        manager: EntityManager
    ): QueryBuilder<UserModel, UserFindOption> {
        return new UserQueryBuilder(manager, findOption);
    }

    protected getSavingManager(manager: EntityManager): SavingManager<User> {
        return new UserSavingManager(manager);
    }
}
