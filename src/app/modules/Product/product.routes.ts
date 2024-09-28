import express from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// product routes
router.post(
  '/create-product',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductController.createProduct,
);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getSingleProductByObjectId);
router.put(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ProductValidation.updateProductSchema),
  ProductController.updateProduct,
);
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductController.deleteProduct,
);

export const productRoutes = router;
