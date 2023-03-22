import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"


export type UsersDocument = HydratedDocument<User>

@Schema()
export class User{

    @Prop()
    Dni_Usuario: number

    @Prop()
    Nombre_Usuario: string

    @Prop()
    Apellido_Usuario: string

    @Prop()
    Telefono_Usuario: string

    @Prop()
    Email_Usuario: string

    @Prop()
    Pass_Usuario: string

    @Prop()
    Rol_Usuario: string
  
}

export const UserSchema = SchemaFactory.createForClass(User)