import express from 'express';
import auth from '../../middlewares/auth';
import { AnalyticsController } from './analytics.controller';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { analyticsValidation } from './analytics.validation';
import { AnalyticsService } from './analytics.service';
import { User } from '../user/user.model';
import { Order } from '../Order/order.model';

const router = express.Router();

router.post(
  '/track',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  validateRequest(analyticsValidation.analyticsValidationSchema),
  AnalyticsController.trackAction,
);

router.get('/best-sellers', AnalyticsController.getBestSellers);
router.get('/abandoned-carts', AnalyticsController.getAbandonedCarts);

router.get('/dashboard', async (req, res) => {
  const bestSellers = await AnalyticsService.getBestSellingProducts();
  const abandonedCarts = await AnalyticsService.getAbandonedCarts();
  
  res.json({
    bestSellers,
    abandonedCarts,
    totalUsers: await User.countDocuments(),
    totalOrders: await Order.countDocuments(),
  });
});

router.get('/conversion-rate', AnalyticsController.getConversionRate);


export const analyticsRoutes = router;
