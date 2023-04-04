import { IsNotEmpty, IsString } from "class-validator"

export class CreateMascotaDto {
    @IsNotEmpty()
    @IsString()
    Nombre_Mascota: string

    @IsNotEmpty()
    @IsString()
    Tipo_Mascota: string

    @IsNotEmpty()
    @IsString()
    Id_Usuario: string
}