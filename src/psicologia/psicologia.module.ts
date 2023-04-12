import { Module } from '@nestjs/common';
import { PsicologiaController } from './psicologia.controller';
import { PsicologiaService } from './psicologia.service';
import { UserDao } from '../database/dao/user.dao';
import { MascotaDao } from '../database/dao/mascota.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema/user.schema';
import { Mascota, MascotaSchema } from '../mascota/schema/mascota.schema';
import { Turno, TurnoSchema } from './schema/turno.schema';
import { TurnoDao } from '../database/dao/turno.dao';
import { Historiaclinica, HistoriaSchema } from './schema/historia-clinica.schema';
import { HistoriaDao } from '../database/dao/historiaclinica.dao';
import { NumberConversionWrapper } from 'src/providers/number-conversion-wrapper';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
                                       { name: Mascota.name, schema: MascotaSchema },
                                       { name: Turno.name, schema: TurnoSchema },
                                       { name: Historiaclinica.name, schema: HistoriaSchema }]
  )],
  controllers: [PsicologiaController],
  providers: [PsicologiaService, UserDao, MascotaDao, TurnoDao, HistoriaDao, NumberConversionWrapper]
})
export class PsicologiaModule {}
