import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import { Mascota } from '../../mascota/schema/mascota.schema';

export type TurnoDocument = HydratedDocument<Turno>

@Schema()
export class Turno{

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    Id_Psicologo_Turno: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Mascota", required: true })
    Id_Mascota_Turno: Mascota
    
    @Prop({required: true})
    Fecha_Inicio_Turno: Date

    @Prop({required: true})
    Fecha_Fin_Turno: Date

    @Prop({required: true})
    Estado_Turno: string

}

export const TurnoSchema = SchemaFactory.createForClass(Turno)