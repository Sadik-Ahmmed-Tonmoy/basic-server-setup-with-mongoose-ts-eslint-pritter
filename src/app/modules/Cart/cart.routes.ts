import express from 'express';
import { CartController } from './cart.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { CartValidation } from './cart.validation';

const router = express.Router();

// Cart routes
router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  CartController.getCart,
);
// 
router.post(
  '/add',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  validateRequest(CartValidation.addCartItemValidationSchema),
  CartController.addToCart,
);

router.patch(
  '/update',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  validateRequest(CartValidation.updateCartItemValidationSchema),
  CartController.updateCartItem,
);

router.delete(
  '/remove',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  validateRequest(CartValidation.removeCartItemValidationSchema),
  CartController.removeCartItem,
);

router.delete(
  '/clear',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  CartController.clearCart,
);

export const cartRoutes = router;
