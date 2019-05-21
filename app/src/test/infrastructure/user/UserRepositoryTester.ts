import { User } from '@domain/user';
import { v4 } from 'uuid';
import { DbTester } from '@test/common/DbTester';
import { UserModel } from '@infrastructure/user/models/UserModel';
import { getManager } from 'typeorm';
import { UserRepository } from '@infrastructure/user';
import { context } from '@application/configuration/loaders/infrastructureContext';

export class UserRepositoryTester extends DbTester {
    private repository: UserRepository = context.userRepository as UserRepository;

    public run() {
        const id = v4();
        const name = 'TestName';
        const user = new User({ id, name });

        test('db test', async () => {
            const qr = this.getRunner();
            qr.startTransaction();
            this.clearAllTables(qr.manager);

            expect(await qr.manager.find(UserModel)).toHaveLength(0);
            await this.repository.save(user, qr.manager);
            expect(await qr.manager.find(UserModel)).toHaveLength(1);

            await this.rollback(qr);

            /** do not use qr.manager after rollback */
            expect(await getManager().find(UserModel)).toHaveLength(2);
        });
    }
}
