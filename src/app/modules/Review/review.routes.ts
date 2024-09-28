
import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidation } from './review.validation';
import { ReviewController } from './review.controller';

const router = express.Router();



// product routes
router.post('/',auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user), validateRequest(reviewValidation.createReviewValidationSchema), ReviewController.createReview);
router.get('/product/:productId', ReviewController.getAllReviewsByProductId);
router.get('/:reviewId', ReviewController.getReviewById);
router.put('/:reviewId',auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user), validateRequest(reviewValidation.updateReviewValidationSchema), ReviewController.updateReview);
router.delete('/:reviewId',auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user), ReviewController.deleteReview);




export const reviewRoutes = router;