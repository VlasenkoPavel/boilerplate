
export const mergeContexts = <T extends Object, S extends Object>(target: T, source: S): T & S => {
    const keys = Object.getOwnPropertyNames((source as any).__proto__).filter(key => key != 'constructor');

    keys.forEach(key => {
        const getter = Object.getOwnPropertyDescriptor((source as any).__proto__, key);
        Object.defineProperty((target as any).__proto__, key, getter);
    });

    return target as T & S;
};
