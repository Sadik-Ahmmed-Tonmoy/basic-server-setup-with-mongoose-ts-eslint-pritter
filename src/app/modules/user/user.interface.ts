/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  city: string;
  zone: string;
  area: string;
  detailsAddress: string;
};

export interface TUser  {
  userId: string;
  name: TUserName;
  email: string;
  phone: string;
  password: string;
  needChangePassword: boolean;
  passwordChangedAt?: Date;
  avatar?: string;
  role: 'superAdmin' | 'admin' | 'user';
  status: 'in-progress' | 'blocked';
  address?: TAddress;
  isDeleted: boolean;
};


export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  // isUserExistsByCustomId(userId: string): Promise<TUser>;
  //instance methods for checking if the user exists by custom ID or email
  isUserExistsByCustomIdOrEmail(userIdOrEmail: string): Promise<TUser | null>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
