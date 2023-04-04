import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class citasPsicoDto{
    @IsNotEmpty()
    @IsString()
    Id_Psicologo: string

    @IsNotEmpty()
    @IsString()
    Fecha: Date
}