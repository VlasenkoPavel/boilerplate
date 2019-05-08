import 'reflect-metadata';
import { Type } from '@core/Type';
import { Provider } from '@main/core/configuration/types';
import { Context, IConnector } from '@main/core';
import { testLoader, ConsoleAppLoader, DependencyLoader } from '@main/core/configuration';
import { InfrastructureLoader } from '@core/configuration/InfrastructureLoader';

export class DbIntegrationTester {
    private context: Context;
    private provideConnector: Provider<IConnector>;
    private connector: IConnector;

    constructor(context: Context) {
        this.context = context;
        this.connector = this.context.getComponent(Type.ProvideConnector);
    }

    public async run(): Promise<void> {
        beforeAll(async () => {
            this.connector = await this.provideConnector();
            this.connector.connect();
        });

        afterAll(async () => this.connector.closeConnection());

        // this.context.getComponent(BudgetItemQueryServiceTester).run();
    }
}

const context = Context.getInstance();
context.load(new ConsoleAppLoader(), new DependencyLoader(), new InfrastructureLoader(), testLoader);
new DbIntegrationTester(context).run();
