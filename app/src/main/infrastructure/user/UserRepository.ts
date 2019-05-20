import { EntityManager, ObjectType } from 'typeorm';

import { inject, injectable } from 'inversify';
import { Type } from '@application/configuration';
import { User, UserFindOption, IUserRepository } from '@domain/user';
import { UserModel } from './models/UserModel';
import { Repository, IRepositoryFactory, QueryBuilder, SavingManager } from '../common';
import { UserQueryBuilder } from './QueryBuilder';
import { UserSavingManager } from './UserSavingManager';

@injectable()
export class UserRepository extends Repository<User, UserModel, UserFindOption> implements IUserRepository {
    constructor(
        @inject(Type.UserModel) model: ObjectType<UserModel>,
        @inject(Type.IUserRepositoryFactory) factory: IRepositoryFactory<User, UserModel>
    ) {
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
