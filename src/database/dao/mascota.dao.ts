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
    async allMascotas(): Promise<Mascota[]>{
        return this.mascotaModel.find().populate({ path: 'Id_Usuario', model: 'User', select: 'Nombre_Usuario Apellido_Usuario' }).sort({'Id_Usuario': 1});
    }

    //buscar mascota por el dueño
    async findMascotaByDuenio(idMascota: string, payloadId: string): Promise<Mascota>{
        const findDuenio = await this.mascotaModel.findOne({_id: idMascota ,Id_Usuario: payloadId});
        return findDuenio;
    }
}