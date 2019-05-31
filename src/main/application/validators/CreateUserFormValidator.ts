import { Exclude, Expose } from 'class-transformer';
import { IsUUID, IsString, MinLength } from 'class-validator';

@Exclude()
export class CreateUserFormValidator {
    @Expose()
    @IsUUID('4')
    public id: string;

    @Expose()
    @IsString()
    @MinLength(3)
    public name: string;
}
