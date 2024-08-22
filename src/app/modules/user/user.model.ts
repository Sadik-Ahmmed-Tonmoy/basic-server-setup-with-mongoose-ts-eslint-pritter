import { Schema, model } from 'mongoose';
import { TAddress, TUser, TUserName } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

const addressSchema = new Schema<TAddress>({
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  zone: {
    type: String,
    required: [true, 'Zone is required'],
  },
  area: {
    type: String,
    required: [true, 'Area is required'],
  },
  detailsAddress: {
    type: String,
    required: [true, 'Details Address is required'],
  },
});

const userSchema = new Schema<TUser>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      // lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    needChangePassword: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['superAdmin', 'admin', 'user'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    address: {
      type: addressSchema,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});


export const User = model<TUser>('User', userSchema);
