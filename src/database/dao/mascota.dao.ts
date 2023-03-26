import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Mascota, MascotasDocument } from "src/mascota/schema/mascota.schema";
import { Model } from 'mongoose';
import { CreateMascotaDto } from '../../mascota/dto/create-mascota.dto';



@Injectable()
export class MascotaDao{
    constructor(@InjectModel(Mascota.name) private mascotaModel: Model<MascotasDocument>) {}

    async createMascota(mascota: CreateMascotaDto): Promise<Mascota>{
        const newMascota = new this.mascotaModel(mascota);
        return newMascota.save();
    }

    //Buscar tipo de mascota
    async findMascotaById(id: string): Promise<Mascota>{
        const findMascota = await this.mascotaModel.findOne({_id: id})
        return findMascota;
    }

    //Info mascotas
    async infoMascotas(id: string): Promise<Mascota[]>{
        return this.mascotaModel.find({_id: id})
            .populate({ path: 'Id_Usuario', model: 'User', select: 'Nombre_Usuario Apellido_Usuario' }).sort({'Id_Usuario': 1})
            .populate({ path: 'Id_Mascota_Historia', model: 'Historiaclinica', select: 'Fecha_Historia Evaluacion_Historia' });
    }

    
}