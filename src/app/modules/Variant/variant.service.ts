import AppError from '../../errors/AppError';
import { Product } from '../Product/product.model';
import { TVariant } from './variant.interface';
import { Variant } from './variant.model';
import httpStatus from 'http-status';

const createVariantIntoDB = async (payload: TVariant) => {
  const product = await Product.findById(payload?.product);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const variant = await Variant.create(payload);

  // Add variant IDs to the product
  product.variants.push(variant._id);
  await product.save();
  return variant;
};

const getVariantByIdFromDB = async (id: string) => {
  const variant = await Variant.findById(id);
  if (!variant) {
    throw new AppError(httpStatus.NOT_FOUND, 'Variant not found');
  }
  return variant;
};

const updateVariantIntoDB = async (id: string, payload: TVariant) => {
  const variant = await Variant.findByIdAndUpdate(id, payload, {
    new: true, runValidators: true,
  });
  if (!variant) {
    throw new AppError(httpStatus.NOT_FOUND, 'Variant not found');
  }
  return variant;
};

const deleteVariantByIdFromDB = async (id: string) => {
  const variant = await Variant.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!variant) {
    throw new AppError(httpStatus.NOT_FOUND, 'Variant not found');
  }
  return variant;
};

export const VariantServices = {
  createVariantIntoDB,
  getVariantByIdFromDB,
  updateVariantIntoDB,
  deleteVariantByIdFromDB,
};
