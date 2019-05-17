import { IUserRepository, User } from '@domain/user';

export interface AddUserParams {
    id: string;
    name: string;
}

export interface AddUserDependencies {
    repository: IUserRepository
}

export class AddUserCommand {
    private repository: IUserRepository;
    private params: AddUserParams;

    constructor(params: AddUserParams, dependencies: AddUserDependencies) {
        this.init(dependencies);
        this.params = params;
    }

    public async execute(): Promise<void> {
        await this.repository.save(new User(this.params));
    }

    private init({ repository }: AddUserDependencies) {
        this.repository = repository;
    }
}
