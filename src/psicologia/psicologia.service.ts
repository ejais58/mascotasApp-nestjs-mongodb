import { Injectable, HttpException } from '@nestjs/common';
import { UserDao } from '../database/dao/user.dao';
import { MascotaDao } from '../database/dao/mascota.dao';
import { TurnoDao } from '../database/dao/turno.dao';
import { BuscarTurnoDto, RegistrarTurnoDto } from './dto/registrar-turno.dto';


@Injectable()
export class PsicologiaService {
    constructor(private readonly userDao: UserDao,
                private readonly mascotaDao: MascotaDao,
                private readonly turnoDao: TurnoDao){}

    //verPsicologo
    async allPsicologos(){
        return this.userDao.findPsicologo();
    }

    //verTurnoDisponible
    async verTurnosDisponibles(registro: BuscarTurnoDto){
        let {Id_Psicologo_Turno, Id_Mascota_Turno, Fecha_Inicio_Turno} = registro
        
        //buscamos si es psicologo
        const findPsicologo = await this.userDao.findPsicologoById(Id_Psicologo_Turno);
        
        if (findPsicologo.Rol_Usuario !== 'psicologo'){
            throw new HttpException('PSICOLOGO NOT FOUND', 404);
        }
       
        const fechaSplit = Fecha_Inicio_Turno.split('/')
        var date = new Date(`${fechaSplit[2]}/${fechaSplit[1]}/${fechaSplit[0]}`);
        
        console.log(date);

        const fechaHoraInicio = new Date(date);
        fechaHoraInicio.setHours(9,0,0,0);
        console.log('hora inicio: ',fechaHoraInicio)
        
        const fechaHoraFin = new Date(date);
        fechaHoraFin.setHours(18,0,0,0)
        

        let siguienteTurno = fechaHoraInicio;
        console.log("siguiente: ", siguienteTurno);
        const arrayTurnosDisponiblesPerro = [];
        const arrayTurnosDisponiblesGato = [];

        //ver el tipo de mascota
        const findMascota = await this.mascotaDao.findMascotaById(Id_Mascota_Turno)
        if (findMascota.Tipo_Mascota === 'Perro'){
            while (siguienteTurno <= fechaHoraFin) {
                const tiempoFinPerro = new Date(siguienteTurno.getTime() + 30 * 60000)
                
                //mostrar turnos de ese dia para perros
                const turnoDisponible = await this.turnoDao.turnosDisponibles(siguienteTurno, tiempoFinPerro);
                if (turnoDisponible.length === 0){
                    arrayTurnosDisponiblesPerro.push(new Date(siguienteTurno).toLocaleString())
                }
                siguienteTurno = tiempoFinPerro;
            }
            return {turnos_perros: arrayTurnosDisponiblesPerro}
        }
        else if (findMascota.Tipo_Mascota === 'Gato') {
            while (siguienteTurno <= fechaHoraFin) {
                const tiempoFinGato = new Date(siguienteTurno.getTime() + 45 * 60000)
                //mostrar turnos de ese dia para perros
                const turnoDisponible = await this.turnoDao.turnosDisponibles(siguienteTurno, tiempoFinGato);

                if (turnoDisponible.length === 0){
                    arrayTurnosDisponiblesGato.push(new Date(siguienteTurno).toLocaleString())
                }
                siguienteTurno = tiempoFinGato;
            }
            return {turnos_gatos: arrayTurnosDisponiblesGato}
        }
        
    }

    async registrarTurno(newRegistro: RegistrarTurnoDto){
        let {Id_Psicologo_Turno, Id_Mascota_Turno, Fecha_Inicio_Turno} = newRegistro
        

        //buscamos si es psicologo
        const findPsicologo = await this.userDao.findPsicologoById(Id_Psicologo_Turno);
        if (findPsicologo.Rol_Usuario !== 'psicologo'){
            throw new HttpException('PSICOLOGO NOT FOUND', 404);
        }

        
        

        const findMascota = await this.mascotaDao.findMascotaById(Id_Mascota_Turno)

        //buscamos si es su dueño
        // if (findMascota.Id_Usuario !== payloadId){
        //     throw new HttpException('No es su dueño', 403);
        // }

        if (findMascota.Tipo_Mascota === 'Perro'){

            const fechaInicio = new Date(Fecha_Inicio_Turno);
            const fechaFin = new Date(fechaInicio.getTime() + 30 * 60000);
            newRegistro.Fecha_Fin_Turno = fechaFin;
            //guardar turno
            const turnoDisponible = await this.turnoDao.turnosDisponibles(fechaInicio, fechaFin);
            
                if (turnoDisponible.length === 0){
                    //guardarturno
                    return this.turnoDao.registrarTurno(newRegistro);
                }
                else 
                {
                    throw new HttpException('No hay turno disponible para esa hora', 403);
                }
                    
        } else if (findMascota.Tipo_Mascota === 'Gato'){

            const fechaInicio = new Date(Fecha_Inicio_Turno);
            const fechaFin = new Date(fechaInicio.getTime() + 45 * 60000);
            newRegistro.Fecha_Fin_Turno = fechaFin;
            //guardar turno
            const turnoDisponible = await this.turnoDao.turnosDisponibles(fechaInicio, fechaFin);
                if (turnoDisponible.length === 0){
                    //guardarturno
                    return this.turnoDao.registrarTurno(newRegistro);
                }
                else 
                {
                    throw new HttpException('No hay turno disponible para esa hora', 403);
                }
                    
        } else {
                throw new HttpException('La mascota no es un perro o un gato', 403);
        }
    }
}
