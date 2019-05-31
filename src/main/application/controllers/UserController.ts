import { JsonController, OnUndefined, Body, Post } from 'routing-controllers';
import { CreateUserFormValidator } from '../validators';
import { CreateUserCommand } from '@use-cases/user';
// import { context, createUseCase, ctx } from '@application/configuration';
import { ctx } from '@application/configuration';

@JsonController('/user')
export class UserController {

    /**
     * @api {post} /user Create user
     * @apiGroup User
     *
     * @apiParam {Object} user
     * @apiParam {String} .id
     * @apiParam {String} .name
     *
     * @apiExample {curl} Example:
     * curl -v -H "Content-Type:application/json" -d '{"id":"3f2a728b-a7c3-4377-97ca-ac490de47876","name":"Bill"}' http://127.0.0.1:3005/user
     */
    @Post('/')
    @OnUndefined(204)
    public async createAction(@Body() params: CreateUserFormValidator): Promise<void> {
        await new CreateUserCommand(ctx(params)).execute();
        // or
        // await new CreateUserCommand(context.with({ params })).execute();
        // or
        // await createUseCase(CreateUserCommand, params).execute();
        // or
        // await new CreateUserInject(form).execute();

        // ctx can be a decorator, like this: createAction(@Context() @Body() params: CreateUserFormValidator)
    }
}
