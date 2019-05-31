import { IUserRepository, User } from '@domain/user';
import { Parameterized } from '@chaika/core';

export interface UserData {
    id: string;
    name: string;
}

export interface Dependencies {
    userRepository: IUserRepository;
}

export class CreateUserCommand {
    private params: UserData;
    private userRepository: IUserRepository;

    constructor({ userRepository, params }: Parameterized<Dependencies, UserData>) {
        this.params = params;
        this.userRepository = userRepository;
    }

    public async execute(): Promise<void> {
        await this.userRepository.save(new User(this.params));
    }
}
