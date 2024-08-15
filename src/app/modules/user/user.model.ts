import { Schema, model } from 'mongoose';
import { TUser, TUserName } from './user.interface';

const userNameSchema = new Schema<TUserName>({
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
      maxlength: [20, 'Name can not be more than 20 characters'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last Name is required'],
      maxlength: [20, 'Name can not be more than 20 characters'],
    },
  });

const userSchema = new Schema<TUser>({
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  email: { type: String, required: true },
  avatar: { type: String, required: false },
});

const User = model<TUser>('User', userSchema);
