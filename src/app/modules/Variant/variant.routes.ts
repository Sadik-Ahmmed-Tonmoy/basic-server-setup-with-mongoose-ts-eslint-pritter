import express from 'express';
import { VariantController } from './variant.controller';
import { VariantValidation } from './variant.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(VariantValidation.variantValidationSchema),
  VariantController.createVariant,
);

router.get('/:id', VariantController.getVariantById);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(VariantValidation.variantValidationSchema),
  VariantController.updateVariant,
);

router.delete('/:id',  auth(USER_ROLE.superAdmin, USER_ROLE.admin), VariantController.deleteVariant);

export const VariantRoutes = router;
