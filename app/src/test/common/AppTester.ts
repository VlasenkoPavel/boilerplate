import { Application } from '@chaika/core';
import { AppRequester } from './Requester';
import * as supertest from 'supertest';
import { context } from '@application/configuration';

export abstract class AppTester {
    protected requester: AppRequester;
    protected app: Application;

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
            await context.configure();
            this.app = context.application;
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
