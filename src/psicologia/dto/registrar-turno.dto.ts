import { IsDate, IsNotEmpty, IsString } from "class-validator"
import { ObjectId } from 'bson';


export class RegistrarTurnoDto{

    @IsNotEmpty()
    @IsString()
    Id_Psicologo_Turno: string

    @IsNotEmpty()
    @IsString()
    Fecha_Inicio_Turno: Date

    Fecha_Fin_Turno: Date

    @IsNotEmpty()
    @IsString()
    Id_Mascota_Turno: string

    
    Estado_Turno: string
}

export class BuscarTurnoDto{
    @IsNotEmpty()
    @IsString()
    Id_Psicologo_Turno: string

    @IsNotEmpty()
    @IsString()
    Fecha_Inicio_Turno: string

    @IsNotEmpty()
    @IsString()
    Id_Mascota_Turno: string

    
    Estado_Turno: string
}