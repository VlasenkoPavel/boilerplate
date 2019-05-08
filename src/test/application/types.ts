import * as supertest from 'supertest';
import { AppRequester } from '@test/common/Requester';

export type JsonPrimitives = string | number | boolean | null;

export type JsonObj = { [key: string]: JsonPrimitives | JsonPrimitives[] };
export type JsonType = { [key: string]: JsonPrimitives | JsonObj | JsonObj[] | JsonPrimitives[] };

export type Requester = supertest.SuperTest<supertest.Test>;

export interface IAppTester {
    run(requester: AppRequester): void;
}
