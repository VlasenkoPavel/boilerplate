import { Context, createTypedInjectDecorator } from '@chaika/application';
import { UserRepository, UserFactory } from '@infrastructure/user';

export const context = new Context()
    .add(UserFactory, 'userFactory')
    .add(UserRepository, 'userRepository');

export const inject = createTypedInjectDecorator(context);
