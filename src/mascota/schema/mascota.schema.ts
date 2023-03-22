import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type MascotasDocument = HydratedDocument<Mascota>

@Schema()
export class Mascota{

    @Prop()
    Nombre_Mascota: string

    @Prop()
    Tipo_Mascota: string
  
}

export const MascotaSchema = SchemaFactory.createForClass(Mascota)