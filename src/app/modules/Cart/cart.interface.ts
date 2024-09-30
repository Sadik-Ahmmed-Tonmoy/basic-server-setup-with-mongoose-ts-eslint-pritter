import { Types } from 'mongoose';

export interface TCartItem {
  _id?: Types.ObjectId;
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  quantity: number;
}

export interface TCart {
  userId: Types.ObjectId;
  cartItems: TCartItem[];
}
