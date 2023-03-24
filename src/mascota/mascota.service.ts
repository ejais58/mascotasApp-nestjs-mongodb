import { Injectable } from '@nestjs/common';
import { MascotaDao } from '../database/dao/mascota.dao';
import { CreateMascotaDto } from '../mascota/dto/create-mascota.dto';

@Injectable()
export class MascotaService {
    constructor(private readonly mascotaDao: MascotaDao){}

    async create(mascota: CreateMascotaDto){
        return this.mascotaDao.createMascota(mascota);
    }

    async getAll(){
        return this.mascotaDao.allMascotas();
    }
}
