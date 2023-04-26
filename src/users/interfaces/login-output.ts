
import { ObjectId } from 'bson';
import { Type } from 'class-transformer';
import mongoose, { Types } from 'mongoose';
export interface LoginOutput {
    token: string,
    payload: {
        id: mongoose.Types.ObjectId,
        nombre: string,
        rol: string
    }
}