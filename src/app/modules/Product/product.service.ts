import { TProduct } from "./product.interface";
import { Product } from "./product.model";



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
  }





  export const ProductServices = {
    createProductIntoDB,
    getSingleProductByObjectIdFromDB,
  }