import { AppTester } from '@test/common';
import { IDependencyLoader } from '@core/.';
import { AppLoader, DependencyLoader } from '@core/configuration';
import { clearDb } from '@utils/clearDb';
import { getManager } from 'typeorm';
import { v4 } from 'uuid';
import { TestDataLoader } from '@test/common/TestDataLoader';
import { InfrastructureLoader } from '@core/configuration/InfrastructureLoader';

class SystemTester extends AppTester {
    constructor(loaders: IDependencyLoader[]) {
        super(loaders);
    }

    public test(): void {
        const params = {
            id: v4(),
            name: 'Bill'
        };

        describe('app test', () => {
            beforeAll(async () => {
                await clearDb(getManager());
            });

            afterAll(async () => {
                await clearDb(getManager());
                await new TestDataLoader().run(getManager());
            });

            it('POST /activity test', async () => {
                const url = `/activity`;
                const response = await this.post(url, params);

                expect(response.status).toBe(204);
            });
        });
    }
}

new SystemTester([new AppLoader(), new DependencyLoader(), new InfrastructureLoader()]).run();
