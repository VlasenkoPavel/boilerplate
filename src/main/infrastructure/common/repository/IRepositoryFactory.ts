export interface IRepositoryFactory<Entity, RestoreParams> {
    restore(params: RestoreParams): Entity;
}
