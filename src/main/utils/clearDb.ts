import { EntityManager } from 'typeorm';

export const clearDb = (manager: EntityManager): Promise<void> =>
    manager.query(`
        DROP SCHEMA public CASCADE;
        CREATE SCHEMA public;
        GRANT ALL ON SCHEMA public TO gorod;
        GRANT ALL ON SCHEMA public TO public;
    `);
