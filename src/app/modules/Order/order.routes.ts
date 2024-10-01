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

// get single order details by id
router.get('/:orderId', auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user), orderController.getSingleOrderDetails);

// update order status
router.patch(
  '/:orderId/status',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(orderValidation.updateOrderValidationSchema),
  orderController.updateOrderStatus,
);

// Delete order
router.delete(
  '/:orderId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  orderController.deleteOrder,
);

export const orderRoutes = router;
