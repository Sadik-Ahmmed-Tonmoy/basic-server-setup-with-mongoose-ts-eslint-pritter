import { Schema, model, connect } from 'mongoose';
import { TUser } from './user.interface';


const userSchema = new Schema<TUser>({
    name: { 
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    email: { type: String, required: true },
    avatar: { type: String, required: false }
  });