import { IsNotEmpty } from "class-validator"

export class citasPsicoDto{
    @IsNotEmpty()
    Id_Psicologo: string

    @IsNotEmpty()
    Fecha: Date
}