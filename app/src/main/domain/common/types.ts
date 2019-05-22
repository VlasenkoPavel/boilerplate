export type Identifiable = { id: number | string };

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
