import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Mascota, MascotaSchema } from '../mascota/schema/mascota.schema';
import { UserDao } from '../database/dao/user.dao';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{name: Mascota.name, schema: MascotaSchema}])],
    controllers: [UsersController],
    providers: [UsersService, UserDao]
})
export class UsersModule {}
