import { Body, Controller, Get} from '@nestjs/common';
import { PsicologiaService } from './psicologia.service';
import { BuscarTurnoDto } from './dto/registrar-turno.dto';

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

}
