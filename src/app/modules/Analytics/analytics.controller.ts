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


  const getBestSellers = catchAsync(async (req, res) => {
    const bestSellers = await AnalyticsService.getBestSellingProducts();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: bestSellers,
    });
  });
  

  const getAbandonedCarts = catchAsync(async (req, res) => {
    const carts = await AnalyticsService.getAbandonedCarts();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: carts,
    });
  });

  const getConversionRate = async (req: Request, res: Response) => {
    const cartConversionRate = await AnalyticsService.calculateConversionRate();
    const sessionConversionRate = await AnalyticsService.calculateSessionConversionRate();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: {
        cartConversionRate,
        sessionConversionRate,
      },
    });
  };

  export const AnalyticsController = {
    trackAction,
    getBestSellers,
    getAbandonedCarts,
    getConversionRate,
    
  };