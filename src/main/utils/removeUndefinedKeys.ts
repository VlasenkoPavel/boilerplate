import * as lodash from 'lodash';

export const removeUndefinedKeys = (o: object) => {
    return lodash(o).omitBy(lodash.isUndefined).value();
};
