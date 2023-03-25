import { IsNotEmpty, IsEmail, Length} from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    Email_Usuario: string

    @IsNotEmpty()
    @Length(6)
    Pass_Usuario: string
}