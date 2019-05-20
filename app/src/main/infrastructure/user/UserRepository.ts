import { EntityManager, ObjectType } from 'typeorm';

import { User, UserFindOption, IUserRepository } from '@domain/user';
import { UserModel } from './models/UserModel';
import { Repository, IRepositoryFactory, QueryBuilder, SavingManager } from '../common';
import { UserQueryBuilder } from './QueryBuilder';
import { UserSavingManager } from './UserSavingManager';

export class UserRepository extends Repository<User, UserModel, UserFindOption> implements IUserRepository {
    constructor(model: ObjectType<UserModel>, factory: IRepositoryFactory<User, UserModel>) {
        super(model, factory);
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
