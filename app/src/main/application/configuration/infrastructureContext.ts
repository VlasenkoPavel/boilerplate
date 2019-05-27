import { UserRepository, UserFactory } from '@infrastructure/user';

export class InfrastructureContext {
    get userFactory(): UserFactory { return new UserFactory(); }
    get userRepository(): UserRepository { return new UserRepository(this); }
}
