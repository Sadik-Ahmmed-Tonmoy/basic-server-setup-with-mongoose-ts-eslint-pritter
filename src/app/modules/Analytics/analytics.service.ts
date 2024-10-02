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

export const AnalyticsService = {
  trackActionIntoDB,
};
