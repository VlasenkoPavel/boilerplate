
import { CreateUserCommand as CreateUser, UserData } from './CreateUser';
import { context } from '@application/configuration';

export const CreateUserCommand: { new (params: UserData): CreateUser } = CreateUser.bind(null, context);
