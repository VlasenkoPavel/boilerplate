import { isEmpty, map } from 'lodash';

export const keyMap = <T, P extends keyof T>(property: P, o: T[]) => {
    if (!isEmpty(o)) {
        return map(o, property);
    }

    return [];
};
