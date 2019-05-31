import { EntityManager, getManager } from 'typeorm';

export const clearAllTables = (manager: EntityManager = getManager()): Promise<void> =>
    manager.query(`
        select  clear_tables();
    `);
