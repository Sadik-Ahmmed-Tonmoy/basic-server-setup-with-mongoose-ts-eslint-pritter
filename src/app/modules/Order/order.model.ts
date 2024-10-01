import { model, Schema } from 'mongoose';
import { TOrder, TOrderItem } from './order.interface';

const orderItemSchema = new Schema<TOrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Product ID is required'],
    ref: 'Product',
  },
  variantId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Variant ID is required'],
    // ref: 'Variant',
  },
  productName: {
    type: String,
    required: [true, 'productName is required'],
    trim: true,
  },
  variantName: {
    type: String,
    required: [true, 'variantName is required'],
    trim: true,
  },
  size: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  thumbnailImg: {
    type: String,
    required: [true, 'Thumbnail is required'],
  },
});



const orderSchema = new Schema <TOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      type: String,
      required: [true, 'Shipping Address is required'],
      trim: true,
    },
    paymentMethod: {
      type: String,
        enum: ['cod', 'online'],
        required: [true, 'Payment Method is required'],
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('Order', orderSchema);