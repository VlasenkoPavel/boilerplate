import { IUserRepository, User } from '@domain/user';

export interface CreateUserParams {
    id: string;
    name: string;
}

export interface Dependencies {
    userRepository: IUserRepository;
}

export class CreateUserCommand {
    private userRepository!: IUserRepository;
    private params: CreateUserParams;

    constructor(params: CreateUserParams, dependencies: Dependencies) {
        this.init(dependencies);
        this.params = params;
    }

    public async execute(): Promise<void> {
        await this.userRepository.save(new User(this.params));
    }

    private init({ userRepository }: Dependencies) {
        this.userRepository = userRepository;
    }
}
