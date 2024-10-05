import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { productSearchableFields } from './product.constant';
import { TProduct, TUpdateProduct } from './product.interface';
import { Product } from './product.model';
import mongoose from 'mongoose';
import { Variant } from '../Variant/variant.model';

const createProductIntoDB = async (payload: TProduct) => {
  const { variants, ...basicProductData } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Create the product without variants
    const newProduct = await Product.create([basicProductData], { session });
    const productId = newProduct[0]._id;

    // Create variants and store their IDs
    if (variants && variants.length > 0) {
      const createdVariants = await Variant.create(
        variants.map(variant => ({
          ...variant,
          product: productId
        })),
        { session }
      );

      // Add variant IDs to the product
      await Product.findByIdAndUpdate(
        productId,
        { $push: { variants: { $each: createdVariants.map(v => v._id) } } },
        { session }
      );
    }

    await session.commitTransaction();
    return await Product.findById(productId).populate('variants', { __v: 0 });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


const getSingleProductByObjectIdFromDB = async (id: string) => {
  const product = await Product.findById(
    { _id: id },
    {
      __v: 0,
    },
  ).populate('variants', { __v: 0 });
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find({isDeleted:false }).populate('variants', { __v: 0 }), query)
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



const updateProductIntoDB = async (id: string, productData: TUpdateProduct) => {
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
      // Handle existing variants
      const existingVariants = variants.filter(
        (variant) => variant._id && !variant.isDeleted,
      );
      for (const variant of existingVariants) {
        await Variant.findOneAndUpdate(
          { _id: variant._id, product: id },
          variant,
          { session },
        );
      }
    }

    await session.commitTransaction();
    const result = await Product.findById(id).populate('variants', { __v: 0 });
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
