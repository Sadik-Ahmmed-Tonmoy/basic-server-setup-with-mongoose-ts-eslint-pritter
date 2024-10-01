import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { productRoutes } from '../modules/Product/product.routes';
import { reviewRoutes } from '../modules/Review/review.routes';
import { cartRoutes } from '../modules/Cart/cart.routes';
import { orderRoutes } from '../modules/Order/order.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/reviews',
    route: reviewRoutes,
  },
  {
    path: '/cart',
    route: cartRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
