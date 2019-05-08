import { injectable } from 'inversify';
import { getConnection, QueryRunner, EntityManager } from 'typeorm';
import { clearDb } from '@utils/clearDb';

@injectable()
export class DbTester {
    public getRunner() {
        return getConnection().createQueryRunner();
    }

    public async rollback(runner: QueryRunner) {
        await runner.rollbackTransaction();
        await runner.release();
    }

    protected clearDbExcludeDictionaries(manager: EntityManager) {
        return clearDb(manager);
    }
}
