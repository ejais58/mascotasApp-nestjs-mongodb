import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';
import { Mascota } from '../../mascota/schema/mascota.schema';

export type HistoriaDocument = HydratedDocument<Historiaclinica>

@Schema()
export class Historiaclinica{

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Mascota", required: true })
    Id_Mascota_Historia: Mascota
    
    @Prop({required: true})
    Fecha_Historia: Date

    @Prop({required: true})
    Evaluacion_Historia: string


}

export const HistoriaSchema = SchemaFactory.createForClass(Historiaclinica)