import { Entity, PrimaryColumn } from 'typeorm';

@Entity('lock')
export class LockModel {
    @PrimaryColumn({ name: 'entity_id' })
    public entityId: string;

    @PrimaryColumn({  name: 'owner' })
    public owner: string;
}
