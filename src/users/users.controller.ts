import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './schema/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginOutput } from './interfaces/login-output';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('register')
    postUsuario(@Body() newUser: CreateUserDto): Promise<User>{
        return this.usersService.create(newUser);
    }

    @Post('login')
    postLogin(@Body() login: LoginUserDto){
        return this.usersService.login(login);
    }
}
