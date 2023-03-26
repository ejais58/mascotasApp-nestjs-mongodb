import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Turno, TurnoDocument } from '../../psicologia/schema/turno.schema';
import { Model } from 'mongoose';
import { RegistrarTurnoDto } from '../../psicologia/dto/registrar-turno.dto';



@Injectable()
export class TurnoDao{
    constructor(@InjectModel(Turno.name) private turnoModel: Model<TurnoDocument>) {}

    //turnosDisponibles
    async turnosDisponibles(idPsicologo: string,fechaInicio: Date, fechaFin: Date): Promise<Turno[]>{
        const turnos = await this.turnoModel.find({Id_Psicologo_Turno: idPsicologo ,$or:[
                                                        {
                                                            Fecha_Inicio_Turno: {
                                                                $lte: fechaInicio
                                                            },
                                                            Fecha_Fin_Turno: {
                                                                $gte: fechaInicio
                                                            }
                                                        },
                                                        {
                                                            Fecha_Inicio_Turno: {
                                                                $lt: fechaFin
                                                            },
                                                            Fecha_Fin_Turno: {
                                                                $gt: fechaFin
                                                            }
                                                        }
        ]});

        return turnos;
    }

    async registrarTurno(turno: RegistrarTurnoDto){
        const newUser = new this.turnoModel(turno);
        return newUser.save();
    }

    //turnosMascotas
    async turnosMascotas(idCliente: string): Promise<Turno[]> {
        return this.turnoModel
        .find({Estado_Turno: 'Pendiente'})
        .populate({
            path: 'Id_Mascota_Turno',
            model: 'Mascota',
            select: 'Nombre_Mascota Tipo_Mascota',
            match: {Id_Usuario: idCliente},
            populate: {
                path: 'Id_Usuario',
                model: 'User',
                select: 'Nombre_Usuario Apellido_Usuario'
            }
        }).then(turnos => turnos.filter(turno => turno.Id_Mascota_Turno !== null));

        
    }

    //cancelarTurno
    async cancelarTurno(id: string){
        await this.turnoModel.findOneAndUpdate({_id: id},{ Estado_Turno: 'Cancelado'});
    }

    //terminarTurno
    async finalizarTurno(id: string){
        await this.turnoModel.findOneAndUpdate({_id: id},{ Estado_Turno: 'Finalizado'});
    }

    //estadoDeTurno
    async estadoTurno(id: string){
        const estado = await this.turnoModel.find({_id: id, Estado_Turno: 'Pendiente'})
        return estado;
    }
}