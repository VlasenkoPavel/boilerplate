#!/usr/bin/env node
import '../bootstrap';
import { getManager } from 'typeorm';
import { execute } from '../main/utils/execute';
import { clearDb } from '@utils/clearDb';
import { ICommand } from '@chaika/app-components';

export class Command implements ICommand {
    public async execute(): Promise<void> {
        await clearDb(getManager());
    }
}

execute(Command);
