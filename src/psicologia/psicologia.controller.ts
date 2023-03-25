import { Controller, Get } from '@nestjs/common';
import { PsicologiaService } from './psicologia.service';

@Controller('psicologia')
export class PsicologiaController {
    constructor(private psicologiaService: PsicologiaService){}

    @Get()
    async getPsicologo(){
        return this.psicologiaService.allPsicologos();
    }
}
