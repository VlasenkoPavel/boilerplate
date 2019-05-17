import { Identifiable, FindOption } from './types';

export interface IRepository<E extends Identifiable, FO extends FindOption<E['id']>> {
    get(id: E['id']): Promise<E | undefined>;
    getOrFail(id: E['id']): Promise<E>;
    find(option?: FO): Promise<E[]>;
    save(entity: E): Promise<void | E['id']>;
}
