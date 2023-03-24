import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Mascota, MascotaSchema } from '../mascota/schema/mascota.schema';
import { UserDao } from '../database/dao/user.dao';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
        secret: 'jwtConstants.secret',
        signOptions: { expiresIn: '1h' },
    }),],
    
    controllers: [UsersController],
    providers: [UsersService, UserDao]
})
export class UsersModule {}
