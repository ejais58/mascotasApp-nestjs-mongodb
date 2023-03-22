import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { Mascota } from '../mascota/schema/mascota.schema';
import { from } from 'rxjs';
import { UserDao } from '../database/dao/user.dao';

@Injectable()
export class UsersService {
    constructor(private readonly userDao: UserDao) {}

  async create(user: CreateUserDto): Promise<User> {

    user.Pass_Usuario = await argon2.hash(user.Pass_Usuario, {
      type: argon2.argon2d,
      memoryCost: 2 ** 16,
      hashLength: 50
    });

    return this.userDao.createUser(user)
  }

  async addMascotaByUser(id: string, mascota: CreateMascotaDto){
    
  }

  

 
}
