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
    const updatedProduct = await ProductServices.updateProductIntoDB(id, userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  });

  const addImageToVariant = catchAsync(async (req, res) => {
    const { productId, variantId } = req.params;
    const { imageUrl } = req.body; // URL of the image to add
  
    const updatedProduct = await ProductServices.addImageToVariant(productId, variantId, imageUrl);
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Image added to variant successfully',
      data: updatedProduct,
    });
  });

  const addMultipleImagesToVariant = catchAsync(async (req, res) => {
    const { productId, variantId } = req.params;
    const { imageUrls } = req.body;  // expecting an array of valid image URLs
  
    const updatedProduct = await ProductServices.addMultipleImagesToVariant(
      productId,
      variantId,
      imageUrls,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Images added successfully',
      data: updatedProduct,
    });
  });
  
  
  
  const removeImageFromVariant = catchAsync(async (req, res) => {
    const { productId, variantId } = req.params;
    const { imageUrl } = req.body; // URL of the image to remove
  
    const updatedProduct = await ProductServices.removeImageFromVariant(productId, variantId, imageUrl);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Image removed from variant successfully',
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
    addImageToVariant,
    addMultipleImagesToVariant,
    removeImageFromVariant,
    deleteProduct
  }