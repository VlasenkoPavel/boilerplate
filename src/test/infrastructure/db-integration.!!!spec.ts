import 'reflect-metadata';
import { Type } from '@core/Type';
import { Provider } from '@main/core/configuration/types';
import { Context, IConnector, IRunnable } from '@main/core';
import { ConsoleAppLoader, DependencyLoader, DbIntegrationTestLoader } from '@main/core/configuration';
import { InfrastructureLoader } from '@core/configuration/InfrastructureLoader';

const testerList: IRunnable[] = [];

export class DbIntegrationTester {
    private context: Context;
    private provideConnector: Provider<IConnector>;
    private connector: IConnector;
    private testers: IRunnable[];

    constructor(context: Context, testers: IRunnable[] = testerList) {
        this.context = context;
        this.connector = this.context.getComponent(Type.ProvideConnector);
        this.testers = testers;
    }

    public async run(): Promise<void> {
        beforeAll(async () => {
            this.connector = await this.provideConnector();
            this.connector.connect();
        });

        afterAll(async () => this.connector.closeConnection());

        this.testers.forEach(tester => {
            tester.run();
        });
    }
}

const context = Context.getInstance();

context.load(
    new ConsoleAppLoader(),
    new DependencyLoader(),
    new InfrastructureLoader(),
    new DbIntegrationTestLoader()
);

new DbIntegrationTester(context).run();
