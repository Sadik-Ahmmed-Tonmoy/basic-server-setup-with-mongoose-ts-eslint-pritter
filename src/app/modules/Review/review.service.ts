import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TReview } from "./review.interface";
import { Review } from "./review.model";


const createReviewIntoDB = async (reviewData: TReview) => {
    const isAlreadyReviewed = await Review.findOne({ product: reviewData.product, user: reviewData.user });
    if (isAlreadyReviewed) {
      throw new AppError(httpStatus.NOT_ACCEPTABLE, 'This user already reviewed this product. You can only update this review !');
    }

    const review = new Review(reviewData);
    await review.save();
    return review;
  };


// Get all reviews for a specific product
export const getAllReviewsByProductIdFromDB = async (productId: string) => {
  // return await Review.find({ product: productId, isDeleted:false }).populate('user');
  return await Review.find({ product: productId, isDeleted:false });
};

// Get a single review by its ID (reviewId)
export const getReviewByIdFromDB = async (id: string) => {
  return await Review.findById(id).populate('user');
};

// Update a review by ID
export const updateReviewIntoDB = async (id: string, updateData: Partial<TReview>) => {

  const isAlreadyReviewed = await Review.findOne({ product: updateData.product, user: updateData.user });
  if (!isAlreadyReviewed) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user has not reviewed this product yet. Please create a review first !');
  }


  return await Review.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a review by ID
export const deleteReviewFromDB = async (id: string) => {
  return await Review.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};


  export const ReviewServices = {
    createReviewIntoDB,
    getAllReviewsByProductIdFromDB,
    getReviewByIdFromDB,
    updateReviewIntoDB,
    deleteReviewFromDB,
  }