import { getConnection, QueryRunner, EntityManager } from 'typeorm';
import { clearAllTables } from '@main/utils/clearAllTables';

export abstract class DbTester {
    public getRunner() {
        return getConnection().createQueryRunner();
    }

    public async rollback(runner: QueryRunner) {
        await runner.rollbackTransaction();
        await runner.release();
    }

    protected clearAllTables(manager: EntityManager) {
        return clearAllTables(manager);
    }
}
