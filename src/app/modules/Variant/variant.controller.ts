import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VariantServices } from './variant.service';

const createVariant = catchAsync(async (req, res) => {
  const variantData = req.body;
  const result = await VariantServices.createVariantIntoDB(variantData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variant created successfully',
    data: result,
  });
});

const getVariantById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const variant = await VariantServices.getVariantByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variant retrieved successfully',
    data: variant,
  });
});

const updateVariant = catchAsync(async (req, res) => {
  const variantData = req.body;
  const { id } = req.params;
  const updatedVariant = await VariantServices.updateVariantIntoDB(id, variantData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variant updated successfully',
    data: updatedVariant,
  });
});

const deleteVariant = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VariantServices.deleteVariantByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variant deleted successfully',
    data : result,
  });
});

export const VariantController = {
  createVariant,
  getVariantById,
  updateVariant,
  deleteVariant,
};
