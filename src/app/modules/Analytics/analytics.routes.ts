import express from 'express';
import auth from '../../middlewares/auth';
import { AnalyticsController } from './analytics.controller';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { analyticsValidation } from './analytics.validation';

const router = express.Router();

router.post(
  '/track',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  validateRequest(analyticsValidation.analyticsValidationSchema),
  AnalyticsController.trackAction,
);

export const analyticsRoutes = router;
