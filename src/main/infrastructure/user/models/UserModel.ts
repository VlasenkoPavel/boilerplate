import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user_app')
export class UserModel {
    @PrimaryColumn()
    public id!: string;

    @Column()
    public name!: string;
}
