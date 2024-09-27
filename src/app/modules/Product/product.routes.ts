import express from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();



// product routes
router.post('/create-product',auth(USER_ROLE.superAdmin, USER_ROLE.admin), validateRequest(ProductValidation.createProductValidationSchema), ProductController.createProduct);
router.get('/:id',auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user), ProductController.getSingleProductByObjectId);
router.get('/',auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user), ProductController.createProduct);

export const productRoutes = router;