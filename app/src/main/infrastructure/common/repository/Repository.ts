import { compact, isEmpty, first } from 'lodash';
import {
    ObjectType,
    EntityManager,
    getManager
} from 'typeorm';

import { FindCommand } from './FindCommand';
import { SaveCommand } from './SaveCommand';
import { IRepositoryFactory } from './IRepositoryFactory';
import { FindOption, Optional, Identifiable } from '@domain/common';

export abstract class
    Repository<
        Entity extends Identifiable,
        OrmModel extends Identifiable<Entity['id']>,
        FO extends FindOption<Entity['id']>
    > {

    protected modelClass: ObjectType<OrmModel>;
    protected factory: IRepositoryFactory<Entity, OrmModel>;

    constructor(modelClass: ObjectType<OrmModel>, factory: IRepositoryFactory<Entity, OrmModel>) {
        this.modelClass = modelClass;
        this.factory = factory;
    }

    public async get(id: Entity['id'], manager: EntityManager = getManager()): Promise<Optional<Entity>> {
        const model = await this.getModel(id, manager);

        return model ? this.create(model) : undefined;
    }

    public async getOrFail(id: Entity['id'], manager: EntityManager = getManager()): Promise<Entity> {
        const model = await this.getModel(id, manager);

        if (!model) {
            throw new Error(`${this.modelClass.name} with id: ${id} not found`);
        }

        return this.create(model);
    }

    public async save(entity: Entity, manager?: EntityManager): Promise<void> {
        if (!manager) {
            return getManager().transaction(async (aManager) => {
                await this.createSaveCommand(aManager, entity).execute();
            });
        }

        await this.createSaveCommand(manager, entity).execute;
    }

    public async find(findOption: FO = ({} as FO), manager: EntityManager = getManager()): Promise<Entity[]> {
        const models = await this.findModels(findOption, manager);

        return this.createList(models);
    }

    protected create(model: OrmModel): Entity {
        return this.factory.restore(model);
    }

    protected abstract createFindCommand(findOption: FO, manager: EntityManager): FindCommand<OrmModel, FO>;
    protected abstract createSaveCommand(manager: EntityManager, entity: Entity): SaveCommand<Entity>;

    protected async getModel(id: Entity['id'], manager: EntityManager): Promise<OrmModel | undefined> {
        const models =  await this.findModels({ ids: [id] } as FO, manager);

        if (isEmpty(models)) {
            return undefined;
        }

        return first(models);
    }

    protected async findModels(findOption: FO, manager: EntityManager): Promise<OrmModel[]> {
        const qb = this.createFindCommand(findOption, manager);

        return qb.execute();
    }

    protected createList(models: OrmModel[]): Entity[] {
        return compact(models.map(model => this.create(model)));
    }
}
