import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PsicologiaModule } from './psicologia/psicologia.module';
import { MascotaModule } from './mascota/mascota.module';
import { JwtStrategy } from './users/jwt/jwt.strategy';

@Module({
  imports: [DatabaseModule, UsersModule, PsicologiaModule, MascotaModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
