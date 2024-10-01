import { TOrder } from "./order.interface";
import { Order } from "./order.model";



// Create Order
const createOrderIntoDB = async (orderData: TOrder) => {
    const order = Order.create(orderData);
    return order;
}


// Get all orders for single user
const getAllOrdersForSingleUserFromDB = async (userId: string) => {
    const orders = Order.find({userId});
    return orders;
}
  


export const orderService = {
    createOrderIntoDB,
    getAllOrdersForSingleUserFromDB
}