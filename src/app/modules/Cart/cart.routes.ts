
import express from 'express';
import { CartController } from './cart.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Cart routes
router.post('/', auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user), CartController.addToCart);
// router.get('/cart', authMiddleware, CartController.getCart);
// router.put('/cart', authMiddleware, CartController.updateCartItem);
// router.delete('/cart/item', authMiddleware, CartController.removeCartItem);
// router.delete('/cart', authMiddleware, CartController.clearCart);


export const cartRoutes = router;