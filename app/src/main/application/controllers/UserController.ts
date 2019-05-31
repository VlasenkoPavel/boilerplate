import { JsonController, OnUndefined, Body, Post } from 'routing-controllers';
import { CreateUserFormValidator } from '../validators';
import { CreateUserCommand } from '@use-cases/user';
import { context } from '@application/configuration';

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
        await new CreateUserCommand(context.with({ params })).execute();
        // await new CreateUserInject(form).execute();
        // await new CreateUserInjected(form).execute();
    }
}
