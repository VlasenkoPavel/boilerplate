import { User } from '@domain/user';
import { UserForSaving } from './UserForSaving';
import { SavingManager } from '../common';

export class UserSavingManager extends SavingManager<User> {
    public async save(user: User) {
        const userForSaving = this.getUserForSaving(user);

        await this.manager.save(userForSaving.createUserModel());
    }

    private getUserForSaving(user: User): UserForSaving {
        (user as any).__proto__ = UserForSaving.prototype;

        return user as UserForSaving;
    }
}
