import { IsNotEmpty } from "class-validator"
import { ObjectId } from 'bson';


export class RegistrarTurnoDto{

    @IsNotEmpty()
    Id_Psicologo_Turno: string

    @IsNotEmpty()
    Fecha_Inicio_Turno: Date

    @IsNotEmpty()
    Id_Mascota_Turno: string
}

export class BuscarTurnoDto{
    @IsNotEmpty()
    Id_Psicologo_Turno: string

    @IsNotEmpty()
    Fecha_Inicio_Turno: string

    @IsNotEmpty()
    Id_Mascota_Turno: string
}