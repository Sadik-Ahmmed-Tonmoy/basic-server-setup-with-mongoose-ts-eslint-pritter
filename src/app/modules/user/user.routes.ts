import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);
router.get('/:objectId', UserControllers.getSingleUserByObjectId);
router.get(
  '/generatedId/:userId',
  UserControllers.getSingleUserByGeneratedUserId,
);
router.get('/', UserControllers.getAllUsers);
router.patch(
  '/:objectId',
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);
router.delete('/:objectId', UserControllers.deleteUser);
// router.post('/create-user',    UserControllers.createUser )

export const userRoutes = router;
