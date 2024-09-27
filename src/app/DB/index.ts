import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  userId: 'admin-2258',
  name: {
    firstName: 'Sadik',
    lastName: 'Ahmmed',
  },
  email: 'workwithsadik@gmail.com',
  phone: '01679170892',
  password: config.super_admin_password,
  avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  role: 'superAdmin',
  status: 'in-progress',
  isDeleted: false,
};
const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
