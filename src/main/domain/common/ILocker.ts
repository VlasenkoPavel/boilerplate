export interface ILocker {
    unlock(ids: string[]): Promise<void>;
    lock(participantIds: string[]): Promise<void>;
}
