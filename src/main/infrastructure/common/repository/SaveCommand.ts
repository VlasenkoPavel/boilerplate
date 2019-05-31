import { EntityManager } from 'typeorm';
import { Identifiable } from '@domain/common';

export abstract class SaveCommand<T extends Identifiable> {
    protected manager: EntityManager;
    protected entity: T;

    constructor(manager: EntityManager, entity: T) {
        this.manager = manager;
        this.entity = entity;
    }

    public abstract execute(): Promise<void>;
}
