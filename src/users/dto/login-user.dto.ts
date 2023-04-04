import { IsNotEmpty, IsEmail, Length, IsString} from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    Email_Usuario: string

    @IsNotEmpty()
    @IsString()
    @Length(6)
    Pass_Usuario: string
}