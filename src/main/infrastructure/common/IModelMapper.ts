export interface IMapper<T, P> {
    map(models: T[]): P[];
}
