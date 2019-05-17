import { IUserRepository, User } from '@domain/user';
import { lazyInject, Type } from '@core/.';

export interface CreateUserParams {
    id: string;
    name: string;
}

export class CreateUserCommand {
    @lazyInject(Type.IUserRepository)
    private repository!: IUserRepository;
    private params: CreateUserParams;

    constructor(params: CreateUserParams) {
        this.params = params;
    }

    public async execute(): Promise<void> {
        await this.repository.save(new User(this.params));
    }
}
