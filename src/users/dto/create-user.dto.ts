import { IsNotEmpty,IsEmail, Max, Min, Length, IsNumber, IsString} from 'class-validator';

export class CreateUserDto{
    @IsNotEmpty()
    @IsNumber()
    Dni_Usuario: number

    @IsNotEmpty()
    @IsString()
    Nombre_Usuario: string

    @IsNotEmpty()
    @IsString()
    Apellido_Usuario: string

    @IsNotEmpty()
    @IsString()
    Telefono_Usuario: string

    @IsNotEmpty()
    @IsEmail()
    Email_Usuario: string

    @IsNotEmpty()
    @IsString()
    @Length(6)
    Pass_Usuario: string

    @IsNotEmpty()
    @IsString()
    Rol_Usuario: string
}