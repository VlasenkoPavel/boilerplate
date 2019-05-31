import { Context } from '@chaika/application';
import { UserRepository, UserFactory } from '@infrastructure/user';

export const context = new Context()
    .add(UserFactory, 'userFactory')
    .add(UserRepository, 'userRepository');

/* shot variant, but without typescript control:

export const context: any = new Context()
    .add(UserFactory)
    .add(UserRepository);

*/
