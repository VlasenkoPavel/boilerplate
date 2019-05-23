import { context } from '@application/configuration';
import { UserRepository } from '@infrastructure/user';

export class MockContext {
    get userRepository(): UserRepository {
        return { test: 'i mock' } as unknown as UserRepository;
    }
}

test('test', () => {
    context.merge(new MockContext());
    expect(context.userRepository).toEqual({ test: 'i mock' });
});
