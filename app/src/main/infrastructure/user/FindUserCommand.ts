import { EntityManager } from 'typeorm';
import { FindCommand } from '../common';
import { UserModel } from './models/UserModel';
import { UserFindOption } from '@domain/user';

export class FindUserCommand extends FindCommand<UserModel, UserFindOption> {
    private names: string[];

    constructor(manager: EntityManager, findOption: UserFindOption) {
        super(manager, findOption, UserModel, 'user');
        const { names } = findOption;
        this.names = names;
    }

    protected addFilters() {
        return this.filterByNames();
    }

    protected filterByNames() {
        this.filterBy('name', this.names);

        return this;
    }
}
