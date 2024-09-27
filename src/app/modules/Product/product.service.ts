import { TProduct } from "./product.interface";
import { Product } from "./product.model";



const createProductIntoDB = async (productData: TProduct) => {
    const product = new Product(productData);
    await product.save();
    return product;
  };








  export const ProductServices = {
    createProductIntoDB
  }