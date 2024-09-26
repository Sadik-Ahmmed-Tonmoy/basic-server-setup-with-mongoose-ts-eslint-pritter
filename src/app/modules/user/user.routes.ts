import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);

router.get(
  '/me',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getMe,
);

router.get('/',  auth('superAdmin', 'admin'), UserControllers.getAllUsers);
router.get('/:objectId', UserControllers.getSingleUserByObjectId);
router.get(
  '/generatedId/:userId',
  UserControllers.getSingleUserByGeneratedUserId,
);
 
router.patch(
  '/:objectId',
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

router.delete('/:objectId', UserControllers.deleteUser);

export const userRoutes = router;
