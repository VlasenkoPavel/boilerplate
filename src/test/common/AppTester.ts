import { Application, IDependencyLoader } from '@core/index';
import { AppRequester } from './Requester';
import { Tester } from './Tester';
import * as supertest from 'supertest';
import { mockLoader, testLoader, Provider, AppLoader, DependencyLoader } from '@core/configuration';
import { Type } from '@core/Type';

export abstract class AppTester extends Tester {
    protected provideApp: Provider<Application>;
    protected requester: AppRequester;
    protected app: Application;

    constructor(loaders: IDependencyLoader[] = [new AppLoader(), new DependencyLoader(), mockLoader, testLoader]) {
        super(loaders);
        this.provideApp = this.getComponent<Provider<Application>>(Type.ApplicationProvider);
    }

    public async run() {
        this.setUp();
        this.test();
        this.tearDown();
    }

    public post(url: string, params: string | Object): supertest.Test {
        return this.requester.post(url, params);
    }

    public put(url: string, params: string | Object): supertest.Test {
        return this.requester.put(url, params);
    }

    public get<T extends Object>(url: string, params?: T): supertest.Test {
        return this.requester.get(url, params);
    }

    protected setUp(): void {
        beforeAll(async () => {
            this.app = await this.provideApp();
            await this.app.run();
            this.requester = new AppRequester(supertest(this.app.getHttpServer()));
        });
    }

    protected abstract test(): void;

    protected tearDown(): void {
        afterAll(async () => {
            await this.app.stop();
        });
    }
}
