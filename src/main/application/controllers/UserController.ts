import { injectable, inject } from 'inversify';
import { JsonController, OnUndefined, Body, Post } from 'routing-controllers';
import { CreateUserFormValidator } from '../validators';
import { CreateUser } from '@use-cases/user';
import { Type } from '@core/Type';
import { AddUserCommand } from '@use-cases/user/command-v1/CreateUserV1';
import { FactoryMethod } from '@core/configuration';
import { UserAddingCommand } from '@use-cases/user/command-v2/CreateUserV2';

@injectable()
@JsonController('/user')
export class UserController {
    @inject(CreateUser)
    private create!: CreateUser;

    @inject(Type.CreateAddUserCommand)
    private createAddUserCommand: FactoryMethod<AddUserCommand>;

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
    public async createAction(@Body() form: CreateUserFormValidator): Promise<void> {
        await this.create.execute(form);
    }

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
    public async createActionCommandV1(@Body() form: CreateUserFormValidator): Promise<void> {
        await this.createAddUserCommand(form).execute();
    }

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
    public async createActionCommandV2(@Body() form: CreateUserFormValidator): Promise<void> {
        await new UserAddingCommand(form).execute();
    }
}
