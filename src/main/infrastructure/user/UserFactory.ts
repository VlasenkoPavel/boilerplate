import { injectable } from 'inversify';
import { User, UserParams } from '@domain/user/User';
import { IRepositoryFactory } from '../common';
import { UserModel } from './models/UserModel';

@injectable()
export class UserFactory implements IRepositoryFactory<User, UserModel> {
    public create(params: UserParams) {
        return new User(params);
    }

    public restore(model: UserModel): User {
        return new User(model);
    }
}
