import { UserRepository, UserFactory } from '@infrastructure/user';
import { UserModel } from '@infrastructure/user/models/UserModel';
import { IUserRepository } from '@domain/user';
import { AppContext } from './AppContext';
import { ComponentCache } from './ComponentCache';

export class InfrastructureContext extends AppContext {
    get userFactory(): UserFactory {
        return new UserFactory();
    }

    get userRepository(): IUserRepository {
        return new UserRepository(UserModel, this.userFactory);
    }
}

export const context = new Proxy(new InfrastructureContext(), new ComponentCache());
