import { AppTester } from '@test/common';
import { getManager } from 'typeorm';
import { v4 } from 'uuid';
import { TestDataLoader } from '@test/common/TestDataLoader';
import { clearAllTables } from '@main/utils/clearAllTables';

class SystemTester extends AppTester {
    public test(): void {
        const params = {
            id: v4(),
            name: 'Bill'
        };

        describe('app test', () => {
            beforeAll(async () => {
                await clearAllTables(getManager());
            });

            afterAll(async () => {
                const manager = getManager();
                await clearAllTables(manager);
                await new TestDataLoader().run(manager);
            });

            it('POST /user test', async () => {
                const response = await this.post(`/user`, params);

                expect(response.status).toBe(204);
            });
        });
    }
}

new SystemTester().run();
