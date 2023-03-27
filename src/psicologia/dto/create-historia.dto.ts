import { IsNotEmpty } from "class-validator"
import { Mascota } from '../../mascota/schema/mascota.schema';

export class CreateHistoriaDto{
    @IsNotEmpty()
    Id_Historia: string

    Id_Mascota_Historia: Mascota

    Fecha_Historia: Date

    @IsNotEmpty()
    Evaluacion_Historia: string
}