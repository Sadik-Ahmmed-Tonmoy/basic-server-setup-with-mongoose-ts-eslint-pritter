import { Types } from 'mongoose';

export interface TOrderItem {
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  thumbnailImg: string;
}

export interface TOrder {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  orderItems: TOrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  totalAmount: number;
  isPaid: boolean;
  paidAt: Date;
  paymentStatus: 'pending' | 'success' | 'failed';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  isDelivered: boolean;
  deliveredAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
