import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"


export type UsersDocument = HydratedDocument<User>

@Schema()
export class User{

    @Prop({required: true})
    Dni_Usuario: number

    @Prop({required: true})
    Nombre_Usuario: string

    @Prop({required: true})
    Apellido_Usuario: string

    @Prop({required: true})
    Telefono_Usuario: string

    @Prop({required: true})
    Email_Usuario: string

    @Prop({required: true})
    Pass_Usuario: string

    @Prop({required: true})
    Rol_Usuario: string
  
}

export const UserSchema = SchemaFactory.createForClass(User)