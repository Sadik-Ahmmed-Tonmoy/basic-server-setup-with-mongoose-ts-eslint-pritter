import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidation } from './order.validation';
import { orderController } from './order.controller';

const router = express.Router();

// create order
router.post(
  '/create',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  validateRequest(orderValidation.createOrderValidationSchema),
  orderController.createOrder,
);

// get all orders for single user
router.get(
  '/user',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  orderController.getAllOrdersForSingleUser,
);

export const orderRoutes = router;
