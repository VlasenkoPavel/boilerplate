import * as lodash from 'lodash';

export const removeNillKeys = <T = object>(o: object): T => {
    return lodash(o).omitBy(lodash.isNil).value() as T;
};
