import { isEmpty, map } from 'lodash';

type Ids<U> = {
    id: U;
};

export const idsOf = <T>(o: Ids<T>[]): T[] => {
    if (!isEmpty(o)) {
        return map(o, 'id');
    }

    return [];
};
