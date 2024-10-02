import { model, Schema } from 'mongoose';
import { IAnalytics } from './analytics.interface';

const analyticsSchema = new Schema <IAnalytics>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  action: {
    type: String,
    enum: ['view', 'add_to_cart', 'checkout', 'purchase'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  sessionId: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
  },
});


export const Analytics = model<IAnalytics>('Analytics', analyticsSchema);
