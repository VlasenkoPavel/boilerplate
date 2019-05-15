import { Application, IDependencyLoader } from '@core/index';
import { AppRequester } from './Requester';
import { Tester } from './Tester';
import * as supertest from 'supertest';
import { Provider, appLoaders } from '@core/configuration';
import { Type } from '@core/Type';

export abstract class AppTester extends Tester {
    protected requester: AppRequester;
    protected app: Application;

    constructor(loaders: IDependencyLoader[] = appLoaders) {
        super(loaders);
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
            const provideApp = this.getComponent<Provider<Application>>(Type.ApplicationProvider);
            this.app = await provideApp();
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
