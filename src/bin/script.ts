#!/usr/bin/env node
import '../bootstrap';
import { TransactionManager, Transaction, EntityManager } from 'typeorm';
import { IRunable } from '@core/.';
import { runScript } from '../main/utils/runScript';

export class Script implements IRunable {
    @Transaction()
    public async run(@TransactionManager() aManager?: EntityManager): Promise<void> {
        const manager = aManager as EntityManager;
        console.log('script is empty, manager=', manager);
    }
}

runScript(new Script());
