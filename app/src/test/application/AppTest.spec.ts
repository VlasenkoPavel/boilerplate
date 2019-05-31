import { SystemTestCommand } from '@test/common';
import { test } from '@chaika/test';
import { v4 } from 'uuid';
import { TestDataLoader } from '@test/common/TestDataLoader';
import { clearAllTables } from '@main/utils/clearAllTables';
import { Application } from '@chaika/application';
import { AppRequester } from '@test/common/Requester';

class AppTestCommand extends SystemTestCommand {
    protected async setUp(): Promise<void> {
        await super.setUp();
        await clearAllTables();
    }

    protected async tearDown() {
        await clearAllTables();
        await new TestDataLoader().execute();
        await super.tearDown();
    }

    @test()
    protected async preparationTest() {
        expect(this.app).toBeInstanceOf(Application);
        expect(this.requester).toBeInstanceOf(AppRequester);
    }

    @test('POST /user test')
    protected async createUser({ id = v4(), name = 'Bill' } = {}) {
        const response = await this.post(`/user`, { id, name });

        expect(response.status).toBe(204);
    }
}

new AppTestCommand().execute();
