import * as lodash from 'lodash';

export const createModelList = <T>(models: { [key: string]: T }): T[] => {
    let modelsArr: T[] = [];

    lodash.forOwn(models, async model => {
        modelsArr = [...modelsArr, model];
    });

    return modelsArr;
};
