import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Mascota, MascotasDocument } from "src/mascota/schema/mascota.schema";
import { Model } from 'mongoose';
import { CreateMascotaDto } from '../../mascota/dto/create-mascota.dto';



@Injectable()
export class MascotaDao{
    constructor(@InjectModel(Mascota.name) private mascotaModel: Model<MascotasDocument>) {}

    async createMascota(mascota: CreateMascotaDto){
        const newMascota = new this.mascotaModel(mascota);
        return newMascota.save();
    }

    //Info mascotas
    async allMascotas(){
        return this.mascotaModel.find().populate({ path: 'Id_Usuario', model: 'User', select: 'Nombre_Usuario Apellido_Usuario' }).sort({'Id_Usuario': 1});
    }
}