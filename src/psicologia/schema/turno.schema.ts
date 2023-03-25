import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import { Mascota } from '../../mascota/schema/mascota.schema';

export type TurnoDocument = HydratedDocument<Turno>

@Schema()
export class Turno{

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User" })
    Id_Psicologo_Turno: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Mascota" })
    Id_Mascota_Turno: Mascota
    
    @Prop()
    Fecha_Inicio_Turno: Date

    @Prop()
    Fecha_Fin_Turno: Date

    @Prop()
    Estado_Turno: string

}

export const TurnoSchema = SchemaFactory.createForClass(Turno)