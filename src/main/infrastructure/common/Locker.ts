import { ILocker } from '@domain/common/ILocker';
import { injectable } from 'inversify';
import { v4 } from 'uuid';
import { EntityManager, getManager, In } from 'typeorm';
import { LockModel } from './models/LockModel';
import { isEmpty } from 'lodash';
import { waitResult } from '@utils/wait';

@injectable()
export class Locker implements ILocker {
    private id = v4();
    private lockedModelIds = new Set<string>();

    public async lock(participantIds: string[], manager: EntityManager = getManager()) {
        await waitResult(() => this.dbLock(participantIds, manager), 'Correction participants locking fail by timeout');
    }

    public async unlock(ids: string[], manager: EntityManager = getManager()): Promise<void> {
        await this.deleteLocks(ids, manager);
        ids.forEach(id => this.lockedModelIds.delete(id));
    }

    /** multiple returns */
    private async dbLock(ids: string[], manager: EntityManager = getManager()): Promise<boolean> {
        if (ids.some(id => this.lockedModelIds.has(id))) {
            return false;
        }

        ids.forEach(id => this.lockedModelIds.add(id));
        const nowLocked = await manager.find(LockModel, { where: { entityId: In(ids) } });

        if (!isEmpty(nowLocked)) {
            ids.forEach(id => this.lockedModelIds.delete(id));

            return false;
        }

        const locks = this.createLockModels(ids);
        try {
            await manager.save(LockModel, locks);
        } catch (err) {
            ids.forEach(id => this.lockedModelIds.delete(id));
            await this.deleteLocks(ids, manager);

            return false;
        }

        const savedLocks = await manager.find(LockModel, { where: { entityId: In(ids) } });

        if (
            isEmpty(savedLocks)
            || savedLocks.length !== ids.length
            || savedLocks.some(({ owner }) => owner !== this.id)
        ) {
            ids.forEach(id => this.lockedModelIds.delete(id));
            await this.deleteLocks(ids, manager);

            return false;
        }

        return true;
    }

    private createLockModels(ids: string[]): LockModel[] {
        return ids.map(id => {
            const lock = new LockModel();
            lock.entityId = id;
            lock.owner = this.id;

            return lock;
        });
    }

    private async deleteLocks(ids: string[], manager: EntityManager) {
        await manager.query(`DELETE FROM lock where entity_id=ANY($1) and owner = $2`, [ids, this.id]);
    }
}
