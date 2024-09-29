import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import mongoose from 'mongoose';

const createProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

const getSingleProductByObjectIdFromDB = async (id: string) => {
  const product = await Product.findById(
    { _id: id },
    {
      __v: 0,
    },
  );
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find({isDeleted:false }), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;

  return {
    meta,
    result,
  };
};

// const updateProductIntoDB = async (id: string, productData: TProduct) => {
//   const result = await Product.findByIdAndUpdate(id, productData, {
//     new: true,
//     runValidators: true,
//   });
//   if (!result) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
//   }
//   return result;
// };

const updateProductIntoDB = async (id: string, productData: TProduct) => {
  const { variants, ...basicProductData } = productData;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const updatedBasicProductInfo = await Product.findByIdAndUpdate(
      id,
      basicProductData,
      { new: true, runValidators: true, session },
    );

    if (!updatedBasicProductInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update product');
    }

    if (variants && variants.length > 0) {
      // Handle deleted variants
      const deletedVariantsIds = variants
        .filter((variant) => variant._id && variant.isDeleted)
        .map((item) => item._id);

      if (deletedVariantsIds.length > 0) {
        await Product.findByIdAndUpdate(
          id,
          { $pull: { variants: { _id: { $in: deletedVariantsIds } } } },
          { session },
        );
      }


        // filter out the variants which are not deleted
        // const existingNotDeletedVariantsForUpdate = variants.filter(
        //   (variant) => variant?._id && !variant.isDeleted,
        // );
        // if (existingNotDeletedVariantsForUpdate.length > 0) {
        //   const updateOldVariants = existingNotDeletedVariantsForUpdate.map(
        //     async (variant) => {
        //       const updatedVariant = await Product.findOneAndUpdate(
        //         { _id: id, 'variants._id': variant._id },
        //         {
        //           $set: {
        //             'variants.$.variant_name': variant.variant_name,
        //             'variants.$.code': variant.code,
        //             'variants.$.price': variant.price,
        //             'variants.$.stock': variant.stock,
        //             'variants.$.images': variant.images,
        //             'variants.$.isDeleted': variant.isDeleted,
        //           },
        //         },
        //         { new: true, runValidators: true, session },
        //       );
        //       return updatedVariant;
        //     },
        //   );
        //   if (!updateOldVariants) {
        //     throw new AppError(
        //       httpStatus.BAD_REQUEST,
        //       'Failed to update product',
        //     );
        //   }
        // }


      // Handle existing variants
      const existingVariants = variants.filter(
        (variant) => variant._id && !variant.isDeleted,
      );
      for (const variant of existingVariants) {
        await Product.findOneAndUpdate(
          { _id: id, 'variants._id': variant._id },
          {
            $set: {
              'variants.$': variant,
            },
          },
          { session },
        );
      }

      // Handle new variants
      const newVariants = variants.filter(
        (variant) => !variant._id && !variant.isDeleted,
      );
      if (newVariants.length > 0) {
        await Product.findByIdAndUpdate(
          id,
          { $push: { variants: { $each: newVariants } } },
          { session },
        );
      }
    }

    await session.commitTransaction();
    const result = await Product.findById(id);
    return result;
  } catch (err) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update product');
  } finally {
    await session.endSession();
  }
};

const addImageToVariant = async (productId: string, variantId: string, imageUrl: string) => {
  if(!imageUrl) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image URL is required');
  }
  const result = await Product.findOneAndUpdate(
    {
      _id: productId,
      'variants._id': variantId,
    },
    {
      $addToSet: {
        'variants.$.images': imageUrl,
      },
    },
    { new: true, runValidators: true },
  );
  
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product or Variant not found');
  }
  return result;
};

const addMultipleImagesToVariant = async (
  productId: string,
  variantId: string,
  imageUrls: string[],
) => {
  if (!imageUrls || imageUrls.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image URL is required');
  }

  // Update the variant's images array, ensuring only new images are added
  const result = await Product.findOneAndUpdate(
    {
      _id: productId,
      'variants._id': variantId,
    },
    {
      // Use $addToSet to avoid duplicates
      $addToSet: {
        'variants.$.images': { $each: imageUrls }, // Add each URL uniquely
      },
    },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product or Variant not found');
  }
  return result;
};




const removeImageFromVariant = async (productId: string, variantId: string, imageUrl: string) => {
  const product = await Product.findById(productId);
  
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const variant = product.variants.find(v => v._id?.toString() === variantId);
  if (!variant) {
    throw new AppError(httpStatus.NOT_FOUND, 'Variant not found');
  }

  variant.images = variant.images.filter(image => image !== imageUrl); // Remove the image URL from the images array
  await product.save();
  
  return product;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getSingleProductByObjectIdFromDB,
  getAllProductsFromDB,
  updateProductIntoDB,
  addImageToVariant,
  addMultipleImagesToVariant,
  removeImageFromVariant,
  deleteProductFromDB,
};
