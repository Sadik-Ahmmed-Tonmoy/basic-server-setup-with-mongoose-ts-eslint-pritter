import AppError from '../../errors/AppError';
import { TVariant } from './variant.interface';
import { Variant } from './variant.model';
import httpStatus from 'http-status';

const createVariantIntoDB = async (payload: TVariant) => {
  const variant = await Variant.create(payload);
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
    new: true,
  });
  if (!variant) {
    throw new AppError(httpStatus.NOT_FOUND, 'Variant not found');
  }
  return variant;
};

const deleteVariantByIdFromDB = async (id: string) => {
  const variant = await Variant.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
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
