import { IsNotEmpty } from "class-validator"

export class CreateMascotaDto {
    @IsNotEmpty()
    Nombre_Mascota: string

    @IsNotEmpty()
    Tipo_Mascota: string

    @IsNotEmpty()
    Id_Usuario: string
}