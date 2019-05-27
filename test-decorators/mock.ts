export function mock() {
    return (constructor: Function) => {
        const data = new Map();

        constructor.prototype.get = async function(id: string) {
            return data.get(id);
        }

        constructor.prototype.save = async function(entity: any) {
            data.set(entity.id, entity);
        }

        constructor.prototype.delete = async function(id: string) {
            data.delete(id);
        }
    };
}
