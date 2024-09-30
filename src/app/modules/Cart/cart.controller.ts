import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartServices } from './cart.service';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';

const getCart = catchAsync(async (req, res) => {
  const { id } = req.user;
  const cart = await CartServices.getCartFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: cart,
  });
});

const addToCart = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { productId, variantId, quantity } = req.body;
  const result = await CartServices.addToCartIntoDB(
    id,
    productId,
    variantId,
    quantity,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product added to cart successfully!',
    data: result,
  });
});

const updateCartItem = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { productId, variantId, quantity } = req.body;
  const result = await CartServices.updateCartItemIntoDB(
    id,
    productId,
    variantId,
    quantity,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart updated successfully!',
    data: result,
  });
});

const removeCartItem = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { productId, variantId } = req.body;
  const result = await CartServices.removeItemFromCartIntoDB(
    id,
    productId,
    variantId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart item removed successfully!',
    data: result,
  });
});

const clearCart = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await CartServices.clearCartFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart cleared successfully!',
    data: result,
  });
});

export const CartController = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
