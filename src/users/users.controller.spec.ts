import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UsersDocument } from './schema/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginOutput } from './interfaces/login-output';
import { ObjectId } from 'bson';
import { UserDao } from '../database/dao/user.dao';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { UsersModule } from './users.module';
import mongoose, { Model, Types } from 'mongoose';
import { types } from 'util';


describe('AppController', () => {
    let Controller: UsersController;
    let service: UsersService;

    const mockLoginOutput = {
        token: 'TOKEN',
        payload: {
            id:  new mongoose.Types.ObjectId,
            nombre: "test",
            rol: "test"
        }
    };


    const userServiceMock = jest.fn().mockReturnValue({
        login: jest.fn().mockResolvedValue({
            token: 'TOKEN',
            payload: {
                id: new ObjectId(),
                nombre: "test",
                rol: "test"
            }
        })
    });

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        login: jest.fn().mockResolvedValue(mockLoginOutput)
                      }
                }
            ]
        })
            // .overrideProvider(getModelToken(User.name))
            // .useValue(jest.fn())
            .compile();

        Controller = app.get<UsersController>(UsersController);
        service = app.get<UsersService>(UsersService);

    });


    describe('login', () => {
        it('should return token and payload', async () => {

            //credenciales de usuario que se utilizarán en la prueba
            const userLogin: LoginUserDto = {
                Email_Usuario: 'testemail',
                Pass_Usuario: 'testpassword',
            };

            


            //jest.spyOn(service, 'login').mockResolvedValue(mockLoginOutput);
            
            
            const result = await Controller.postLogin(userLogin);

            //Crea una simulación (mock) del método login del servicio y devuelve un objeto simulado "mockLoginOutput".
            jest.spyOn(service, 'login').mockImplementation(() => Promise.resolve(mockLoginOutput));

            //Verifica si el resultado devuelto por el método "postLogin" del controlador es igual al objeto simulado "mockLoginOutput".
            expect(result).toEqual(mockLoginOutput);

            //Verifica si el método "login" del servicio fue llamado con las credenciales de usuario pasadas.
            expect(service.login).toHaveBeenCalledWith(userLogin);

        });
    });
});
