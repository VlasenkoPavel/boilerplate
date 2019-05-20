import 'reflect-metadata';
import { Type } from '@application/configuration/';
import { IConnector } from 'core/';
import { UserRepositoryTester } from './user/UserRepositoryTester';
import { Tester } from '@test/common/Tester';
import { DbTester } from '@test/common/DbTester';
import { consoleAppLoaders, Provider } from '@application/configuration';
import { Class } from '@domain/common';
import { IDependencyLoader } from 'infersify-context';

const testers: Class<Tester>[] = [
    UserRepositoryTester,
];

export class DbIntegrationTester extends DbTester {
    private connector: IConnector;
    private testers: Class<Tester>[];

    constructor(loaders: IDependencyLoader[], testers: Class<Tester>[]) {
        super(loaders);
        this.testers = testers;
    }

    public run(): void {
        beforeAll(async () => {
            const provideConnector = this.getComponent<Provider<IConnector>>(Type.ProvideConnector);
            this.connector = await provideConnector();
            await this.connector.connect();
        });

        afterAll(async () => this.connector.disconnect());

        describe('db integration tests', () => {
            this.testers.forEach(Tester => (new Tester()).run());
        });
    }
}

new DbIntegrationTester(consoleAppLoaders, testers).run();
