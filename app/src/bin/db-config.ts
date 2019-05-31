#!/usr/bin/env node
import '../bootstrap';
import { execute } from '../main/utils/execute';
import { ICommand } from '@chaika/app-components';
import { PostgresConfig } from '@chaika/config';

interface Dependencies {
    postgresConfig: PostgresConfig;
}

class GetDbConfig implements ICommand {
    private postgresConfig: PostgresConfig;

    constructor({ postgresConfig }: Dependencies) {
        this.postgresConfig = postgresConfig;
    }

    public async execute(): Promise<void> {
        process.stdout.write(JSON.stringify(this.postgresConfig));
    }
}

execute(GetDbConfig);
