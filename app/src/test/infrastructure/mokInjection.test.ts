import { context } from '@application/configuration';
import { UserRepository } from '@infrastructure/user';
import { InfrastructureContext } from '@application/configuration/infrastructureContext';
import { test, TestCommand, expectError } from '@chaika/test';

/* tslint:disable:max-classes-per-file */
const mock = { test: 'i mock' };
class TestError extends Error {}

class MockContext {
    get userRepository(): UserRepository {
        return mock as unknown as UserRepository;
    }
}

class ContextTest extends TestCommand {

    protected async setUp(): Promise<void> {
        await context.merge(new MockContext());
    }

    protected async tearDown(): Promise<void> {
        await context.merge(new InfrastructureContext());
    }

    @test('test description')
    protected mockInjection(): void {
        expect(context.userRepository).toEqual(mock);
    }

    @test()
    @expectError(TestError)
    protected errorDecoratorWithClass(): void {
        throw new TestError('qwe');
    }

    @test()
    @expectError('qwe')
    protected errorDecoratorWithMessage(): void {
        throw new TestError('qwe');
    }

}

new ContextTest().execute();
