import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { PsicologiaService } from './psicologia.service';
import { BuscarTurnoDto, RegistrarTurnoDto } from './dto/registrar-turno.dto';


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


}
