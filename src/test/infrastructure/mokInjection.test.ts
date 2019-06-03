import { context } from '@application/configuration';
import { test, TestCommand, expectError } from '@chaika/test';
import { Context } from '@chaika/application';
import { UserRepository } from '@infrastructure/user';

/* tslint:disable:max-classes-per-file */
const mock =  { test: 'i mock' };

class TestError extends Error {}
const mockContext = new Context();
mockContext.addValue(mock, 'userRepository');

class ContextTest extends TestCommand {

    protected async setUp(): Promise<void> {
        await context.loadToCache(mockContext);
    }

    protected async tearDown(): Promise<void> {
        await context.clearCache();
    }

    @test()
    protected mockInjection(): void {
        expect(context.userRepository).toEqual(mock);
    }

    @test()
    protected contextCacheIsCleaned(): void {
        context.clearCache();
        expect(context.userRepository).toBeInstanceOf(UserRepository);
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
