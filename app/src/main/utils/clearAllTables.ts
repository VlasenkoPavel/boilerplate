import { EntityManager } from 'typeorm';

export const clearAllTables = (manager: EntityManager): Promise<void> =>
    manager.query(`
        select  clear_tables();
    `);
