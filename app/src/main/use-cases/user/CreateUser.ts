import { IUserRepository, User } from '@domain/user';

export interface UserData {
    id: string;
    name: string;
}

// type Params<T, P> = T & { params: P }

export interface Dependencies {
    userRepository: IUserRepository;
}

export class CreateUserCommand {
    private params: UserData;
    private userRepository: IUserRepository;

    constructor(deps: Dependencies, params: UserData) {
        this.params = params;
        this.userRepository = deps.userRepository;
    }

    public async execute(): Promise<void> {
        await this.userRepository.save(new User(this.params));
    }
}
