import { compact, isEmpty, first } from 'lodash';
import {
    ObjectType,
    EntityManager,
    getManager
} from 'typeorm';

import { QueryBuilder } from './QueryBuilder';
import { SavingManager } from './SavingManager';
import { IRepositoryFactory } from './IRepositoryFactory';
import { Identifiable } from '../types';
import { injectable } from 'inversify';
import { FindOption } from '@domain/common';

@injectable()
export abstract class
    Repository<E extends Identifiable, OrmModel extends { id: E['id']}, FO extends FindOption<E['id']>> {

    protected modelClass: ObjectType<OrmModel>;
    protected factory: IRepositoryFactory<E, OrmModel>;

    constructor(modelClass: ObjectType<OrmModel>, factory: IRepositoryFactory<E, OrmModel>) {
        this.modelClass = modelClass;
        this.factory = factory;
    }

    public async get(id: number | string, manager: EntityManager = getManager()): Promise<E | undefined> {
        const model = await this.getModel(id, manager);

        return this.checkModelAndCreate(model);
    }

    public async getOrFail(id: number | string, manager: EntityManager = getManager()): Promise<E> {
        const model = await this.getModel(id, manager);

        if (!model) {
            throw new Error(`${this.modelClass.name} with id: ${id} not found`);
        }

        return this.create(model);
    }

    public async save(entity: E, manager?: EntityManager): Promise<void> {
        if (!manager) {
            return getManager().transaction(async (aManager) => {
                await this.getSavingManager(aManager!).save(entity);
            });
        }

        await this.getSavingManager(manager).save(entity);
    }

    public async find(findOption: FO = ({} as FO), manager: EntityManager = getManager()): Promise<E[]> {
        const models = await this.findModels(findOption, manager);

        return this.createList(models);
    }

    protected create(model: OrmModel): E {
        return this.factory.restore(model);
    }

    protected abstract createQueryBuilder(findOption: FO, manager: EntityManager): QueryBuilder<OrmModel, FO>;
    protected abstract getSavingManager(manager: EntityManager): SavingManager<E>;

    protected async getModel(id: E['id'], manager: EntityManager): Promise<OrmModel | undefined> {
        const models =  await this.findModels({ ids: [id] } as FO, manager);

        if (isEmpty(models)) {
            return undefined;
        }

        return first(models);
    }

    protected async findModels(findOption: FO, manager: EntityManager): Promise<OrmModel[]> {
        const qb = this.createQueryBuilder(findOption, manager);

        return qb.execute();
    }

    protected checkModelAndCreate(model?: OrmModel): E | undefined {
        if (!model) {
            return undefined;
        }

        return this.create(model);
    }

    protected createList(models: OrmModel[]): E[] {
        return compact(models.map(model => this.create(model)));
    }
}
