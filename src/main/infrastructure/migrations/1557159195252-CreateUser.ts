
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1557159195252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner) {
        await queryRunner.query(`
            CREATE TABLE user_app (
                id VARCHAR(36) PRIMARY KEY,
                name TEXT NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.query(`DROP TABLE user_app`);
    }
}
