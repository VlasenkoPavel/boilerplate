export interface UserParams {
    id: string;
    name: string;
}

export class User {
    public readonly id: string;
    protected name: string;

    constructor({ id, name }: UserParams) {
        this.id = id;
        this.name = name;
    }
}
