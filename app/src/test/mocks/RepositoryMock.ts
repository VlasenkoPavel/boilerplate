import { injectable } from 'inversify';

import { IRepository, Identifiable, FindOption } from '@domain/common';
import { cloneDeep, clone } from 'lodash';
import { hasDefinedKeys } from '@utils/hasDefinedKeys';

@injectable()
export class RepositoryMock<E extends Identifiable, FO extends FindOption<E['id']> = {}> implements IRepository<E, FO> {
    protected entityMap: Map<E['id'], E> = new Map();

    public async get(id: E['id']): Promise<E | undefined> {
        return this.promisify(() => cloneDeep(this.entityMap.get(id)));
    }

    public async getOrFail(id: E['id']): Promise<E> {
        const entity = await this.get(id);

        if (!entity) {
            throw new Error(`Entity not found`);
        }

        return entity;
    }

    public async find(option?: FO): Promise<E[]> {
        this.checkFindOption(option);
        return this.getList();
    }

    public async save(entity: E): Promise<void> {
        return this.promisify(() => {
            this.entityMap.set(entity.id, entity);
        });
    }

    public load(entityList: E[]) {
        entityList.forEach(item => this.entityMap.set(item.id, cloneDeep(item)));
    }

    public clear() {
        this.entityMap.clear();
    }

    protected promisify<T>(callback: (arg?: any) => T): Promise<T> {
        return new Promise(resolve => process.nextTick(() => resolve(callback())));
    }

    protected checkFindOption(option?: FO) {
        if (
            option
            && hasDefinedKeys(option)
        ) {
            throw new Error(`find with params not supported`);
        }
    }

    protected getList(option?: FO) {
        return this.promisify(() => clone([...this.entityMap.values()]));
    }

    protected notSupportedError(name?: string): never {
        throw new Error(`Operation ${name} not supported in mock repository`);
    }
}
