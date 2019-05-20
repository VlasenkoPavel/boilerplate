#!/usr/bin/env node
import '../bootstrap';
import { IRunnable } from 'core';
import { Type } from '@application/configuration/Type';
import { runScript } from '../main/utils/runScript';
import { PostgresConfig } from '@chaika/config';
import { Provider } from '@application/configuration';
import { Context } from 'infersify-context';

class GetDbConfig implements IRunnable {
    public async run(): Promise<void> {
        const provideConfig = Context.getInstance().getComponent(Type.DbConfigProvider) as Provider<PostgresConfig>;
        const dbConfig = await provideConfig();
        process.stdout.write(JSON.stringify(dbConfig));
    }
}

runScript(new GetDbConfig());
