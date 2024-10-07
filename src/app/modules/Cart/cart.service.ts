import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { Product } from '../Product/product.model';
import { Cart } from './cart.model';
import { Variant } from '../Variant/variant.model';

// Get all cart items
const getCartFromDB = async (userId: string) => {
  const cart = await Cart.findOne({ userId }).populate('cartItems.productId');

  if (!cart) {
    return [];
  }

  const formattedCartItems = await Promise.all(
    cart.cartItems.map(async (item) => {
      const product = item.productId as typeof Product.prototype;
      const variant = await Variant.findById(item.variantId);
      if (!variant)
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Variant not found in product',
        );

      return {
        _id: item._id?.toString(),
        productId: product._id,
        variantId: item.variantId,
        name: product.name,
        variantName: variant.variant_name,
        color: variant.color || '',
        size: variant.size || '',
        brand: product.brand || '',
        code: variant.code || '',
        category: product.category,
        price: variant.price,
        totalPrice: variant.price * item.quantity,
        images: variant.images,
        quantity: item.quantity,
      };
    }),
  );

  return formattedCartItems;
};

// Add product to cart
const addToCartIntoDB = async (
  userId: string,
  productId: string,
  variantId: string,
  quantity: number,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
    }

    const variant = await Variant.findById(variantId).session(session);

    if (!variant) {
      throw new AppError(httpStatus.NOT_FOUND, 'Variant not found');
    }
    if (variant?.stock < quantity) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Not enough stock');
    }

    // check if item already exists in cart
    let cart = await Cart.findOne({ userId }).session(session);
    if (!cart) {
      // create new cart
      cart = new Cart({
        userId,
        cartItems: [],
      });
    }

    // Check if the product with the variant is already in the cart
    const cartItem = cart.cartItems.find(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId,
    );

    if (cartItem) {
      // Update the quantity if the product is already in the cart
      cartItem.quantity = quantity;
    } else {
      // Add new product variant to the cart
      cart.cartItems.push({
        productId: new mongoose.Types.ObjectId(productId),
        variantId: new mongoose.Types.ObjectId(variantId),
        quantity,
      });
    }

    await cart.save({ session });
    await session.commitTransaction();
    return cart;
  } catch (err) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add product to cart');
  } finally {
    session.endSession();
  }
};

const updateCartItemIntoDB = async (
  userId: string,
  productId: string,
  variantId: string,
  newQuantity: number,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ userId }).session(session);
    if (!cart) throw new AppError(httpStatus.NOT_FOUND, 'Cart not found');

    const item = cart.cartItems.find(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId,
    );

    if (!item) throw new AppError(httpStatus.NOT_FOUND, 'Item not found');

    // Validate product stock
    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
    }

    const variant = await Variant.findById(variantId).session(session);
    if (!variant) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Variant not found for the product',
      );
    }

    if (variant && variant.stock < newQuantity) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Not enough stock');
    }

    // Update quantity
    item.quantity = newQuantity;

    await cart.save({ session });
    await session.commitTransaction();

    return cart;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update cart item');
  } finally {
    session.endSession();
  }
};

const removeItemFromCartIntoDB = async (
  userId: string,
  productId: string,
  variantId: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ userId }).session(session);
    if (!cart) throw new AppError(httpStatus.NOT_FOUND, 'Cart not found');

    const itemIndex = cart.cartItems.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId,
    );

    if (itemIndex === -1)
      throw new AppError(httpStatus.NOT_FOUND, 'Item not found in cart');

    // Remove the item from the cartItems array
    cart.cartItems.splice(itemIndex, 1);

    await cart.save({ session });
    await session.commitTransaction();

    return cart;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to remove item from cart',
    );
  } finally {
    session.endSession();
  }
};

const clearCartFromDB = async (userId: string) => {
  const cart = await Cart.findOneAndDelete({ userId });
  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  return null;
};  
  
export const CartServices = {
  getCartFromDB,
  addToCartIntoDB,
  updateCartItemIntoDB,
  removeItemFromCartIntoDB,
  clearCartFromDB,
};
