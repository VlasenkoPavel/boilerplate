
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1557159195252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner) {
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION clear_tables(excluded text[] = array['migrations']) returns void AS
            $$
                DECLARE
                    table_name RECORD;
                begin
                    for table_name IN
                        SELECT tablename
                        FROM pg_catalog.pg_tables
                        WHERE schemaname='public'
                        AND tablename != ANY(excluded)
                    ORDER BY tablename loop
                        EXECUTE format('DELETE FROM %I', btrim(table_name::TEXT, '()'));
                    end LOOP;
                END
            $$ LANGUAGE plpgsql;
        `);
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.query(`DROP FUNCTION clear_all_tables`);
    }
}
