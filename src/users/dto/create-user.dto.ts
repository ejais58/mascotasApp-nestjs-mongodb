import { IsNotEmpty,IsEmail, Max, Min, Length} from 'class-validator';

export class CreateUserDto{
    @IsNotEmpty()
    Dni_Usuario: number

    @IsNotEmpty()
    Nombre_Usuario: string

    @IsNotEmpty()
    Apellido_Usuario: string

    @IsNotEmpty()
    Telefono_Usuario: string

    @IsNotEmpty()
    @IsEmail()
    Email_Usuario: string

    @IsNotEmpty()
    @Length(6)
    Pass_Usuario: string

    @IsNotEmpty()
    Rol_Usuario: string
}