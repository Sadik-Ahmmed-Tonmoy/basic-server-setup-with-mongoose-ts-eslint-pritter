import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";




const createProduct = catchAsync(async (req, res) => {
    const productData = req.body;
    const result = await ProductServices.createProductIntoDB(productData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  });


  const getSingleProductByObjectId = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await ProductServices.getSingleProductByObjectIdFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product found successfully",
      data: user,
    });
  });


  export const ProductController = {
    createProduct,
    getSingleProductByObjectId,
  }