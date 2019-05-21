#!/usr/bin/env node
import '../bootstrap';
import { IRunnable } from 'core';
import { runScript } from '../main/utils/runScript';
import { context } from '@application/configuration/loaders/infrastructureContext';

class GetDbConfig implements IRunnable {
    public async run(): Promise<void> {
        process.stdout.write(JSON.stringify(context.postgresConfig));
    }
}

runScript(new GetDbConfig());
