import { UserRepository, UserFactory } from '@infrastructure/user';
import { UserModel } from '@infrastructure/user/models/UserModel';
import { IUserRepository } from '@domain/user';
import { ComponentCache } from './ComponentCache';
import { AppContext } from './AppContext';
import { mergeContexts } from './mergeContexts';

export class InfrastructureContext {
    get userFactory(): UserFactory {
        return new UserFactory();
    }

    get userRepository(): IUserRepository {
        return new UserRepository(UserModel, this.userFactory);
    }
}

export const context = new Proxy(mergeContexts(new AppContext(), new InfrastructureContext()), new ComponentCache());
