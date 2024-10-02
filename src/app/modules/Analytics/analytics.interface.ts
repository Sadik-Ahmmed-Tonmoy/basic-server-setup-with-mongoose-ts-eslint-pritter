import { Types } from 'mongoose';

export interface IAnalytics {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  action: 'view' | 'add_to_cart' | 'checkout' | 'purchase';
  timestamp: Date;
  sessionId: string; // Useful for tracking non-logged-in users.
  ip: string; // Optional, to get location-based analytics.
}
