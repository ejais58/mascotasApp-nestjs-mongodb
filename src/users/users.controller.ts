import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { User } from './schema/user.schema';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('register')
    postUsuario(@Body() newUser: CreateUserDto): Promise<User>{
        return this.usersService.create(newUser);
    }

    @Get('agregarmascota/:id')
    postMascota(@Param('id') id: string, @Body() newMascota: CreateMascotaDto){
        
    }
   
}
