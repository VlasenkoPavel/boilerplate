import { getConnection, QueryRunner, EntityManager } from 'typeorm';
import { Tester } from './Tester';
import { clearAllTables } from '@main/utils/clearAllTables';

export abstract class DbTester extends Tester {
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
