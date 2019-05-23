import 'reflect-metadata';
import { IUserRepository, User } from '@domain/user';
import { inject } from '@application/configuration';

export interface CreateUserParams {
    id: string;
    name: string;
}

export interface Dependencies {
    userRepository: IUserRepository;
}

export class CreateUserInject {
    @inject private userRepository: IUserRepository;
    private params: CreateUserParams;

    constructor(params: CreateUserParams, userRepository?: IUserRepository) {
        this.params = params;
        this.userRepository = userRepository;
    }

    public async execute(): Promise<void> {
        await this.userRepository.save(new User(this.params));
    }
}
