import '../bootstrap';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

import { DbDataLoader } from '@test/common/DataLoader';
import { UserModel } from '@infrastructure/user/models/UserModel';
import { userModels } from '@test/data';
import { IRunable } from '@core/.';

export class TestDataLoader implements IRunable {
    private loader = new DbDataLoader();

    @Transaction()
    public async run(@TransactionManager() manager?: EntityManager): Promise<void> {
        await this.loader.load({ manager, dbModelClass: UserModel, models: userModels });
        await manager.query('select refresh_all_views();');
    }
}
