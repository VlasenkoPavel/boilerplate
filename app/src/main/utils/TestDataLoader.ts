import { EntityManager, Transaction, TransactionManager } from 'typeorm';

import { DbDataLoader } from '@test/common/DataLoader';
import { UserModel } from '@infrastructure/user/models/UserModel';
import { userModels } from '@test/data';
import { IRunnable } from '@chaika/core';

export class TestDataLoader implements IRunnable {
    private loader = new DbDataLoader();

    @Transaction()
    public async run(@TransactionManager() entityManager?: EntityManager): Promise<void> {
        await this.loader.load({ entityManager, dbModelClass: UserModel, models: userModels });
        await entityManager.query('select refresh_all_views();');
    }
}
