import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Turno, TurnoDocument } from '../../psicologia/schema/turno.schema';
import { Model } from 'mongoose';
import { RegistrarTurnoDto } from '../../psicologia/dto/registrar-turno.dto';



@Injectable()
export class TurnoDao{
    constructor(@InjectModel(Turno.name) private turnoModel: Model<TurnoDocument>) {}

    //turnosDisponibles
    async turnosDisponibles(fechaInicio: Date, fechaFin: Date): Promise<Turno[]>{
        const turnos = await this.turnoModel.find({$and:[
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
}