import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CartServices } from "./cart.service";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";



const addToCart =  catchAsync(async (req, res) => {
    const {userId, email} = req.user;
    const cartData = req.body;
    const FullUserInfo = await User.findOne({ userId: userId, email: email });

    if (!FullUserInfo) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
   
    const result = await CartServices.addToCartIntoDB(FullUserInfo?._id.toString(), cartData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product added to cart successfully!',
      data: result,
    });
  });


  export const CartController = {
    addToCart
  }
