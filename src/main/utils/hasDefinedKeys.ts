import * as lodash from 'lodash';

export const hasDefinedKeys = (o: object): boolean => {
    return !lodash(o)
                .values()
                .compact()
                .isEmpty();
};
