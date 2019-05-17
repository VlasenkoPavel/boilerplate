#!/usr/bin/env node
import '../bootstrap';
import { Context, IRunnable } from '@main/core';
import { Type } from '@core/Type';
import { runScript } from '../main/utils/runScript';
import { PostgresConfig } from '@core/components/config-validators/PostgresConfig';
import { Provider } from '@core/configuration';

class GetDbConfig implements IRunnable {
    public async run(): Promise<void> {
        const provideConfig = Context.getInstance().getComponent(Type.DbConfigProvider) as Provider<PostgresConfig>;
        const dbConfig = await provideConfig();
        process.stdout.write(JSON.stringify(dbConfig));
    }
}

runScript(new GetDbConfig());
