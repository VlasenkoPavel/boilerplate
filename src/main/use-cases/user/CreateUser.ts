import { injectable, inject } from 'inversify';
import { Type } from '@core/Type';
import { IUserRepository, User } from '@domain/user';

export interface CreateUserParams {
    id: string;
    name: string;
}

@injectable()
export class CreateUser {
    @inject(Type.IUserRepository)
    private repository!: IUserRepository;

    public async execute(params: CreateUserParams): Promise<void> {
        this.repository.save(new User(params));
    }
}
