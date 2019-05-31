import { User } from '@domain/user';
import { UserForSaving } from './UserForSaving';
import { SaveCommand } from '../common';

export class SaveUserCommand extends SaveCommand<User> {
    public async execute() {
        const userForSaving = this.createUserForSaving(this.entity);
        await this.manager.save(userForSaving.createUserModel());
    }

    private createUserForSaving(user: User): UserForSaving {
        const userForSaving = Object.create(UserForSaving.prototype);
        Object.assign(userForSaving, user);

        return userForSaving;
    }
}
