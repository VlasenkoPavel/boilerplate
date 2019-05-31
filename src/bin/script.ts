#!/usr/bin/env node
import { EntityManager } from 'typeorm';
import { execute } from '../main/utils/execute';
import { ICommand } from '@chaika/app-components';

interface Dependencies {
    entityManager: EntityManager;
}

export class Command implements ICommand {
    private entityManager: EntityManager;

    constructor ({ entityManager }: Dependencies) {
        this.entityManager = entityManager;
    }

    public async execute(): Promise<void> {
        console.log('script is empty, manager=', this.entityManager);
    }
}

execute(Command);
