import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { productRoutes } from '../modules/Product/product.routes';
import { reviewRoutes } from '../modules/Review/review.routes';
import { cartRoutes } from '../modules/Cart/cart.routes';
import { orderRoutes } from '../modules/Order/order.routes';
import { analyticsRoutes } from '../modules/Analytics/analytics.routes';
import { VariantRoutes } from '../modules/Variant/variant.routes';

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
    path: '/variant',
    route: VariantRoutes,
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
  {
    path: '/analytics',
    route: analyticsRoutes,
  },
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
