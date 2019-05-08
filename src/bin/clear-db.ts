#!/usr/bin/env node
import '../bootstrap';
import { TransactionManager, Transaction, EntityManager } from 'typeorm';
import { IRunnable } from '@core/.';
import { runScript } from '../main/utils/runScript';
import { clearDb } from '@utils/clearDb';

export class Script implements IRunnable {
    @Transaction()
    public async run(@TransactionManager() aManager?: EntityManager): Promise<void> {
        const manager = aManager as EntityManager;
        await clearDb(manager);
    }
}

runScript(new Script());
