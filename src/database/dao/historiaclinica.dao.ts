import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from '@nestjs/mongoose';
import { Historiaclinica, HistoriaDocument } from '../../psicologia/schema/historia-clinica.schema';
import { Model } from 'mongoose';
import { CreateHistoriaDto } from '../../psicologia/dto/create-historia.dto';

@Injectable()
export class HistoriaDao{
    constructor(@InjectModel(Historiaclinica.name) private historiaModel: Model<HistoriaDocument>) {}

    //infoMascota
    async historiaMascota(id: string){
        return this.historiaModel.find()
            .populate({ path: 'Id_Mascota_Historia', model: 'Mascota', select: 'Nombre_Mascota Tipo_Mascota', populate: {path: 'Id_Usuario', model: 'User', select: "Nombre_Usuario Apellido_Usuario"} });
    }

    //crearHistoriaClinica
    async crearHistoria(historia: CreateHistoriaDto){
        const newHistoria = new this.historiaModel(historia);
        return newHistoria.save();
    }
}