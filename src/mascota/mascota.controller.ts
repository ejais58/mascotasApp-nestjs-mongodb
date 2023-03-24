import { Body, Controller, Get, Post } from '@nestjs/common';
import { MascotaService } from './mascota.service';
import { CreateMascotaDto } from '../mascota/dto/create-mascota.dto';

@Controller('mascota')
export class MascotaController {
    constructor(private mascotaService: MascotaService){}

    @Post('agregarmascota')
    async postMascota(@Body() mascota: CreateMascotaDto){
        return this.mascotaService.create(mascota);
    }

    @Get('all')
    async getMascotas(){
        return this.mascotaService.getAll();
    }
}
