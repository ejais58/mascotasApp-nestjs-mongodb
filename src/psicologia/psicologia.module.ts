import { Module } from '@nestjs/common';
import { PsicologiaController } from './psicologia.controller';
import { PsicologiaService } from './psicologia.service';
import { UserDao } from '../database/dao/user.dao';
import { MascotaDao } from '../database/dao/mascota.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema/user.schema';
import { Mascota, MascotaSchema } from '../mascota/schema/mascota.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{name: Mascota.name, schema: MascotaSchema}])],
  controllers: [PsicologiaController],
  providers: [PsicologiaService, UserDao, MascotaDao]
})
export class PsicologiaModule {}
