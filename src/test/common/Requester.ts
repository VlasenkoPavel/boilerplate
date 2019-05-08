import * as supertest from 'supertest';
import { Requester } from '@test/application/types';
import { hasDefinedKeys } from '@utils/hasDefinedKeys';
import { keys } from 'lodash';

export class AppRequester {
    private requester: Requester;

    constructor(requester: Requester) {
        this.requester = requester;
    }

    public post(url: string, params: string | Object): supertest.Test {
        return this.requester.post(`${url}`).send(params);
    }

    public put(url: string, params: string | Object): supertest.Test {
        return this.requester.put(`${url}`).send(params);
    }

    public get(url: string, params: Object): supertest.Test {
        return this.requester.get(`${url}${this.toQueryString(params)}`);
    }

    private toQueryString(params: Object) {
        return hasDefinedKeys(params)
            ? keys(params).reduce((ac: string, cur: string) => `${ac}&${cur}=${params[cur]}`, '?')
            : '';
    }
}
