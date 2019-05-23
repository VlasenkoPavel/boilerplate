#!/usr/bin/env node
import '../bootstrap';
import { IRunnable } from '@chaika/core';
import { runScript } from '../main/utils/runScript';
import { context } from '@application/configuration';

class GetDbConfig implements IRunnable {
    public async run(): Promise<void> {
        process.stdout.write(JSON.stringify(context.postgresConfig));
    }
}

runScript(new GetDbConfig());
