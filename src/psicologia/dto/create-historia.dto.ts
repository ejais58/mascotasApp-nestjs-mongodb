import { IsNotEmpty, IsString } from "class-validator"
import { Mascota } from '../../mascota/schema/mascota.schema';

export class CreateHistoriaDto{
    @IsNotEmpty()
    @IsString()
    Id_Historia: string

    Id_Mascota_Historia: Mascota

    Fecha_Historia: Date

    @IsNotEmpty()
    @IsString()
    Evaluacion_Historia: string
}