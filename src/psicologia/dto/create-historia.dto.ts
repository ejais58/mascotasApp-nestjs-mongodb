import { IsNotEmpty } from "class-validator"

export class CreateHistoriaDto{
    @IsNotEmpty()
    Id_Historia: string

    Id_Mascota_Historia: string

    Fecha_Historia: Date

    @IsNotEmpty()
    Evaluacion_Historia: string
}