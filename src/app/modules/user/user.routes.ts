import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/create-user',  validateRequest(UserValidation.userValidationSchema),   UserControllers.createUser )
router.get('/:objectId',   UserControllers.getSingleUserByObjectId )
router.get('/:userId',   UserControllers.getSingleUserByGeneratedUserId )
// router.post('/create-user',    UserControllers.createUser )


export const userRoutes = router;