import { context } from '@application/configuration';
import { UserRepository } from '@infrastructure/user';
import { InfrastructureContext } from '@application/configuration/infrastructureContext';

export class MockContext {
    get userRepository(): UserRepository {
        return { test: 'i mock' } as unknown as UserRepository;
    }
}

test('test', () => {
    context.merge(new MockContext());
    expect(context.userRepository).toEqual({ test: 'i mock' });
    context.merge(new InfrastructureContext());
});
