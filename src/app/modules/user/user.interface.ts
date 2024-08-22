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

export type TUser = {
  userId: string;
  name: TUserName;
  email: string;
  phone: string;
  password: string;
  needChangePassword: boolean;
  avatar?: string;
  role: 'superAdmin' | 'admin' | 'user';
  status: 'active' | 'inactive';
  address?: TAddress;
  isDeleted: boolean;
};

export type TUserRole = keyof typeof USER_ROLE;
