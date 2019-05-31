import { AppRequester } from './Requester';
import * as supertest from 'supertest';
import { TestCommand } from '@chaika/test';
import { getHttpServer } from '@test/utils/getHttpServer';
import { Application } from '@chaika/application';
import { buildApp } from '@main/utils/buildApp';

export abstract class SystemTestCommand extends TestCommand {
    protected requester: AppRequester;
    protected app: Application;

    public post(url: string, params: string | Object): supertest.Test {
        return this.requester.post(url, params);
    }

    public put(url: string, params: string | Object): supertest.Test {
        return this.requester.put(url, params);
    }

    public get<T extends Object>(url: string, params?: T): supertest.Test {
        return this.requester.get(url, params);
    }

    protected async setUp(): Promise<void> {
        this.app = await buildApp();
        await this.app.init();
        await this.app.start();
        this.requester = new AppRequester(supertest(getHttpServer.call(this.app)));
    }

    protected async tearDown(): Promise<void> {
        await this.app.stop();
    }
}
