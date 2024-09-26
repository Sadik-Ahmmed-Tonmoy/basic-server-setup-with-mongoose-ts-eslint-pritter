export const USER_ROLE = {
  superAdmin: 'superAdmin',
  admin: 'admin',
  user: 'user',
} as const;

export const UserStatus = ['in-progress', 'blocked'] as const;

export const userSearchableFields = [
  'email',
  'name.firstName',
  'name.lastName',
  'userId',
  'phone',
];
