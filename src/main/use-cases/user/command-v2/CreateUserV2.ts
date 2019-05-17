import { IUserRepository, User } from '@domain/user';
import { Type, lazyInject, getComponent } from '@core/.';

export interface AddUserParams {
    id: string;
    name: string;
}

export class UserAddingCommand {
    @lazyInject(Type.IUserRepository)
    private repository: IUserRepository;
    private repository2: IUserRepository = getComponent<IUserRepository>(Type.IUserRepository);
    private params: AddUserParams;

    constructor(params: AddUserParams) {
        this.params = params;
    }

    public async execute(): Promise<void> {
        await this.repository.save(new User(this.params));
    }
}
