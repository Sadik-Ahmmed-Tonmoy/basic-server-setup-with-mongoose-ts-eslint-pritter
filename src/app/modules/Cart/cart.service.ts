import { TCartItem } from "./cart.interface";
import { Cart } from "./cart.model";

// Add product to cart
 const addToCartIntoDB = async (userObjectId: string, payload: TCartItem) => {
    const cart = await Cart.findOne({ user: userObjectId });
    if (cart) {
      const existingItem = cart.cartItems.find(item => item.product.toString() ===  payload.product.toString());
  
      if (existingItem) {
        existingItem.quantity =  payload.quantity;
      } else {
        cart.cartItems.push( payload);
      }
      
      await cart.save();
      return cart;
    } else {
      const newCart = {
        user: userObjectId,
        cartItems: [payload],
      }
      return await Cart.create(newCart);
    }
  };

  export const CartServices = {
    addToCartIntoDB
  }
