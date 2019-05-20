import { UserRepository, UserFactory } from '@infrastructure/user';
import { UserModel } from '@infrastructure/user/models/UserModel';
import { IUserRepository } from '@domain/user';
import { AppContext } from './AppContext';

export class infrastructureContext extends AppContext {
    get userFactory() {
        return new UserFactory();
    }

    get userRepository(): IUserRepository {
        return new UserRepository(UserModel, this.userFactory);
    }
}

export const context = new infrastructureContext();
