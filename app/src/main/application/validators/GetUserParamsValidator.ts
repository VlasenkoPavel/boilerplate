import { IsUUID, IsNotEmpty } from 'class-validator';

export class GetUserParamsValidator {
    @IsUUID('4')
    @IsNotEmpty()
    public id!: string;
}
