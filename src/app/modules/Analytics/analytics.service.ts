import { Cart } from '../Cart/cart.model';
import { Order } from '../Order/order.model';
import { Product } from '../Product/product.model';
import { Analytics } from './analytics.model';

// trackAction function in the AnalyticsService class
const trackActionIntoDB = async (
  userId: string,
  productId: string,
  action: "view" | "add_to_cart" | "checkout" | "purchase",
  sessionId: string,
  ip: string,
) => {
  // Check if an entry with the same data already exists
  const existingEntry = await Analytics.findOne({
    userId,
    productId,
  });

  // If an entry with the same data exists, return it without creating a new one
  if (existingEntry) {
    if (existingEntry.action === action) {
      return existingEntry;
    }
    // Update the action if the existing entry has a different action
    existingEntry.action = action;
    await existingEntry.save();
    return existingEntry;
  }

  const analyticsEntry = await Analytics.create({
    userId,
    productId,
    action,
    sessionId,
    ip,
  });
  return analyticsEntry;
};



const getBestSellingProducts = async () => {
  const bestSellers = await Order.aggregate([
    { $unwind: '$orderItems' },
    { $group: { _id: '$orderItems.productId', totalSold: { $sum: '$orderItems.quantity' } } },
    { $sort: { totalSold: -1 } },
    { $limit: 10 },
  ]);

  // Populate product details
  return await Product.find({ _id: { $in: bestSellers.map(seller => seller._id) } });
};

const getAbandonedCarts = async () => {
  const abandonedCarts = await Cart.aggregate([
    {
      $lookup: {
        from: 'orders',
        localField: 'userId',
        foreignField: 'userId',
        as: 'order',
      },
    },
    {
      $match: {
        'order.0': { $exists: false }, // No order placed
        updatedAt: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Cart older than 24 hours
      },
    },
  ]);

  return abandonedCarts;
};

const calculateConversionRate = async () => {
  // Get the total number of successful purchases
  const totalPurchases = await Order.countDocuments({
    orderStatus: { $in: ['shipped', 'delivered'] }, // Assuming successful orders
  });

  // Get the total number of add-to-cart actions
  const totalCartAdds = await Analytics.countDocuments({
    action: 'add_to_cart',
  });

  // Handle edge cases
  if (totalCartAdds === 0) {
    return 0; // Avoid division by zero
  }

  // Calculate conversion rate
  const conversionRate = (totalPurchases / totalCartAdds) * 100;
  return conversionRate;
};


const calculateSessionConversionRate = async () => {
  // Get total number of sessions
  const totalSessions = await Analytics.distinct('sessionId').countDocuments();

  // Get total number of successful purchases
  const totalPurchases = await Order.countDocuments({
    orderStatus: { $in: ['shipped', 'delivered'] },
  });

  if (totalSessions === 0) {
    return 0; // Avoid division by zero
  }

  // Calculate conversion rate
  const sessionConversionRate = (totalPurchases / totalSessions) * 100;
  return sessionConversionRate;
};


export const AnalyticsService = {
  trackActionIntoDB,
    getBestSellingProducts,
    getAbandonedCarts,
    calculateConversionRate,
    calculateSessionConversionRate
};
