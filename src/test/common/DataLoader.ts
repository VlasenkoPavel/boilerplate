import { EntityManager, DeepPartial } from 'typeorm';
import { forOwn } from 'lodash';
import { Class } from '@domain/common';

export class DbDataLoader {
    public async load<T, P extends keyof T>({
        dbModelClass,
        models,
        entityManager,
        consistentlySortedBy
    }: {
        dbModelClass: Class<T>;
        models: { [key: string]: T };
        entityManager: EntityManager;
        consistentlySortedBy?: P;
    }): Promise<void> {
        const sortingKey = consistentlySortedBy;

        let modelList: T[] = [];
        forOwn(models, async model => modelList = [...modelList, model]);

        const listForSaving: T[] = sortingKey
            ? modelList.sort(({ [sortingKey]: id1 }, { [sortingKey]: id2 }) => Number(id1) - Number(id2))
            : modelList;

        await entityManager.save(dbModelClass, listForSaving as DeepPartial<T>);
    }
}
