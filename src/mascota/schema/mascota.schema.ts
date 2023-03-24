import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, SchemaTypes } from "mongoose"
import { User } from '../../users/schema/user.schema';

export type MascotasDocument = HydratedDocument<Mascota>

@Schema()
export class Mascota{

    @Prop()
    Nombre_Mascota: string

    @Prop()
    Tipo_Mascota: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User" })
    Id_Usuario: User
  
}

export const MascotaSchema = SchemaFactory.createForClass(Mascota)