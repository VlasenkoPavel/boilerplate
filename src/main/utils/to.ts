import { isArray } from 'lodash';

type ParseTo = 'number' | 'number[]' | 'string[]' | 'boolean' | 'Date';

/** use with Transform decorator from 'class-transformer' */
export const to = (parseTo: ParseTo) => (str: string) => parse(str, parseTo);

export const parse = (str: string | string[], parseTo: ParseTo) => {
    if (!str) {
        return str;
    }

    if (parseTo === 'boolean') {
        if (str === 'true') {
            return true;
        }
        if (str === 'false') {
            return false;
        }

        return str;
    }

    if (parseTo === 'string[]') {
        if (isArray(str)) {
            return str;
        }

        return str.split(',');
    }

    if (parseTo === 'number[]') {
        if (isArray(str)) {
            return str.map(item => Number(item));
        }

        return str.split(',').map(item => Number(item));
    }

    if (parseTo === 'number') {
        return Number(str);
    }

    if (parseTo === 'Date') {
        if (!isArray(str)) {
            return new Date(str);
        }
    }

    return str;
};
