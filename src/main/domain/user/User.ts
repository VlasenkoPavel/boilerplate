export interface UserParams {
    id: string;
    name: string;
}

export interface InnerUser {
    getInnerData(): string;
}

export class User {
    public readonly id: string;
    protected name: string;

    constructor({ id, name }: UserParams) {
        this.id = id;
        this.name = name;
    }

    public createInnerUser(): InnerUser {
        return {
            getInnerData: () => this.id + this.name
        };
    }
}