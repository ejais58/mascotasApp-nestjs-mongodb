import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { PsicologiaService } from './psicologia.service';
import { BuscarTurnoDto, RegistrarTurnoDto } from './dto/registrar-turno.dto';
import { CreateHistoriaDto } from './dto/create-historia.dto';


@Controller('psicologia')
export class PsicologiaController {
    constructor(private psicologiaService: PsicologiaService){}

    @Get()
    async getPsicologo(){
        return this.psicologiaService.allPsicologos();
    }

    @Get('turnos')
    async verTurnos(@Body() registro: BuscarTurnoDto){
        return this.psicologiaService.verTurnosDisponibles(registro);
    }

    @Post('register')
    async registrarTurno(@Body() registro: RegistrarTurnoDto){
        return this.psicologiaService.registrarTurno(registro);
    }

    @Get('misturnos/:id')
    async verMisTurnos(@Param('id') id: string){
        return this.psicologiaService.misTurnos(id);
    }

    @Patch('cancelarcita/:id')
    async cancelarCita(@Param('id') id: string){
        return this.psicologiaService.cancelarCita(id);
    }

    @Get('infomascota/:id')
    async verInfoMascota(@Param('id') id: string){
        return this.psicologiaService.infoDeMascota(id);
    }

    @Post('terminarcita')
    async terminarCita(@Body() createHistoria: CreateHistoriaDto){
        return this.psicologiaService.terminarCita(createHistoria)
    }


}
