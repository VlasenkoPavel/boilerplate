export class ComponentCache<T extends object> implements ProxyHandler<T> {
    private cache: Map<any, any> = new Map();

    public get(target: T, propName: PropertyKey, receiver: any): any {
        let cached = this.cache.get(propName);

        if (!cached) {
            cached = target[propName];
            this.cache.set(propName, cached);
        }

        return cached;
    }
}
