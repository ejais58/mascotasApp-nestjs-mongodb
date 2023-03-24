import { Module } from '@nestjs/common';
import { MascotaController } from './mascota.controller';
import { MascotaService } from './mascota.service';
import { MascotaDao } from '../database/dao/mascota.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Mascota, MascotaSchema } from './schema/mascota.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Mascota.name, schema: MascotaSchema}])],
  controllers: [MascotaController],
  providers: [MascotaService, MascotaDao]
})
export class MascotaModule {}
