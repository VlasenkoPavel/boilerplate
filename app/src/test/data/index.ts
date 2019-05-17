import * as userModels  from './user';
import { createModelList } from '@utils/createModelList';
import { UserModel } from '@infrastructure/user/models/UserModel';

export const userModelList = createModelList<UserModel>(userModels);

export {
    userModels
};
