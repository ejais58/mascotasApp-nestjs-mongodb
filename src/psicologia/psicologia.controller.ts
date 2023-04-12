import { Body, Controller, Get, Post, Param, Patch, UseGuards, HttpException, Req } from '@nestjs/common';
import { PsicologiaService } from './psicologia.service';
import { BuscarTurnoDto, RegistrarTurnoDto } from './dto/registrar-turno.dto';
import { CreateHistoriaDto } from './dto/create-historia.dto';
import { citasPsicoDto } from './dto/citas-psico.dto';
import { JwtAuthGuard } from '../users/jwt/jwt-auth.guard';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../users/jwt/interfaces/jwtPayload';
import { NumberConversionWrapper } from '../providers/number-conversion-wrapper';


@Controller('psicologia')
export class PsicologiaController {
    constructor(private psicologiaService: PsicologiaService, private numberConversionWrapper: NumberConversionWrapper){}

    //soap api
    @Get('numbertowords/:num')
    async numberToWords(@Param('num') num: number): Promise<string> {
        return await this.numberConversionWrapper.numberToWords(num);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getPsicologo(@Req() req){
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'jwtConstants.secret');
        const payload = decoded as JwtPayload;

        if (payload.rol === 'psicologo' ){
            throw new HttpException('Forbidden', 403);
        }
        return this.psicologiaService.allPsicologos();
    }

    @UseGuards(JwtAuthGuard)
    @Get('turnos')
    async verTurnos(@Body() registro: BuscarTurnoDto, @Req() req){
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'jwtConstants.secret');
        const payload = decoded as JwtPayload;

        if (payload.rol === 'psicologo' ){
            throw new HttpException('Forbidden', 403);
        }
        return this.psicologiaService.verTurnosDisponibles(registro);
    }

    @UseGuards(JwtAuthGuard)
    @Post('register')
    async registrarTurno(@Body() registro: RegistrarTurnoDto, @Req() req){
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'jwtConstants.secret');
        const payload = decoded as JwtPayload;

        if (payload.rol === 'psicologo' ){
            throw new HttpException('Forbidden', 403);
        }
        return this.psicologiaService.registrarTurno(registro, payload.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('misturnos/:id')
    async verMisTurnos(@Param('id') id: string, @Req() req){
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'jwtConstants.secret');
        const payload = decoded as JwtPayload;

        if (payload.rol === 'psicologo' ){
            throw new HttpException('Forbidden', 403);
        }
        return this.psicologiaService.misTurnos(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('cancelarcita/:id')
    async cancelarCita(@Param('id') id: string, @Req() req){
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'jwtConstants.secret');
        const payload = decoded as JwtPayload;
        
        return this.psicologiaService.cancelarCita(id, payload.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('infomascota/:id')
    async verInfoMascota(@Param('id') id: string, @Req() req){
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'jwtConstants.secret');
        const payload = decoded as JwtPayload;
        
        return this.psicologiaService.infoDeMascota(id, payload.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('citas')
    verCitas(@Body() datoCita: citasPsicoDto, @Req() req){
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'jwtConstants.secret');
        const payload = decoded as JwtPayload;

        if (payload.rol === 'cliente' ){
            throw new HttpException('Forbidden', 403);
        }
        return this.psicologiaService.verCitas(datoCita);
    }

    @UseGuards(JwtAuthGuard)
    @Post('terminarcita')
    async terminarCita(@Body() createHistoria: CreateHistoriaDto, @Req() req){
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'jwtConstants.secret');
        const payload = decoded as JwtPayload;

        if (payload.rol === 'cliente' ){
            throw new HttpException('Forbidden', 403);
        }
        return this.psicologiaService.terminarCita(createHistoria)
    }


}
