import { Injectable } from '@nestjs/common';
import { UserDao } from '../database/dao/user.dao';


@Injectable()
export class PsicologiaService {
    constructor(private readonly userDao: UserDao){}

    async allPsicologos(){
        return this.userDao.findPsicologo();
    }

}
