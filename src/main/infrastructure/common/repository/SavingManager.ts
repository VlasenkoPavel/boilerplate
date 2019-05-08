import { EntityManager } from 'typeorm';

export abstract class SavingManager<T extends { id: number | string }> {
    public manager: EntityManager;

    constructor(manager: EntityManager) {
        this.manager = manager;
    }

    public abstract save(entity: T): Promise<void>;
}
