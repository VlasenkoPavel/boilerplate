import { UserRepository, UserFactory } from '@infrastructure/user';
import { UserModel } from '@infrastructure/user/models/UserModel';

export class InfrastructureContext {
    get userFactory(): UserFactory {
        return new UserFactory();
    }

    get userRepository(): UserRepository {
        return new UserRepository(UserModel, this.userFactory);
    }
}
