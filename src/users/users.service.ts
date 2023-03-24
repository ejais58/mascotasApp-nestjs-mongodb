import { Injectable, HttpException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { UserDao } from '../database/dao/user.dao';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(private readonly userDao: UserDao, private jwtService: JwtService) {}

  async create(user: CreateUserDto): Promise<User> {

    user.Pass_Usuario = await argon2.hash(user.Pass_Usuario, {
      type: argon2.argon2d,
      memoryCost: 2 ** 16,
      hashLength: 50
    });

    return this.userDao.createUser(user)
  }

  async login(user: LoginUserDto){
    const { Email_Usuario, Pass_Usuario} = user;

        /*Busco si existe en la base de datos el nombre ingresado en el cliente, 
        y hasheo la contraseña ingresada para comparar con la contraseña de la base de datos*/
        const findUser = await this.userDao.findUsers(Email_Usuario);
        if (!findUser){
            throw new HttpException('USER NOT FOUND', 404);
        }

        //Validar contraseñas (base de datos y la ingresada por el cliente)
        const validar = await argon2.verify(findUser.Pass_Usuario, Pass_Usuario)
        if (!validar){
            throw new HttpException('PASSWORD INVALID', 403);
        } 

        //generar jwt
        const payload = {id: findUser._id, nombre: findUser.Nombre_Usuario, rol: findUser.Rol_Usuario}
        const token = this.jwtService.sign(payload)
        const data = {token, payload}
        return data;
  }

  

 
}
