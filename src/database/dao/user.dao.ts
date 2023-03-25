import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from '../../users/schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../../users/dto/create-user.dto';


@Injectable()
export class UserDao {
    constructor(@InjectModel(User.name) private userModel: Model<UsersDocument>) {}

  async createUser(user: CreateUserDto): Promise<User> {
    
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  //Buscar usuario
  async findUsers(email: string){
    const findUser = await this.userModel.findOne({Email_Usuario : email}).exec();
    return findUser;
  }

  //Buscar todos los psicologos
  async findPsicologo(){
    return this.userModel.find({Rol_Usuario: 'psicologo'}).select('Nombre_Usuario Apellido_Usuario Email_Usuario');
  }

  
}