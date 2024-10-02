import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AnalyticsService } from "./analytics.service";

// Log user actions
const trackAction = catchAsync(async (req , res) => {
  const { action, productId } = req.body;
  const userId = req.user?.id ?? 'anonymous'; 
    const sessionId = req.cookies.sessionId || 'unknown-session'; // Track session ID
    const ip = req.ip ?? '0.0.0.0';
  
    const analyticsEntry = await AnalyticsService.trackActionIntoDB(
        userId,
        productId,
        action,
        sessionId,
        ip
    )
  
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Action logged successfully',
      data: analyticsEntry,
    });
  });
  
  export const AnalyticsController = {
    trackAction,
  };