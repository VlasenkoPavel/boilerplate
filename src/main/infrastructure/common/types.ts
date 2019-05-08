export type Identifiable = { id: number | string };

export type Entity = { id: number | string };

export interface Model extends Identifiable {
    [key: string]: any;
}

export type IdType<T> = T extends { id: string } ? string : number;
