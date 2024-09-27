import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';

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
  return product;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
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

const updateProductInDB = async (id: string, productData: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
  return result;
};


const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(id, { isDeleted: true }, {
    new: true,
    runValidators: true,
  });
  return result;
}

export const ProductServices = {
  createProductIntoDB,
  getSingleProductByObjectIdFromDB,
  getAllProductsFromDB,
  updateProductInDB,
  deleteProductFromDB
};
