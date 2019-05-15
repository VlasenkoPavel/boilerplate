import { UserModel } from '@infrastructure/user/models/UserModel';
import { v4 } from 'uuid';

export const user1: UserModel = {
    id: v4(),
    name: 'John'
};

export const user2: UserModel = {
    id: v4(),
    name: 'Bill'
};
