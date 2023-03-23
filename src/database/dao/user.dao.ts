import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from '../../users/schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import * as argon2 from 'argon2';
import { CreateMascotaDto } from '../../mascota/dto/create-mascota.dto';


@Injectable()
export class UserDao {
    constructor(@InjectModel(User.name) private userModel: Model<UsersDocument>) {}

  async createUser(user: CreateUserDto): Promise<User> {
    
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  //Buscar usuario
  async findUsers(email: string){
    const findUser = await this.userModel.findOne({where: {Email_Usuario: email}});
    return findUser;
  }
}