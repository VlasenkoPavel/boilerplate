import { EntityManager, getManager } from 'typeorm';

import { DbDataLoader } from '@test/common/DataLoader';
import { UserModel } from '@infrastructure/user/models/UserModel';
import { userModels } from '@test/data';
import { ICommand } from '@chaika/app-components';

interface Dependencies {
    entityManager: EntityManager;
}

export class TestDataLoader implements ICommand {
    private entityManager: EntityManager;
    private loader = new DbDataLoader();

    constructor({ entityManager = getManager() }: Dependencies = {} as Dependencies) {
        this.entityManager = entityManager;
    }

    public async execute(): Promise<void> {
        await this.loader.load({ entityManager: this.entityManager, dbModelClass: UserModel, models: userModels });
        // await manager.query('select refresh_all_views();');
    }
}
