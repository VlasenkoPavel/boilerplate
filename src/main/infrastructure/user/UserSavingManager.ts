import { User } from '@domain/user';
import { SaveCommand } from '../common';
import { UserModel } from './models/UserModel';

export class SaveUserCommand extends SaveCommand<User> {

    public async execute() {
        await this.manager.save(this.createModels.call(this.entity));
    }

    private createModels(this: User): UserModel {
        const model = new UserModel();

        model.id = this.id;
        model.name = this.name;

        return model;
    }

}
