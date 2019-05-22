import { context } from './infrastructureContext';

test('test', () => {
    expect(Object.getOwnPropertyNames((context as any).__proto__)).toBe(0);
});
