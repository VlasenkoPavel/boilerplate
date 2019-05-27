export function expectError<T>(errorConstructor: T) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        if(descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }

        const originalMethod = descriptor.value;

        descriptor.value = async function () {
            let error;

            try {
                await originalMethod.apply(this, arguments);
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(errorConstructor);
        };
    };
}
