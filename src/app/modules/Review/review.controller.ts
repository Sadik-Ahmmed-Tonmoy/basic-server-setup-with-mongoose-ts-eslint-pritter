import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";


const createReview = catchAsync(async (req, res) => {
    const reviewData = req.body;
    const result = await ReviewServices.createReviewIntoDB(reviewData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review created successfully',
      data: result,
    });
  });

  const getAllReviewsByProductId = catchAsync(async (req, res) => {
    const productId = req.params.productId;
    const reviews = await ReviewServices.getAllReviewsByProductIdFromDB(productId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: reviews,
    });
  })

  const getReviewById = catchAsync(async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await ReviewServices.getReviewByIdFromDB(reviewId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: review,
    });
  })

  const updateReview = catchAsync(async (req, res) => {
    const reviewId = req.params.reviewId;
    const updateData = req.body;
    const review = await ReviewServices.updateReviewIntoDB(reviewId, updateData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review updated successfully',
      data: review,
    });
  })

  const deleteReview = catchAsync(async (req, res) => {
    const reviewId = req.params.reviewId;
  const updatedReview =  await ReviewServices.deleteReviewFromDB(reviewId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review deleted successfully',
      data: updatedReview,
    });
  })

  export const ReviewController = {
    createReview,
    getAllReviewsByProductId,
    getReviewById,
    updateReview,
    deleteReview,
  }


 