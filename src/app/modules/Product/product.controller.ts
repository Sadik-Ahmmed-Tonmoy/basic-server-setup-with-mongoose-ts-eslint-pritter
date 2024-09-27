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


  const getAllProducts = catchAsync(async (req, res) => {
    const users = await ProductServices.getAllProductsFromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products retrieved successfully',
      meta: users.meta,
      data: users.result,
    });
  });


  const updateProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const  userData  = req.body;
    const updatedProduct = await ProductServices.updateProductInDB(id, userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  });

  const deleteProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await ProductServices.deleteProductFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product deleted successfully',
      data: updatedProduct,
    });
  })

  export const ProductController = {
    createProduct,
    getSingleProductByObjectId,
    getAllProducts,
    updateProduct,
    deleteProduct
  }