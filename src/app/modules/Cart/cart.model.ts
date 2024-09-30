import { model, Schema } from 'mongoose';
import { TCart, TCartItem } from './cart.interface';

const cartItemSchema = new Schema<TCartItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  variantId: {
    type: Schema.Types.ObjectId,
    // ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const CartSchema = new Schema<TCart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    cartItems: [cartItemSchema],
  },
  {
    timestamps: true,
  },
);

export const Cart = model<TCart>('Cart', CartSchema);
