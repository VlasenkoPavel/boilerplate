export interface Model extends Identifiable {
    [key: string]: any;
}

interface BaseFO<T extends number | string> {
    ids?: T[];
}

export interface FindOption<T extends string | number> extends BaseFO<T> {
    [key: string]: any;
}

export type Optional<T> = T | undefined;

export type Class<T extends Object> = { new (...arg: any): T };

export interface ICommand {
    execute(): void;
}

export type Identifiable<T = number | string> = { id: T };
export type IdType<T> = T extends { id: string } ? string : number;
