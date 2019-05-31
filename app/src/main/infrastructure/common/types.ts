import { Identifiable } from '@domain/common';

export interface Model<T> extends Identifiable<T> {
    [key: string]: any;
}
