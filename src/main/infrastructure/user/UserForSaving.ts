import { User } from '@domain/user';
import { UserModel } from './models/UserModel';

export class UserForSaving extends User {
    public createUserModel(): UserModel {
        const model = new UserModel();

        model.id = this.id;
        model.name = this.name;

        return model;
    }
}
