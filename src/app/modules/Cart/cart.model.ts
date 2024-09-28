import { model, Schema } from 'mongoose';
import { TCart } from './cart.interface';

const CartSchema = new Schema<TCart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Cart = model<TCart>('Cart', CartSchema);
