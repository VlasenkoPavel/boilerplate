import 'reflect-metadata';
import { IConnector, IRunnable } from '@chaika/core';
import { UserRepositoryTester } from './user/UserRepositoryTester';
import { DbTester } from '@test/common/DbTester';
import { Class } from '@domain/common';
import { context } from '@application/configuration';

const testers: Class<IRunnable>[] = [
    UserRepositoryTester,
];

export class DbIntegrationTester extends DbTester {
    private connector: IConnector;
    private testers: Class<IRunnable>[];

    constructor(testers: Class<IRunnable>[]) {
        super();
        this.testers = testers;
    }

    public run(): void {
        beforeAll(async () => {
            await context.configure();
            this.connector = context.dbConnector;
            await this.connector.connect();
        });

        afterAll(async () => this.connector.disconnect());

        describe('db integration tests', () => {
            this.testers.forEach(Tester => (new Tester()).run());
        });
    }
}

new DbIntegrationTester(testers).run();
