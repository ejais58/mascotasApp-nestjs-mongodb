import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRoot('mongodb+srv://eliasjais:eliasjais123456@nestjs.2ev741d.mongodb.net/nestjs')]
})
export class DatabaseModule {}
