#!/usr/bin/env node
import '../bootstrap';
import { Context, IRunable } from '@main/core';
import { Type } from '@core/Type';
import { runScript } from '../main/utils/runScript';
import { AppDbConfig } from '@core/components/config-validators/AppDbConfig';
import { Provider } from '@core/configuration';

class GetDbConfig implements IRunable {
    public async run(): Promise<void> {
        const provideConfig = Context.getInstance().getComponent(Type.DbConfigProvider) as Provider<AppDbConfig>;
        const dbConfig = await provideConfig();
        process.stdout.write(JSON.stringify(dbConfig));
    }
}

runScript(new GetDbConfig());
