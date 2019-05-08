import { FindOption } from '../common/types';
import { IRepository } from '../common';
import { User } from './User';

export interface UserFindOption extends FindOption<string> {
    names?: string[];
}

export interface IUserRepository extends IRepository<User, UserFindOption> {}
